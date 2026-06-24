@echo off
title ProcessBI Smart Git Push
echo ============================================
echo  ProcessBI Smart Push — handles diverge + stash
echo ============================================
echo.
cd /d "C:\Users\smani\CompanyWorkspaces\NightFactory\outputs\processbi-3d-deploy"

echo [1] Killing stale git processes...
taskkill /f /im git.exe 2>nul
timeout /t 2 /nobreak >nul

echo [2] Removing all git locks and merge state...
if exist ".git\index.lock" del /f ".git\index.lock"
if exist ".git\MERGE_HEAD" del /f ".git\MERGE_HEAD"
if exist ".git\MERGE_MSG" del /f ".git\MERGE_MSG"
if exist ".git\MERGE_MODE" del /f ".git\MERGE_MODE"
echo Lock/merge state cleared.

echo [3] Fetching remote...
git fetch origin master
if errorlevel 1 goto :error

echo [4] Stashing all local changes...
git stash --include-untracked
echo Stash done (ok if nothing to stash)

echo [5] Pulling with rebase (rebase our mobile fix on top of remote)...
git pull --rebase origin master
if errorlevel 1 (
    echo Rebase failed — trying merge instead...
    git rebase --abort 2>nul
    git merge origin/master --no-edit
    if errorlevel 1 goto :error
)

echo [6] Pushing...
git push origin master
if errorlevel 1 goto :error

echo [7] Restoring stashed changes...
git stash pop
echo (ok if nothing to pop)

echo.
echo ============================================
echo  SUCCESS — mobile fix pushed to Vercel!
echo ============================================
pause
goto :eof

:error
echo.
echo ============================================
echo  ERROR — see output above
echo ============================================
git stash pop 2>nul
pause
