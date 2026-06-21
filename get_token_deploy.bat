@echo off
echo ================================================
echo  ProcessBI — Deploy via Vercel API
echo ================================================

set REPO=C:\Users\smani\CompanyWorkspaces\NightFactory\outputs\processbi-3d-deploy
set OUT=%REPO%\deploy_result.txt

echo Running PowerShell deploy...
powershell -ExecutionPolicy Bypass -Command ^
  "$paths = @('%LOCALAPPDATA%\com.vercel.cli\auth.json', '%USERPROFILE%\.vercel\auth.json', '%APPDATA%\com.vercel.cli\auth.json'); $token = $null; foreach($p in $paths){ if(Test-Path $p){ $token = (Get-Content $p | ConvertFrom-Json).token; Write-Host \"Found token at $p\"; break } }; if(-not $token){ Write-Host 'TOKEN NOT FOUND - checked:'; $paths; exit 1 }; Write-Host \"Token starts: $($token.Substring(0,[Math]::Min(8,$token.Length)))...\"; $files = @('about.html','case-studies.html','contact.html','favicon.svg','index.html','logo-animated.svg','methodology.html','og-image.png','robots.txt','services.html','shared-nav.js','shared.css','sitemap.xml','technology.html','vercel.json'); $h = @{Authorization=\"Bearer $token\"; 'Content-Type'='application/json'}; $ul = @(); foreach($f in $files){ $fp = Join-Path '%REPO%' $f; if(!(Test-Path $fp)){Write-Host \"SKIP $f\"; continue}; $b = [IO.File]::ReadAllBytes($fp); $sha = ([BitConverter]::ToString(([Security.Cryptography.SHA1]::Create()).ComputeHash($b))).Replace('-','').ToLower(); Write-Host \"Upload $f...\"; try{ Invoke-RestMethod -Uri 'https://api.vercel.com/v2/now/files' -Method POST -Headers @{Authorization=\"Bearer $token\"; 'x-now-digest'=$sha; 'x-now-size'=$b.Length; 'Content-Type'='application/octet-stream'} -Body $b | Out-Null }catch{ Write-Host \"  (exists/ok)\" }; $ul += @{file=$f; sha=$sha; size=$b.Length} }; $body = @{name='processbi'; files=$ul; projectId='prj_Wnag8yg7ICxswmn05QY3nVGFDgxw'; teamId='team_yze6KFOP792mMfampVb6mbGq'; target='production'; projectSettings=@{framework=$null}} | ConvertTo-Json -Depth 10; $r = Invoke-RestMethod -Uri 'https://api.vercel.com/v13/deployments?teamId=team_yze6KFOP792mMfampVb6mbGq' -Method POST -Headers $h -Body $body; Write-Host \"DONE: $($r.id) - $($r.url)\" | Out-File -FilePath '%OUT%'; Write-Host \"Deployment: $($r.id)\"; Write-Host \"URL: $($r.url)\""

echo.
echo Check deploy_result.txt for output.
pause
