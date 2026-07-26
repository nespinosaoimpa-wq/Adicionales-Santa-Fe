$payload = @{
    fields = @{
        message = @{ stringValue = "📢 ¡SISTEMA RESTABLECIDO Y OPTIMIZADO! La aplicación ha sido actualizada correctamente a la versión v535.7.0." }
        type = @{ stringValue = "info" }
        timestamp = @{ stringValue = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ") }
    }
} | ConvertTo-Json -Depth 5

$response = Invoke-RestMethod -Uri "https://firestore.googleapis.com/v1/projects/adicionales-santa-fe/databases/(default)/documents/announcements" -Method Post -Body $payload -ContentType "application/json"
Write-Host "Announcement published successfully:" ($response.name)
