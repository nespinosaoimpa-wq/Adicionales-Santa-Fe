# Deploy solo la carpeta /app a la rama gh-pages
Write-Host "Deploying /app to gh-pages..." -ForegroundColor Cyan

$appPath = ".\app"
$tempDir = "C:\Temp\gh-pages-deploy-$(Get-Date -Format 'yyyyMMddHHmmss')"

# Copiar contenido de /app a carpeta temporal
Write-Host "Copying /app contents to temp folder..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
Copy-Item -Path "$appPath\*" -Destination $tempDir -Recurse -Force

# Inicializar repo git en la carpeta temporal
Push-Location $tempDir
git init
git checkout -b gh-pages
git add -A
git commit -m "Deploy: app content to gh-pages $(Get-Date -Format 'yyyy-MM-dd HH:mm')"

# Obtener remote del repo principal
$remote = "https://github.com/nespinosaoimpa-wq/Adicionales-Santa-Fe.git"
git remote add origin $remote
git push origin gh-pages --force

Pop-Location

# Limpiar carpeta temporal
Remove-Item -Path $tempDir -Recurse -Force

Write-Host "gh-pages deployed successfully!" -ForegroundColor Green
Write-Host "Live at: https://nespinosaoimpa-wq.github.io/Adicionales-Santa-Fe/" -ForegroundColor Green
