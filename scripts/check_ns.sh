#!/bin/bash

DOMAINS=(
  "dpdpworkshop.com"
  "dpdpaudit.co.in"
  "dpdpbible.com"
  "dpdpnews.in"
  "dpdptemplates.in"
  "dpdptemplate.in"
  "dpdptraining.in"
  "dpdpblog.in"
  "privacypodcast.in"
  "dpdpconsulting.in"
  "dpdphelp.in"
  "dpdp.cloud"
  "dpdptemplates.com"
  "dpdptemplate.com"
  "dpdp.news"
  "dpdpnews.com"
  "dpdp.training"
  "dpdptraining.co.in"
  "dpdpinfo.in"
  "dpdpblog.com"
  "dpdp.blog"
  "dpdpconsulting.net"
  "dpdpconsulting.co.in"
  "dpdpindia.online"
  "dpdpworkshop.co.in"
  "dpdpworkshop.in"
  "dpdpcompliance.info"
  "dpdpcompliance.online"
  "dpdpaudit.info"
)

echo "Checking Nameservers for ${#DOMAINS[@]} domains..."
echo "---------------------------------------------------"
printf "%-25s | %s\n" "DOMAIN" "NAMESERVERS"
echo "---------------------------------------------------"

for domain in "${DOMAINS[@]}"; do
  ns=$(dig +short NS "$domain" | tr '\n' ' ' | sed 's/ $//')
  if [ -z "$ns" ]; then
    ns="❌ NO RECORDS"
  fi
  printf "%-25s | %s\n" "$domain" "$ns"
done
