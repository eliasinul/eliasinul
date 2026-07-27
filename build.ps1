[CmdletBinding()]
param(
    [string]$OutputDirectory = "dist"
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$outputPath = [System.IO.Path]::GetFullPath((Join-Path $projectRoot $OutputDirectory))
$projectPath = [System.IO.Path]::GetFullPath($projectRoot)

if (-not $outputPath.StartsWith($projectPath, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "The output directory must stay inside the website project."
}

$requiredSources = @(
    "index.html",
    ".nojekyll",
    "assets",
    "docs",
    "resources"
)

foreach ($item in $requiredSources) {
    $sourcePath = Join-Path $projectRoot $item
    if (-not (Test-Path -LiteralPath $sourcePath)) {
        throw "Required website source is missing: $item"
    }
}

if (Test-Path -LiteralPath $outputPath) {
    Remove-Item -LiteralPath $outputPath -Recurse -Force
}
New-Item -ItemType Directory -Path $outputPath | Out-Null

Copy-Item -LiteralPath (Join-Path $projectRoot "index.html") -Destination $outputPath
Copy-Item -LiteralPath (Join-Path $projectRoot ".nojekyll") -Destination $outputPath
Copy-Item -LiteralPath (Join-Path $projectRoot "assets") -Destination $outputPath -Recurse
Copy-Item -LiteralPath (Join-Path $projectRoot "docs") -Destination $outputPath -Recurse
Copy-Item -LiteralPath (Join-Path $projectRoot "resources") -Destination $outputPath -Recurse

$htmlPath = Join-Path $outputPath "index.html"
$html = Get-Content -Raw -LiteralPath $htmlPath
$localReferences = [regex]::Matches($html, '(?:href|src)="([^"]+)"') |
    ForEach-Object { $_.Groups[1].Value } |
    Where-Object { $_ -notmatch '^(https?:|mailto:|#)' }

$missingReferences = @()
foreach ($reference in $localReferences) {
    if (-not (Test-Path -LiteralPath (Join-Path $outputPath $reference))) {
        $missingReferences += $reference
    }
}

if ($missingReferences.Count -gt 0) {
    throw "Build failed. Missing local references: $($missingReferences -join ', ')"
}

$manifestPath = Join-Path $outputPath "build-manifest.txt"
$manifestLines = Get-ChildItem -LiteralPath $outputPath -File -Recurse |
    Where-Object { $_.FullName -ne $manifestPath } |
    Sort-Object { $_.FullName.Substring($outputPath.Length) } |
    ForEach-Object {
        $relativePath = $_.FullName.Substring($outputPath.Length + 1).Replace("\", "/")
        $hash = (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
        "$hash  $relativePath"
    }

$manifestLines | Set-Content -LiteralPath $manifestPath -Encoding utf8

Write-Host ""
Write-Host "Website build complete." -ForegroundColor Green
Write-Host "Output: $outputPath"
Write-Host "Files:  $($manifestLines.Count)"
Write-Host "Checks: all local links and assets resolved"
