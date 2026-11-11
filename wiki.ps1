param([ValidateSet('install','check','build','dev','preview')][string]$Task = 'dev')
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$env:ASTRO_TELEMETRY_DISABLED = '1'
$wikiBundledNode = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe'
$wikiNode = (Get-Command node.exe).Source
if ([version]((& $wikiNode --version).TrimStart('v')) -lt [version]'22.23.4') {
  if (Test-Path -LiteralPath $wikiBundledNode) { $wikiNode = $wikiBundledNode }
  else { throw 'Node.js 24 LTS をインストールしてから再実行してください。' }
}
$env:PATH = (Split-Path $wikiNode) + ';' + $env:PATH
$wikiNpmCmd = (Get-Command npm.cmd).Source
$wikiNpmCli = Join-Path (Split-Path $wikiNpmCmd) 'node_modules/npm/bin/npm-cli.js'
if ($Task -eq 'install') { & $wikiNode $wikiNpmCli ci --no-audit --no-fund }
else { & $wikiNode $wikiNpmCli run $Task }
exit $LASTEXITCODE
