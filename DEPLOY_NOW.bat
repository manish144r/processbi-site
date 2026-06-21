@echo off
echo ================================================
echo  ProcessBI CLEAN DEPLOY
echo ================================================
echo.

set REPO=C:\Users\smani\CompanyWorkspaces\NightFactory\outputs\processbi-3d-deploy
cd /d "%REPO%"

echo Working dir: %CD%
echo.
echo Checking auth:
vercel whoami
echo.
echo Linked project:
type .vercel\project.json
echo.
echo ================================================
echo  Running: vercel --prod --yes
echo ================================================

vercel --prod --yes 2>&1 > deploy_output.txt
type deploy_output.txt

echo.
echo ================================================
echo  Done. Output also saved to deploy_output.txt
echo ================================================
pause
