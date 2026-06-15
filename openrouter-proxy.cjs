const http = require('http');
const https = require('https');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) {
  console.warn('Warning: OPENROUTER_API_KEY environment variable is not set.');
}
const PORT = 3099;

// Maps Anthropic model IDs → OpenRouter model IDs
const MODEL_MAP = {
  'claude-3-5-haiku-20241022': 'anthropic/claude-3.5-haiku',
  'claude-3-haiku-20240307': 'anthropic/claude-3-haiku',
  'claude-3-5-sonnet-20241022': 'anthropic/claude-3.5-sonnet',
  'claude-3-5-sonnet-20240620': 'anthropic/claude-3.5-sonnet',
  'claude-sonnet-4-5': 'anthropic/claude-sonnet-4.5',
  'claude-sonnet-4-5-20250929': 'anthropic/claude-sonnet-4.5',
  'claude-haiku-4-5': 'anthropic/claude-haiku-4.5',
  'claude-haiku-4-5-20251001': 'anthropic/claude-haiku-4.5',
  'claude-opus-4-5': 'anthropic/claude-opus-4.5',
  'claude-opus-4-6': 'anthropic/claude-opus-4.6',
  'claude-opus-4-7': 'anthropic/claude-opus-4.7',
  'claude-opus-4-8': 'anthropic/claude-opus-4.8',
  'claude-sonnet-4-6': 'anthropic/claude-sonnet-4.6',
};

// OpenRouter-specific extra fields to strip
const OR_EXTRA_TOP_LEVEL = new Set([
  'container', 'context_management', 'provider', 'stop_details'
]);
const OR_EXTRA_USAGE = new Set([
  'output_tokens_details', 'cache_creation', 'inference_geo',
  'server_tool_use', 'service_tier', 'speed', 'cost', 'is_byok', 'cost_details'
]);
const OR_EXTRA_DELTA = new Set([
  'container', 'stop_details', 'context_management'
]);
const OR_EXTRA_MESSAGE = new Set([
  'container', 'stop_details', 'provider', 'context_management'
]);
const OR_EXTRA_CONTENT_BLOCK = new Set(['citations']);

function mapModel(model) {
  if (!model) return model;
  const cleanModel = model.replace(/\x1b\[[0-9;]*m/g, '').trim();
  if (MODEL_MAP[cleanModel]) {
    console.log(`  → Model: ${cleanModel} → ${MODEL_MAP[cleanModel]}`);
    return MODEL_MAP[cleanModel];
  }
  if (cleanModel.includes('/')) return cleanModel;
  return `anthropic/${cleanModel}`;
}

function normalizeModelId(model) {
  if (!model) return model;
  // Convert back from OpenRouter format to Anthropic format
  // e.g. "anthropic/claude-3-5-haiku" → "claude-3-5-haiku-20241022"
  const reverseMap = {};
  for (const [k, v] of Object.entries(MODEL_MAP)) {
    reverseMap[v] = k;
  }
  return reverseMap[model] || model;
}

function cleanUsage(usage) {
  if (!usage) return usage;
  const cleaned = {};
  for (const [k, v] of Object.entries(usage)) {
    if (!OR_EXTRA_USAGE.has(k)) {
      cleaned[k] = v;
    }
  }
  return cleaned;
}

function cleanMessage(msg) {
  if (!msg) return msg;
  const cleaned = {};
  for (const [k, v] of Object.entries(msg)) {
    if (!OR_EXTRA_MESSAGE.has(k)) {
      if (k === 'model') {
        cleaned[k] = normalizeModelId(v);
      } else if (k === 'usage') {
        cleaned[k] = cleanUsage(v);
      } else if (k === 'content' && Array.isArray(v)) {
        cleaned[k] = v.map(item => {
          const c = {};
          for (const [ck, cv] of Object.entries(item)) {
            if (!OR_EXTRA_CONTENT_BLOCK.has(ck)) c[ck] = cv;
          }
          return c;
        });
      } else {
        cleaned[k] = v;
      }
    }
  }
  return cleaned;
}

// Clean a single SSE event JSON object
function cleanSSEEvent(data) {
  if (!data || typeof data !== 'object') return data;
  const type = data.type;

  if (type === 'message_start') {
    return {
      type: 'message_start',
      message: cleanMessage(data.message),
    };
  }

  if (type === 'content_block_start') {
    const cb = data.content_block || {};
    const cleanCb = {};
    for (const [k, v] of Object.entries(cb)) {
      if (!OR_EXTRA_CONTENT_BLOCK.has(k)) cleanCb[k] = v;
    }
    return {
      type: 'content_block_start',
      index: data.index,
      content_block: cleanCb,
    };
  }

  if (type === 'content_block_delta') {
    return {
      type: 'content_block_delta',
      index: data.index,
      delta: data.delta,
    };
  }

  if (type === 'content_block_stop') {
    return {
      type: 'content_block_stop',
      index: data.index,
    };
  }

  if (type === 'message_delta') {
    const delta = data.delta || {};
    const cleanDelta = {};
    for (const [k, v] of Object.entries(delta)) {
      if (!OR_EXTRA_DELTA.has(k)) cleanDelta[k] = v;
    }
    return {
      type: 'message_delta',
      delta: cleanDelta,
      usage: cleanUsage(data.usage),
    };
  }

  if (type === 'message_stop') {
    return { type: 'message_stop' };
  }

  return data;
}

// Process a buffer of SSE data and return cleaned events
let sseBuffer = '';
function processSSEBuffer(chunk) {
  sseBuffer += chunk;
  const lines = sseBuffer.split('\n');
  // Keep the last (possibly incomplete) line in the buffer
  sseBuffer = lines.pop() || '';

  const output = [];
  let currentEvent = null;

  for (const line of lines) {
    if (line.startsWith('event: ')) {
      currentEvent = line.slice(7).trim();
      output.push(line);
    } else if (line.startsWith('data: ')) {
      const dataStr = line.slice(6);
      if (dataStr === '[DONE]') {
        // Don't forward [DONE] — Anthropic doesn't use it
        // output.push('data: [DONE]');
      } else {
        try {
          const parsed = JSON.parse(dataStr);
          const cleaned = cleanSSEEvent(parsed);
          output.push('data: ' + JSON.stringify(cleaned));
        } catch (e) {
          output.push(line); // Pass through if can't parse
        }
      }
    } else {
      output.push(line);
    }
  }

  return output.join('\n') + '\n';
}

// Clean non-streaming response
function cleanResponse(data) {
  try {
    const parsed = JSON.parse(data);
    return JSON.stringify(cleanMessage(parsed));
  } catch (e) {
    return data;
  }
}

const server = http.createServer((req, res) => {
  let body = '';

  req.on('data', chunk => { body += chunk.toString(); });

  req.on('end', () => {
    let parsedBody = {};
    let mappedModel = 'N/A';
    let isStreaming = false;

    try {
      if (body) {
        parsedBody = JSON.parse(body);
        if (parsedBody.model) {
          parsedBody.model = mapModel(parsedBody.model);
          mappedModel = parsedBody.model;
        }
        isStreaming = parsedBody.stream === true;
        body = JSON.stringify(parsedBody);
      }
    } catch (e) {}

    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} | model=${mappedModel} | stream=${isStreaming}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://claude.ai',
      'X-Title': 'Claude CLI via OpenRouter',
      'anthropic-version': '2023-06-01',
    };

    if (req.headers['anthropic-beta']) {
      headers['anthropic-beta'] = req.headers['anthropic-beta'];
    }

    if (body) {
      headers['Content-Length'] = Buffer.byteLength(body);
    }

    // Rewrite path: /v1/... → /api/v1/... (OpenRouter requires /api prefix)
    // Also strip ?beta=true query param which confuses OpenRouter
    let targetPath = req.url;
    if (!targetPath.startsWith('/api/')) {
      targetPath = '/api' + targetPath;
    }
    // Remove ?beta=true but keep other params if any
    targetPath = targetPath.replace(/[?&]beta=true/, '').replace(/\?$/, '');

    console.log(`  → Path: ${req.url} → ${targetPath}`);

    const options = {
      hostname: 'openrouter.ai',
      port: 443,
      path: targetPath,
      method: req.method,
      headers,
    };


    sseBuffer = ''; // Reset buffer for each request

    const proxyReq = https.request(options, (proxyRes) => {
      console.log(`  ← Status: ${proxyRes.statusCode} | CT: ${proxyRes.headers['content-type']}`);
      const contentType = proxyRes.headers['content-type'] || '';
      const isSSE = contentType.includes('text/event-stream');

      if (isSSE) {
        const responseHeaders = {
          'content-type': 'text/event-stream',
          'cache-control': 'no-cache',
          'connection': 'keep-alive',
          'transfer-encoding': 'chunked',
        };
        res.writeHead(proxyRes.statusCode, responseHeaders);

        proxyRes.on('data', chunk => {
          const cleaned = processSSEBuffer(chunk.toString());
          if (cleaned) res.write(cleaned);
        });
        proxyRes.on('end', () => {
          if (sseBuffer) {
            const cleaned = processSSEBuffer('\n');
            if (cleaned) res.write(cleaned);
          }
          res.end();
        });
      } else {
        let responseData = '';
        proxyRes.on('data', chunk => { responseData += chunk.toString(); });
        proxyRes.on('end', () => {
          const cleaned = cleanResponse(responseData);
          console.log(`  ← Response: ${cleaned.substring(0, 200)}`);
          const responseHeaders = {
            'content-type': 'application/json',
            'content-length': Buffer.byteLength(cleaned).toString(),
          };
          res.writeHead(proxyRes.statusCode, responseHeaders);
          res.end(cleaned);
        });
      }
    });

    proxyReq.on('error', (err) => {
      console.error('  ✗ Error:', err.message);
      res.writeHead(500);
      res.end(JSON.stringify({ error: { type: 'proxy_error', message: err.message } }));
    });

    if (body) proxyReq.write(body);
    proxyReq.end();
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║     OpenRouter Proxy for Claude CLI                  ║');
  console.log(`║     Running at http://127.0.0.1:${PORT}                ║`);
  console.log('╚══════════════════════════════════════════════════════╝');
  console.log('');
  console.log('In your terminal, run:');
  console.log('  $env:ANTHROPIC_API_KEY="or-proxy"');
  console.log(`  $env:ANTHROPIC_BASE_URL="http://127.0.0.1:${PORT}"`);
  console.log('  claude');
  console.log('');
});
