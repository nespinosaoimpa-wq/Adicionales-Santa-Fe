# Deploy to Firebase Hosting
Write-Host "🚀 Starting Firebase Deployment for Adicionales Santa Fe..." -ForegroundColor Cyan

# 1. Check if Firebase CLI is installed
if (Get-Command firebase -ErrorAction SilentlyContinue) {
    # 2. Deploy
    firebase deploy --only hosting
    Write-Host "✅ Deployment Complete! Visit: https://adicionales-santa-fe.web.app" -ForegroundColor Green
}
else {
    Write-Host "❌ Error: Firebase CLI not detected. Run 'npm install -g firebase-tools' first." -ForegroundColor Red
}
