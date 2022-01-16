#!/usr/bin/env node
// see https://github.com/tc39/proposal-hashbang on how the above is standardizing

// usage ./scripts/buildPopulation.js in-geo.json out-geo.json [out-debug.csv]
import fs from 'fs/promises'

const IN_FILE = process.argv[2]
const OUT_FILE = process.argv[3]
const OUT_CSV_FILE = process.argv[4]

const raw = await fs.readFile(IN_FILE)
let geoData = JSON.parse(raw)

let csvLines = ['TOWN,POP2010,SUM_SQUARE,DENSITY']
geoData.features.forEach((feature) => {
  // console.log(feature.properties)
  feature.properties.DENSITY = Math.floor(
    feature.properties.POP2010 / feature.properties.SUM_SQUARE,
  )
  csvLines.push(
    [
      feature.properties.TOWN,
      feature.properties.POP2010,
      feature.properties.SUM_SQUARE,
      feature.properties.DENSITY,
    ].join(','),
  )
})
// csv can be viewed at https://vega.github.io/voyager/
if (OUT_CSV_FILE) await fs.writeFile(OUT_CSV_FILE, csvLines.join('\n'))
await fs.writeFile(OUT_FILE, JSON.stringify(geoData))
