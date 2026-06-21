@echo off
powershell -ExecutionPolicy Bypass -Command "
$paths = @(
    \"$env:USERPROFILE\.now\auth.json\",
    \"$env:LOCALAPPDATA\now\auth.json\",
    \"$env:APPDATA\now\auth.json\",
    \"$env:LOCALAPPDATA\com.vercel.cli\auth.json\",
    \"$env:USERPROFILE\.vercel\auth.json\",
    \"$env:APPDATA\com.vercel.cli\auth.json\",
    \"$env:LOCALAPPDATA\vercel\auth.json\"
)
Write-Host 'Checking paths:'
foreach (\$p in \$paths) {
    \$exists = Test-Path \$p
    Write-Host \"  \$p -> \$exists\"
}

Write-Host ''
Write-Host 'Searching AppData for any auth.json...'
Get-ChildItem -Path \$env:LOCALAPPDATA -Recurse -Filter 'auth.json' -ErrorAction SilentlyContinue | Select-Object FullName | Format-Table -AutoSize
Write-Host 'Search in APPDATA:'
Get-ChildItem -Path \$env:APPDATA -Recurse -Filter 'auth.json' -ErrorAction SilentlyContinue | Select-Object FullName | Format-Table -AutoSize
Write-Host 'Search in USERPROFILE root:'
Get-ChildItem -Path \$env:USERPROFILE -Filter 'auth.json' -ErrorAction SilentlyContinue | Select-Object FullName
"
pause
