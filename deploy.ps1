# ============================================================
# DEPLOY SCRIPT — Adicionales Santa Fe
# Uso: .\deploy.ps1
# ============================================================

Write-Host "🚀 Iniciando deploy completo..." -ForegroundColor Cyan

# 1. Guardar cambios en git (main = historial de código)
Write-Host "📦 Commiteando cambios en main..." -ForegroundColor Yellow
git add -A
$msg = Read-Host "Mensaje del commit (Enter para usar 'Update')"
if (-not $msg) { $msg = "Update" }
git commit -m $msg
git push origin main

# 2. Publicar a Firebase Hosting (el sitio REAL)
Write-Host "🔥 Desplegando a Firebase Hosting (adicionales-santa-fe.web.app)..." -ForegroundColor Yellow
npx firebase-tools deploy --only hosting,firestore:rules

Write-Host "" 
Write-Host "✅ Deploy completo!" -ForegroundColor Green
Write-Host "🌐 Sitio en vivo: https://adicionales-santa-fe.web.app" -ForegroundColor Green
