# Deploy to Firebase Hosting using Service Account
Write-Host "🚀 Starting Automated Firebase Deployment..." -ForegroundColor Cyan

$serviceAccountKey = "adicionales-santa-fe-firebase-adminsdk-fbsvc-112bd55a2a.json"

if (Test-Path $serviceAccountKey) {
    # Set environment variable for the session
    $env:GOOGLE_APPLICATION_CREDENTIALS = (Resolve-Path $serviceAccountKey).Path
    
    # Deploy
    npx firebase-tools deploy --only hosting
    
    Write-Host "✅ Deployment Complete! Visit: https://adicionales-santa-fe.web.app" -ForegroundColor Green
}
else {
    Write-Host "❌ Error: Service account key not found: $serviceAccountKey" -ForegroundColor Red
}
