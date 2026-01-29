# Run this script in PowerShell to start the dev server
Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install

Write-Host "`nStarting development server..." -ForegroundColor Cyan
npm run dev
