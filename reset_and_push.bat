@echo off
echo ================================================
echo  ProcessBI — Reset Local to Remote and Push
echo ================================================

set REPO=C:\Users\smani\CompanyWorkspaces\NightFactory\outputs\processbi-3d-deploy

cd /d "%REPO%"

echo [1] Fetching remote state...
git fetch origin

echo [2] Resetting local to match remote master (99dc294)...
git reset --hard origin/master

echo [3] Verify HEAD...
git log --oneline -3

echo [4] Creating empty trigger commit...
git commit --allow-empty -m "Trigger Vercel deployment - fix inner page nav"

echo [5] Pushing to GitHub...
git push origin master

echo ================================================
echo  Done! Check output above.
echo ================================================
pause
