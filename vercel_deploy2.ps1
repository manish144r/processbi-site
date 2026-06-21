$ErrorActionPreference = "Stop"
$repo = "C:\Users\smani\CompanyWorkspaces\NightFactory\outputs\processbi-3d-deploy"

# Find Vercel token
$authPaths = @(
    "$env:LOCALAPPDATA\com.vercel.cli\auth.json",
    "$env:USERPROFILE\.vercel\auth.json",
    "$env:APPDATA\com.vercel.cli\auth.json"
)

Write-Host "Checking token paths..."
foreach ($p in $authPaths) {
    Write-Host "  Checking: $p -> exists=$(Test-Path $p)"
}

$token = $null
foreach ($p in $authPaths) {
    if (Test-Path $p) {
        Write-Host "Found: $p"
        $auth = Get-Content $p -Raw | ConvertFrom-Json
        $token = $auth.token
        Write-Host "Token: $($token.Substring(0, [Math]::Min(8, $token.Length)))..."
        break
    }
}

if (-not $token) {
    Write-Error "Vercel token not found at any known path!"
    exit 1
}

$headers = @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" }
$teamId = "team_yze6KFOP792mMfampVb6mbGq"
$projectId = "prj_Wnag8yg7ICxswmn05QY3nVGFDgxw"

$files = @(
    "about.html","case-studies.html","contact.html","favicon.svg",
    "index.html","logo-animated.svg","methodology.html","og-image.png",
    "robots.txt","services.html","shared-nav.js","shared.css",
    "sitemap.xml","technology.html","vercel.json"
)

$uploadedFiles = @()
foreach ($file in $files) {
    $path = Join-Path $repo $file
    if (-not (Test-Path $path)) { Write-Host "SKIP: $file"; continue }

    $bytes = [System.IO.File]::ReadAllBytes($path)
    $sha = ([System.BitConverter]::ToString(
        ([System.Security.Cryptography.SHA1]::Create()).ComputeHash($bytes)
    )).Replace("-", "").ToLower()

    Write-Host "Uploading $file ($($bytes.Length) bytes, sha=$($sha.Substring(0,8))...)"
    try {
        $uploadHeaders = @{
            Authorization = "Bearer $token"
            "x-now-digest" = $sha
            "x-now-size" = "$($bytes.Length)"
            "Content-Type" = "application/octet-stream"
        }
        Invoke-RestMethod -Uri "https://api.vercel.com/v2/now/files" `
            -Method POST -Headers $uploadHeaders -Body $bytes | Out-Null
        Write-Host "  -> uploaded"
    } catch {
        Write-Host "  -> already exists (ok)"
    }

    $uploadedFiles += @{ file = $file; sha = $sha; size = $bytes.Length }
}

Write-Host "`nCreating deployment..."
$deployBody = @{
    name = "processbi"
    files = $uploadedFiles
    projectId = $projectId
    teamId = $teamId
    target = "production"
    projectSettings = @{ framework = $null }
} | ConvertTo-Json -Depth 10

$result = Invoke-RestMethod `
    -Uri "https://api.vercel.com/v13/deployments?teamId=$teamId" `
    -Method POST -Headers $headers -Body $deployBody

Write-Host "`n================================================"
Write-Host "Deployment ID : $($result.id)"
Write-Host "URL           : $($result.url)"
Write-Host "State         : $($result.readyState)"
Write-Host "================================================"
