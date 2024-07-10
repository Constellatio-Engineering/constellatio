#!/bin/bash

if [[ $(which mkcert) == "" ]] || [[ $(brew ls --versions nss) == "" ]]; then
    echo "Requires: mkcert & nss"
    echo "Please run: 'brew install mkcert nss'."
    exit 1
fi

CERTS_DIR="certs"

CONSTELLATIO_DOMAIN=${1:-"constellatio.localhost"}
CONSTELLATIO_CERT_PEM_FILE="${CERTS_DIR}/constellatio.localhost.cert.pem"
CONSTELLATIO_KEY_PEM_FILE="${CERTS_DIR}/constellatio.localhost.key.pem"

sudo mkcert -install

mkdir -p ${CERTS_DIR}

echo "-- Creating and installing local SSL certificates for domains: ${CONSTELLATIO_DOMAIN} + *.${CONSTELLATIO_DOMAIN} ..."
sudo mkcert -cert-file ${CONSTELLATIO_CERT_PEM_FILE} -key-file ${CONSTELLATIO_KEY_PEM_FILE} "${CONSTELLATIO_DOMAIN}" "*.${CONSTELLATIO_DOMAIN}"

echo "Done"
