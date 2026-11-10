#!/usr/bin/env bash
# Preparación inicial del droplet (Ubuntu 22.04 / 24.04). Se ejecuta UNA sola vez, como root:
#
#   scp deploy/preparar-servidor.sh deploy/agroguadalupe.conf root@IP_DEL_DROPLET:/root/
#   ssh root@IP_DEL_DROPLET "bash /root/preparar-servidor.sh"
#
# Es seguro volver a ejecutarlo: no rompe lo que ya esté configurado.
set -euo pipefail

echo "==> Actualizando el sistema"
apt-get update -y
DEBIAN_FRONTEND=noninteractive apt-get upgrade -y

echo "==> Instalando Nginx, Certbot y firewall"
DEBIAN_FRONTEND=noninteractive apt-get install -y nginx certbot python3-certbot-nginx ufw unattended-upgrades

echo "==> Firewall: solo SSH, HTTP y HTTPS"
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "==> Memoria swap de 2 GB (colchón para la app Flutter + PostgreSQL)"
if ! swapon --show | grep -q /swapfile; then
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
  echo 'vm.swappiness=10' > /etc/sysctl.d/99-swap.conf
  sysctl -p /etc/sysctl.d/99-swap.conf
fi

echo "==> Actualizaciones de seguridad automáticas"
dpkg-reconfigure -f noninteractive unattended-upgrades

echo "==> Carpeta de la web"
mkdir -p /var/www/agroguadalupe/releases
if [ ! -e /var/www/agroguadalupe/current ]; then
  mkdir -p /var/www/agroguadalupe/releases/inicial
  echo '<!doctype html><meta charset="utf-8"><title>Agroexportadora Guadalupe</title><p>Próximamente.</p>' \
    > /var/www/agroguadalupe/releases/inicial/index.html
  ln -sfn /var/www/agroguadalupe/releases/inicial /var/www/agroguadalupe/current
fi

echo "==> Configuración de Nginx"
cp /root/agroguadalupe.conf /etc/nginx/sites-available/agroguadalupe.conf
ln -sfn /etc/nginx/sites-available/agroguadalupe.conf /etc/nginx/sites-enabled/agroguadalupe.conf
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

echo
echo "Listo. Siguientes pasos:"
echo "  1. Publica la web desde tu PC:  bash deploy/publicar.sh IP_DEL_DROPLET"
echo "  2. Apunta el dominio (registros A de @ y www) a la IP de este droplet."
echo "  3. Cuando el dominio ya apunte aquí, activa HTTPS:"
echo "     certbot --nginx -d agroguadalupe.com -d www.agroguadalupe.com --redirect"
