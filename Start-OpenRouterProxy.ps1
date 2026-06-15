# Start-OpenRouterProxy.ps1
# Run this script before using the Claude CLI with OpenRouter
# Usage: .\Start-OpenRouterProxy.ps1

$ProxyScript = "$PSScriptRoot\openrouter-proxy.cjs"
$Port = 3099

# Check if proxy is already running
$existing = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
if ($existing) {
    Write-Host "✅ Proxy already running on port $Port" -ForegroundColor Green
} else {
    Write-Host "🚀 Starting OpenRouter proxy on port $Port..." -ForegroundColor Cyan
    Start-Process -FilePath "node" -ArgumentList $ProxyScript -WindowStyle Minimized
    Start-Sleep -Seconds 2
    Write-Host "✅ Proxy started!" -ForegroundColor Green
}

# Set environment variables for this session
$env:ANTHROPIC_API_KEY = "or-proxy"
$env:ANTHROPIC_BASE_URL = "http://127.0.0.1:$Port"

Write-Host ""
Write-Host "═══════════════════════════════════════════════" -ForegroundColor DarkCyan
Write-Host "  Claude CLI → OpenRouter (Claude 3.5 Haiku)   " -ForegroundColor White
Write-Host "═══════════════════════════════════════════════" -ForegroundColor DarkCyan
Write-Host ""
Write-Host "  ANTHROPIC_API_KEY  = or-proxy" -ForegroundColor Yellow
Write-Host "  ANTHROPIC_BASE_URL = http://127.0.0.1:$Port" -ForegroundColor Yellow
Write-Host ""
Write-Host "  You can now run: claude" -ForegroundColor Green
Write-Host ""
