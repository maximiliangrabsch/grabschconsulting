#!/bin/bash
set -e

BASE_URL="${1:-http://localhost:3000}"

echo "Testing contact API at $BASE_URL/api/contact ..."
echo ""

tmpfile=$(mktemp)

status=$(curl -s -o "$tmpfile" -w "%{http_code}" -X POST "$BASE_URL/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Max Mustermann",
    "email": "test@example.com",
    "company": "Test GmbH",
    "role": "CTO/Tech-Lead",
    "message": "Dies ist eine Test-Nachricht zur Überprüfung der Email-Integration."
  }')

body=$(cat "$tmpfile")
rm -f "$tmpfile"

echo "Status: $status"
echo "Body:   $body"
echo ""

if [ "$status" = "200" ] && echo "$body" | grep -q '"success":true'; then
  echo "✅ Test erfolgreich — E-Mail wurde gesendet."
else
  echo "❌ Test fehlgeschlagen."
  exit 1
fi
