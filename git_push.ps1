# ProcessBI Git Push Deploy
# Clears index.lock if present, commits changed files, pushes to GitHub
# GitHub push triggers Vercel CI/CD automatically

$repo = "C:\Users\smani\CompanyWorkspaces\NightFactory\outputs\processbi-3d-deploy"
Set-Location $repo

Write-Host "=== ProcessBI Git Push Deploy ===" -ForegroundColor Cyan

# Clear stale lock
$lock = "$repo\.git\index.lock"
if (Test-Path $lock) {
    Remove-Item $lock -Force
    Write-Host "Cleared index.lock" -ForegroundColor Yellow
}

# Stage files
git add index.html services.html shared-nav.js
Write-Host "Staged: index.html services.html shared-nav.js"

# Commit
$msg = "UX: 4-section services nav dropdown, mouse parallax + cursor glow hero $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git commit -m $msg
Write-Host "Committed: $msg"

# Push
Write-Host "Pushing to GitHub (Vercel CI/CD will deploy automatically)..." -ForegroundColor Green
git push origin master 2>&1
Write-Host "=== Push complete. Check https://vercel.com for deployment status ===" -ForegroundColor Green
Read-Host "Press Enter to close"
