# Deploy to Firebase Hosting using Service Account
Write-Host "🚀 Starting Automated Firebase Deployment..." -ForegroundColor Cyan

$serviceAccountKey = "adicionales-santa-fe-firebase-adminsdk-fbsvc-112bd55a2a.json"

# Build dist directory
Write-Host "Building dist/ directory..." -ForegroundColor Yellow
if (Test-Path ".\dist") { Remove-Item -Path ".\dist" -Recurse -Force }
New-Item -ItemType Directory -Path ".\dist" -Force | Out-Null

# Copy root static files
Copy-Item -Path ".\*.html" -Destination ".\dist\" -Force
Copy-Item -Path ".\*.txt" -Destination ".\dist\" -Force
Copy-Item -Path ".\*.json" -Destination ".\dist\" -Exclude "package.json", "package-lock.json", "firebase.json", "adicionales-santa-fe-firebase-adminsdk-fbsvc-112bd55a2a.json" -Force
Copy-Item -Path ".\*.pdf" -Destination ".\dist\" -Force
if (Test-Path ".\sw.js") { Copy-Item -Path ".\sw.js" -Destination ".\dist\" -Force }

# Copy app directory
New-Item -ItemType Directory -Path ".\dist\app" -Force | Out-Null
Copy-Item -Path ".\app\*" -Destination ".\dist\app" -Recurse -Force

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
