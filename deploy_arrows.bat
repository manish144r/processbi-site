@echo off
echo ============================================
echo ProcessBI - Finalise Merge + Arrow CTAs
echo ============================================
cd /d "C:\Users\smani\CompanyWorkspaces\NightFactory\outputs\processbi-3d-deploy"

echo [1] Clearing any stale locks...
if exist .git\index.lock del /f /q .git\index.lock

echo [2] Staging all resolved files...
git add -A

echo [3] Committing merge + Colcap arrow CTA quick win...
git -c user.email="s.manishuk@gmail.com" -c user.name="ProcessBI Deploy" commit -m "feat: arrow CTAs on all primary/outline buttons (Colcap quick win L3)"

echo [4] Pushing to GitHub...
git push origin master

echo [5] Done!
git log --oneline -5
pause
