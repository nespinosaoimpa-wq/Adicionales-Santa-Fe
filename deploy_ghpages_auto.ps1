# Automated Dual-Path GitHub Pages Deploy Script
$tempDir = ".\temp_deploy_dir_ghpages"
if (Test-Path $tempDir) { Remove-Item -Path $tempDir -Recurse -Force }
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

# 1. Copy app contents to root of gh-pages branch
Copy-Item -Path ".\app\*" -Destination $tempDir -Recurse -Force

# 2. Copy app contents into /app subfolder of gh-pages for dual-path compatibility
$appSubfolder = Join-Path $tempDir "app"
New-Item -ItemType Directory -Path $appSubfolder -Force | Out-Null
Copy-Item -Path ".\app\*" -Destination $appSubfolder -Recurse -Force

# 3. Git Push to gh-pages branch
Push-Location $tempDir
git init
git checkout -b gh-pages
git add -A
git commit -m "Deploy: app dual-path to gh-pages (v535.9.2)"
git remote add origin "https://github.com/nespinosaoimpa-wq/Adicionales-Santa-Fe.git"
git push origin gh-pages --force
Pop-Location
Remove-Item -Path $tempDir -Recurse -Force
Write-Host "Deployed dual-path PWA successfully to gh-pages!" -ForegroundColor Green
