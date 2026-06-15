# claude-openrouter.ps1
# Use Claude CLI with OpenRouter API
# Usage: .\claude-openrouter.ps1 [claude CLI arguments]

if (-not $env:OPENROUTER_API_KEY) {
    Write-Host "Warning: OPENROUTER_API_KEY environment variable is not set." -ForegroundColor Yellow
}
$env:ANTHROPIC_API_KEY = $env:OPENROUTER_API_KEY
$env:ANTHROPIC_BASE_URL = "https://openrouter.ai/api/v1"

claude @args
