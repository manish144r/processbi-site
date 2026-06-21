@echo off
echo Searching for Vercel auth files...
echo.
echo APPDATA=%APPDATA%
echo LOCALAPPDATA=%LOCALAPPDATA%
echo USERPROFILE=%USERPROFILE%
echo.

powershell -Command "Get-ChildItem -Path $env:LOCALAPPDATA, $env:APPDATA, $env:USERPROFILE -Recurse -Filter 'auth.json' -ErrorAction SilentlyContinue | Where-Object { $_.FullName -like '*vercel*' } | Select-Object FullName, Length" > "%~dp0vercel_token_locations.txt" 2>&1
type "%~dp0vercel_token_locations.txt"

echo.
echo Also checking .vercel folder:
powershell -Command "if (Test-Path '$env:USERPROFILE\.vercel\auth.json') { Get-Content '$env:USERPROFILE\.vercel\auth.json' | ConvertFrom-Json | Select-Object -Property @{N='token_preview';E={$_.token.Substring(0,[Math]::Min(12,$_.token.Length))+'...'}} }" >> "%~dp0vercel_token_locations.txt" 2>&1
type "%~dp0vercel_token_locations.txt"

pause
