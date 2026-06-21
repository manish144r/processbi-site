@echo off
echo ================================================
echo  ProcessBI Git Fix and Push
echo ================================================

set REPO=C:\Users\smani\CompanyWorkspaces\NightFactory\outputs\processbi-3d-deploy

echo [1] Removing any index lock files...
del /f "%REPO%\.git\index.lock" 2>nul
del /f "%REPO%\.git\index.lock.old" 2>nul
del /f "%REPO%\.git\index.lock.old2" 2>nul

echo [2] Running git add...
cd /d "%REPO%"
git add about.html case-studies.html contact.html favicon.svg index.html logo-animated.svg methodology.html og-image.png robots.txt services.html shared-nav.js shared.css sitemap.xml technology.html

echo [3] Git status:
git status --short

echo [4] Git commit...
git commit -m "Restore correct ProcessBI source from Downloads extract - fix nav bar on inner pages"

echo [5] Git push...
git push origin master

echo ================================================
echo  DONE. Check above for errors.
echo ================================================
pause
