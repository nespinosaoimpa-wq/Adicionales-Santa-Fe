# ============================================================
# DEPLOY SCRIPT - Adicionales Santa Fe
# ============================================================

Write-Host "Starting full deployment..." -ForegroundColor Cyan

# 1. Save changes to git (main)
Write-Host "Committing changes to main..." -ForegroundColor Yellow
git add -A
$msg = Read-Host "Commit message (Enter for 'Update')"
if (-not $msg) { $msg = "Update" }
git commit -m $msg
git push origin main

# 2. Publish to Firebase Hosting (Automated with Service Account)
Write-Host "Deploying to Firebase Hosting..." -ForegroundColor Yellow
$serviceAccountKey = "adicionales-santa-fe-firebase-adminsdk-fbsvc-112bd55a2a.json"

if (Test-Path $serviceAccountKey) {
    $env:GOOGLE_APPLICATION_CREDENTIALS = (Resolve-Path $serviceAccountKey).Path
    npx firebase-tools deploy --only hosting,firestore:rules
} else {
    Write-Warning "Service account key not found. Attempting manual deploy..."
    npx firebase-tools deploy --only hosting,firestore:rules
}

# 3. Synchronize with GitHub Pages (deploys only /app folder content)
Write-Host "Syncing with GitHub Pages..." -ForegroundColor Yellow
$tempDir = "C:\Temp\gh-pages-$(Get-Date -Format 'yyyyMMddHHmmss')"
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
Copy-Item -Path ".\app\*" -Destination $tempDir -Recurse -Force
Push-Location $tempDir
git init
git checkout -b gh-pages
git add -A
git commit -m "Deploy: app to gh-pages"
git remote add origin "https://github.com/nespinosaoimpa-wq/Adicionales-Santa-Fe.git"
git push origin gh-pages --force
Pop-Location
Remove-Item -Path $tempDir -Recurse -Force

Write-Host "" 
Write-Host "DEPLOY COMPLETE!" -ForegroundColor Green
Write-Host "Live Site: https://adicionales-santa-fe.web.app" -ForegroundColor Green
