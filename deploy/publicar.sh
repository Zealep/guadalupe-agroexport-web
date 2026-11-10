#!/usr/bin/env bash
# Compila la web y la sube al droplet. Uso (desde la carpeta del proyecto, en Git Bash):
#
#   bash deploy/publicar.sh IP_DEL_DROPLET
#
# Cada publicación se guarda en una carpeta nueva y se activa al final, así la web
# nunca queda a medias. Se conservan las 3 últimas por si hay que volver atrás.
set -euo pipefail

SERVIDOR="${1:?Indica la IP del droplet: bash deploy/publicar.sh 123.45.67.89}"
USUARIO="${USUARIO:-root}"
BASE=/var/www/agroguadalupe
VERSION=$(date +%Y%m%d-%H%M%S)

cd "$(dirname "$0")/.."

echo "==> Compilando"
npm ci --silent
npm run build

echo "==> Subiendo versión $VERSION a $SERVIDOR"
tar -czf - -C dist . | ssh "$USUARIO@$SERVIDOR" "
  set -e
  mkdir -p $BASE/releases/$VERSION
  tar -xzf - -C $BASE/releases/$VERSION
  ln -sfn $BASE/releases/$VERSION $BASE/current
  cd $BASE/releases && ls -1t | tail -n +4 | xargs -r rm -rf
"

echo "==> Publicado: versión $VERSION"
