@echo off
echo ================================================
echo  ProcessBI — Vercel API Deploy (no CLI)
echo ================================================

set REPO=C:\Users\smani\CompanyWorkspaces\NightFactory\outputs\processbi-3d-deploy
set PS_SCRIPT=%REPO%\vercel_deploy.ps1

echo [1] Writing PowerShell deploy script...

(
echo $ErrorActionPreference = "Stop"
echo.
echo # Find Vercel token
echo $authPaths = @(
echo     "$env:APPDATA\Local\com.vercel.cli\auth.json",
echo     "$env:USERPROFILE\.vercel\auth.json",
echo     "$env:APPDATA\com.vercel.cli\auth.json"
echo ^)
echo $token = $null
echo foreach ($p in $authPaths^) {
echo     if (Test-Path $p^) {
echo         Write-Host "Found auth at $p"
echo         $auth = Get-Content $p ^| ConvertFrom-Json
echo         $token = $auth.token
echo         break
echo     }
echo }
echo if (-not $token^) { Write-Error "Vercel token not found!"; exit 1 }
echo Write-Host "Token found (first 8 chars): $($token.Substring(0,8))..."
echo.
echo # Project settings
echo $projectId = "prj_Wnag8yg7ICxswmn05QY3nVGFDgxw"
echo $teamId = "team_yze6KFOP792mMfampVb6mbGq"
echo $repoDir = "C:\Users\smani\CompanyWorkspaces\NightFactory\outputs\processbi-3d-deploy"
echo $files = @("about.html","case-studies.html","contact.html","favicon.svg","index.html","logo-animated.svg","methodology.html","og-image.png","robots.txt","services.html","shared-nav.js","shared.css","sitemap.xml","technology.html","vercel.json"^)
echo.
echo $headers = @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" }
echo $uploadedFiles = @(^)
echo.
echo foreach ($file in $files^) {
echo     $path = Join-Path $repoDir $file
echo     if (-not (Test-Path $path^)^) { Write-Host "SKIP: $file not found"; continue }
echo     $bytes = [System.IO.File]::ReadAllBytes($path^)
echo     $sha = [System.BitConverter]::ToString([System.Security.Cryptography.SHA1]::Create(^).ComputeHash($bytes^)^).Replace("-",""^).ToLower(^)
echo     $b64 = [Convert]::ToBase64String($bytes^)
echo     Write-Host "Uploading $file (sha: $($sha.Substring(0,8))...)..."
echo     $body = @{ sha = $sha; size = $bytes.Length } ^| ConvertTo-Json
echo     try {
echo         $r = Invoke-RestMethod -Uri "https://api.vercel.com/v2/now/files" -Method POST -Headers @{ Authorization = "Bearer $token"; "x-now-digest" = $sha; "x-now-size" = $bytes.Length; "Content-Type" = "application/octet-stream" } -Body $bytes
echo     } catch { Write-Host "  (file may already exist - continuing)" }
echo     $uploadedFiles += @{ file = $file; sha = $sha; size = $bytes.Length }
echo }
echo.
echo Write-Host "Creating deployment..."
echo $deployBody = @{
echo     name = "processbi"
echo     files = $uploadedFiles
echo     projectId = $projectId
echo     teamId = $teamId
echo     target = "production"
echo     projectSettings = @{ framework = $null }
echo } ^| ConvertTo-Json -Depth 10
echo.
echo $result = Invoke-RestMethod -Uri "https://api.vercel.com/v13/deployments?teamId=$teamId" -Method POST -Headers $headers -Body $deployBody
echo Write-Host "Deployment created: $($result.id)"
echo Write-Host "URL: $($result.url)"
echo Write-Host "State: $($result.readyState)"
) > "%PS_SCRIPT%"

echo [2] Running PowerShell deploy script...
powershell -ExecutionPolicy Bypass -File "%PS_SCRIPT%"

echo ================================================
echo  Done!
echo ================================================
pause
