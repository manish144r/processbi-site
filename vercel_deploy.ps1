$ErrorActionPreference = "Stop"

# Find Vercel token
$authPaths = @(
    "$env:APPDATA\Local\com.vercel.cli\auth.json",
    "$env:USERPROFILE\.vercel\auth.json",
    "$env:APPDATA\com.vercel.cli\auth.json"
)
$token = $null
foreach ($p in $authPaths) {
    if (Test-Path $p) {
        Write-Host "Found auth at $p"
        $auth = Get-Content $p | ConvertFrom-Json
        $token = $auth.token
        break
    }
}
if (-not $token) { Write-Error "Vercel token not found!"; exit 1 }
Write-Host "Token found (first 8 chars): $($token.Substring(0,8))..."

# Project settings
$projectId = "prj_Wnag8yg7ICxswmn05QY3nVGFDgxw"
$teamId = "team_yze6KFOP792mMfampVb6mbGq"
$repoDir = "C:\Users\smani\CompanyWorkspaces\NightFactory\outputs\processbi-3d-deploy"
$files = @("about.html","case-studies.html","contact.html","favicon.svg","index.html","logo-animated.svg","methodology.html","og-image.png","robots.txt","services.html","shared-nav.js","shared.css","sitemap.xml","technology.html","vercel.json")

$headers = @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" }
$uploadedFiles = @()

foreach ($file in $files) {
    $path = Join-Path $repoDir $file
    if (-not (Test-Path $path)) { Write-Host "SKIP: $file not found"; continue }
    $bytes = [System.IO.File]::ReadAllBytes($path)
    $sha = [System.BitConverter]::ToString([System.Security.Cryptography.SHA1]::Create().ComputeHash($bytes)).Replace("-","").ToLower()
    $b64 = [Convert]::ToBase64String($bytes)
    Write-Host "Uploading $file (sha: $($sha.Substring(0,8))...)..."
    $body = @{ sha = $sha; size = $bytes.Length } | ConvertTo-Json
    try {
        $r = Invoke-RestMethod -Uri "https://api.vercel.com/v2/now/files" -Method POST -Headers @{ Authorization = "Bearer $token"; "x-now-digest" = $sha; "x-now-size" = $bytes.Length; "Content-Type" = "application/octet-stream" } -Body $bytes
    } catch { Write-Host "  (file may already exist - continuing)" }
    $uploadedFiles += @{ file = $file; sha = $sha; size = $bytes.Length }
}

Write-Host "Creating deployment..."
$deployBody = @{
    name = "processbi"
    files = $uploadedFiles
    projectId = $projectId
    teamId = $teamId
    target = "production"
    projectSettings = @{ framework = $null }
} | ConvertTo-Json -Depth 10

$result = Invoke-RestMethod -Uri "https://api.vercel.com/v13/deployments?teamId=$teamId" -Method POST -Headers $headers -Body $deployBody
Write-Host "Deployment created: $($result.id)"
Write-Host "URL: $($result.url)"
Write-Host "State: $($result.readyState)"
