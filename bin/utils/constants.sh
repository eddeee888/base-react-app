#!/bin/bash

CORE_CMD_NAME="bra"
USR_BIN="/usr/local/bin"
DOMAIN="vm"
DNS_PORT=53535
DNS_CONTAINER_NAME="${DOMAIN}-dnsmasq" 
RESOLVER_DIR="/etc/resolver"
RESOLVER_FILE="$RESOLVER_DIR/$DOMAIN"