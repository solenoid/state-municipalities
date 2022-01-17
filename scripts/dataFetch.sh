#!/usr/bin/env bash
set -e
# usage: ./scripts/dataFetch.sh data/download.massgis.digital.mass.gov/shapefiles/state/townssurvey_shp.zip

# See https://www.mass.gov/info-details/massgis-data-municipalities

DATA_DIR=`dirname $0`/../`dirname $1`
ZIP_FILE=`basename $1`
DOWNLOAD_PATH=`echo ${1##data/}`

mkdir -p $DATA_DIR
pushd $DATA_DIR

ZIP_FILE=`basename $1`
curl -O https://s3.us-east-1.amazonaws.com/$DOWNLOAD_PATH
unzip $ZIP_FILE
rm $ZIP_FILE

popd
