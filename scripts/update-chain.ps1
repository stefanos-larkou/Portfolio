#Requires -Version 7

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)

$chain = @(
    @{ Repository = "FindMyWay"; Dependencies = @("sim-kit") },
    @{ Repository = "RWalk"; Dependencies = @("sim-kit") },
    @{ Repository = "Portfolio"; Dependencies = @("find-my-way", "rwalk", "sim-kit") }
)

function Invoke-Step {
    param([string] $Description, [scriptblock] $Command)

    & $Command
    if ($LASTEXITCODE -ne 0) {
        throw "$Description failed"
    }
}

foreach ($link in $chain) {
    $path = Join-Path $root $link.Repository
    if (-not (Test-Path $path)) {
        throw "$($link.Repository) is not at $path"
    }

    Write-Host ""
    Write-Host "=== $($link.Repository) ===" -ForegroundColor Cyan
    Set-Location $path

    if (git status --porcelain) {
        throw "$($link.Repository) has uncommitted changes - commit or stash them first"
    }

    foreach ($name in $link.Dependencies) {
        $package = "@stefanos-larkou/$name"
        Write-Host "--- $package" -ForegroundColor DarkGray

        Invoke-Step "npm update $package in $($link.Repository)" { npm update $package }

        if (-not (git status --porcelain)) {
            Write-Host "    already current" -ForegroundColor DarkGray
            continue
        }

        Invoke-Step "checks in $($link.Repository) after updating $name" { npm run check }

        Invoke-Step "commit in $($link.Repository)" {
            git add -A
            git commit -m "update $name"
        }
        Invoke-Step "push from $($link.Repository)" { git push }

        Write-Host "    updated and pushed" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "The chain is current." -ForegroundColor Green
