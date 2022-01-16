#!/usr/bin/env bash
set -e
# usage: ./scripts/buildSVG.sh in-geo.json out-map.svg out-map-key.svg

IN_FILE=`dirname $0`/../$1
OUT_FILE=`dirname $0`/../$2
OUT_KEY_FILE=`dirname $0`/../$3

# colors are from https://colorbrewer2.org/#type=sequential&scheme=YlGn&n=7
npx mapshaper \
  -i $IN_FILE \
  -classify \
    field=DENSITY \
    save-as=fill \
    colors='#005a32,#238443,#41ab5d,#78c679,#addd8e,#d9f0a3,#ffffcc' \
    breaks=100,500,1000,2000,5000,10000 \
    key-style=simple \
    key-name=$OUT_KEY_FILE \
  -style \
    stroke='rgba(0,0,0,0.3)' \
    stroke-width=0.5 \
  -o width=1200 \
  $OUT_FILE
