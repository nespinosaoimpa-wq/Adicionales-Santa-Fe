# ============================================================
# DEPLOY SCRIPT — Adicionales Santa Fe
# = [MODIFIED] — Fixed syntax and added gh-pages sync
# ============================================================

Write-Host "🚀 Iniciando deploy completo..." -ForegroundColor Cyan

# 1. Guardar cambios en git (main = historial de código)
Write-Host "📦 Commiteando cambios en main..." -ForegroundColor Yellow
git add -A
# Version automatically generated or prompted
$msg = "Fix: Deduplication and UI double-click protection"
git commit -m $msg
git push origin main

# 2. Publicar a Firebase Hosting (el sitio REAL)
Write-Host "🔥 Desplegando a Firebase Hosting..." -ForegroundColor Yellow
npx firebase-tools deploy --only hosting, firestore:rules

# 3. Sincronizar con GitHub Pages
Write-Host "📚 Sincronizando con GitHub Pages..." -ForegroundColor Yellow
git subtree push --prefix app origin gh-pages

Write-Host "" 
Write-Host "✅ Deploy completo!" -ForegroundColor Green
Write-Host "🌐 Sitio en vivo: https://adicionales-santa-fe.web.app" -ForegroundColor Green
