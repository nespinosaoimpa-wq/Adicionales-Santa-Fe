$tempDir = ".\temp_deploy_dir_ghpages"
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
Copy-Item -Path ".\app\*" -Destination $tempDir -Recurse -Force
Push-Location $tempDir
git init
git checkout -b gh-pages
git add -A
git commit -m "Deploy: app to gh-pages (Light Mode Update)"
git remote add origin "https://github.com/nespinosaoimpa-wq/Adicionales-Santa-Fe.git"
git push origin gh-pages --force
Pop-Location
Remove-Item -Path $tempDir -Recurse -Force
Write-Host "Deployed smoothly!"
