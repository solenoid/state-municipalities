#!/usr/bin/env bash
set -e
# usage: ./scripts/dataFetch2020.sh data/programs-surveys/popest/datasets/2010-2020/cities/SUB-EST2020_25.csv

# See https://www.census.gov/data/tables/time-series/demo/popest/2020s-state-total.html
# See Datasets available at https://www2.census.gov/programs-surveys/popest/datasets/

DATA_DIR=`dirname $0`/../`dirname $1`
DOWNLOAD_PATH=`echo ${1##data/}`

mkdir -p $DATA_DIR
pushd $DATA_DIR

curl -O https://www2.census.gov/$DOWNLOAD_PATH

popd
