@echo off
setlocal

set REPO_DIR=C:\Users\smani\CompanyWorkspaces\NightFactory\outputs\processbi-3d-deploy
set COMMIT_MSG=fix: defer Three.js + shared-nav.js on all pages; add OG tags to case-studies and contact

cd /d "%REPO_DIR%"
if errorlevel 1 (
    echo ERROR: Could not cd to %REPO_DIR%
    pause
    exit /b 1
)

git add about.html case-studies.html contact.html industries.html services.html
git commit -m "%COMMIT_MSG%"
git push origin master

echo.
echo Done. Check Vercel dashboard for deployment status.
pause
