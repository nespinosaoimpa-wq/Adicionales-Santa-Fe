# Deploy to GitHub Pages
# 1. Initialize Git if not already
# 2. Commit changes
# 3. Create gh-pages branch
# 4. Push to remote

$remoteUrl = "https://github.com/nespinosaoimpa-wq/Adicionales-Santa-Fe.git"

if (-not (Test-Path ".git")) {
    git init
    git remote add origin $remoteUrl
}

git add .
git commit -m "Deploying v1.9.4 - UI Styles Fixed"
git branch -M main
git push -u origin main

# Deploy using subtree to gh-pages
git subtree push --prefix app origin gh-pages

Write-Host "Deployment started... Check Repository Settings -> Pages"
