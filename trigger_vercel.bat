@echo off
echo ================================================
echo  ProcessBI — Sync and Trigger Vercel Deploy
echo ================================================

set REPO=C:\Users\smani\CompanyWorkspaces\NightFactory\outputs\processbi-3d-deploy

cd /d "%REPO%"

echo [1] Git pull to sync with remote (API commit)...
git pull origin master

echo [2] Git status...
git status

echo [3] Create empty trigger commit to fire Vercel webhook...
git commit --allow-empty -m "Trigger Vercel deployment [ci deploy]"

echo [4] Git push...
git push origin master

echo ================================================
echo  Done! Check output above.
echo ================================================
pause
