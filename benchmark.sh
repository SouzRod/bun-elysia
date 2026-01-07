#!/usr/bin/env bash
set -euo pipefail

# -------------------------
# Valores padrão
# -------------------------
DEFAULT_URL="https://google.com.br"
DEFAULT_DURATION=30
DEFAULT_CONNECTIONS=100
DEFAULT_PIPELINING=1

# -------------------------
# Parâmetros
# -------------------------
URL="${1:-$DEFAULT_URL}"
DURATION="${2:-$DEFAULT_DURATION}"
CONNECTIONS="${3:-$DEFAULT_CONNECTIONS}"
PIPELINING="${4:-$DEFAULT_PIPELINING}"

# -------------------------
# Validação básica
# -------------------------
if ! [[ "$URL" =~ ^https?:// ]]; then
  echo "❌ URL inválida: $URL"
  echo "Use algo como: http://localhost:3000/endpoint"
  exit 1
fi

# -------------------------
# Output
# -------------------------
echo "🚀 Benchmarking"
echo "-------------------------------------"
echo "🌐 URL         : $URL"
echo "⏱  Duration    : ${DURATION}s"
echo "🔗 Connections : ${CONNECTIONS}"
echo "📦 Pipelining  : ${PIPELINING}"
echo "-------------------------------------"

# -------------------------
# Execução
# -------------------------
autocannon \
  -d "$DURATION" \
  -c "$CONNECTIONS" \
  -p "$PIPELINING" \
  --latency \
  "$URL"
