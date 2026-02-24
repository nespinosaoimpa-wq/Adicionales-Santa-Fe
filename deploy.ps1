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

# 2. Publish to Firebase Hosting
Write-Host "Deploying to Firebase Hosting..." -ForegroundColor Yellow
npx firebase-tools deploy --only hosting, firestore:rules

# 3. Synchronize with GitHub Pages
Write-Host "Syncing with GitHub Pages..." -ForegroundColor Yellow
git subtree push --prefix app origin gh-pages

Write-Host "" 
Write-Host "DEPLOY COMPLETE!" -ForegroundColor Green
Write-Host "Live Site: https://adicionales-santa-fe.web.app" -ForegroundColor Green
