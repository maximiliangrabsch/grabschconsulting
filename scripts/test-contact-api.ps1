param(
    [string]$BaseUrl = "http://localhost:3000"
)

$body = @{
    name    = "Max Mustermann"
    email   = "test@example.com"
    company = "Test GmbH"
    role    = "CTO/Tech-Lead"
    message = "Dies ist eine Test-Nachricht zur Überprüfung der Email-Integration."
} | ConvertTo-Json

Write-Host "Testing contact API at $BaseUrl/api/contact ..." -ForegroundColor Cyan
Write-Host ""

try {
    $response = Invoke-RestMethod `
        -Uri "$BaseUrl/api/contact" `
        -Method Post `
        -Body $body `
        -ContentType "application/json"

    if ($response.success -eq $true) {
        Write-Host "✅ Test erfolgreich — E-Mail wurde gesendet." -ForegroundColor Green
    } else {
        Write-Host "❌ Unerwartete Antwort:" -ForegroundColor Red
        $response | ConvertTo-Json
        exit 1
    }
} catch {
    Write-Host "❌ Fehler: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
