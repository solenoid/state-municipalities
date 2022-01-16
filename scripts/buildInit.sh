#!/usr/bin/env bash
set -e
# usage: ./scripts/buildInit.sh in-geo.shp out-geo.json

IN_FILE=`dirname $0`/../$1
OUT_FILE=`dirname $0`/../$2

npx mapshaper \
  -i $IN_FILE \
  -simplify planar 1% \
  -o $OUT_FILE
