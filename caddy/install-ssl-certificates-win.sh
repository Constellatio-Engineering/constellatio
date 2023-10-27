#!/bin/bash

# Check for mkcert
if ! command -v mkcert &> /dev/null; then
    echo "Requires: mkcert"
    echo "Please run: 'choco install mkcert'."
    exit 1
fi

# Currently, there's no check for 'nss' because Chocolatey doesn't have a direct package for it as of my last update. 
# You might need to find an alternative way to install it on Windows or check if your use-case really needs it.

CERTS_DIR="certs"

CONSTELLATIO_DOMAIN=${1:-"constellatio.localhost"}
CONSTELLATIO_CERT_PEM_FILE="${CERTS_DIR}/constellatio.localhost.cert.pem"
CONSTELLATIO_KEY_PEM_FILE="${CERTS_DIR}/constellatio.localhost.key.pem"

# There's no sudo on Windows. If elevation is needed, run the script as administrator.
mkcert -install

mkdir -p ${CERTS_DIR}

echo "-- Creating and installing local SSL certificates for domains: ${CONSTELLATIO_DOMAIN} + *.${CONSTELLATIO_DOMAIN} ..."
mkcert -cert-file ${CONSTELLATIO_CERT_PEM_FILE} -key-file ${CONSTELLATIO_KEY_PEM_FILE} "${CONSTELLATIO_DOMAIN}" "*.${CONSTELLATIO_DOMAIN}"

echo "Done"
