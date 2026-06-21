@echo off
echo ================================================
echo  ProcessBI — Finish Push (empty trigger commit)
echo ================================================

set REPO=C:\Users\smani\CompanyWorkspaces\NightFactory\outputs\processbi-3d-deploy
cd /d "%REPO%"

echo [1] Creating empty trigger commit...
git commit --allow-empty -m "Trigger Vercel deployment - fix inner page nav"

echo [2] Pushing to GitHub...
git push origin master

echo ================================================
echo  Done! Check output above.
echo ================================================
pause
