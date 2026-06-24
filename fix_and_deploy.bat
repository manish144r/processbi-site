@echo off
echo ============================================
echo ProcessBI - Fix Git Index and Deploy
echo ============================================
cd /d "C:\Users\smani\CompanyWorkspaces\NightFactory\outputs\processbi-3d-deploy"

echo [1] Removing corrupt git index...
if exist .git\index del /f /q .git\index
if exist .git\index.lock del /f /q .git\index.lock
if exist .git\refs\remotes\origin\master.lock del /f /q .git\refs\remotes\origin\master.lock

echo [2] Rebuilding index from HEAD...
git reset HEAD

echo [3] Creating empty commit to trigger Vercel webhook...
git -c user.email="s.manishuk@gmail.com" -c user.name="ProcessBI Deploy" commit --allow-empty -m "deploy: trigger Vercel for mobile responsive fix (c0282b7) [ci deploy]"

echo [4] Pushing to GitHub...
git push origin master

echo [5] Done!
git log --oneline -3
pause
