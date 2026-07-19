@echo off
REM ProcessBI case-studies overhaul -> push to master (Vercel auto-deploys)
REM Uses your existing github.com credential (Windows Credential Manager).
setlocal
set WORK=%TEMP%\processbi-overhaul-deploy
if exist "%WORK%" rmdir /s /q "%WORK%"
git clone "%~dp0processbi-overhaul.bundle" "%WORK%"
cd /d "%WORK%"
git remote set-url origin https://github.com/manish144r/processbi-site.git
git checkout master
echo.
echo About to push commit:
git log -1 --oneline
echo.
pause
git push origin master
echo.
echo Done. Vercel will build and deploy processbi.com.au automatically.
pause
