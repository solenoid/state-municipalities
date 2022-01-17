#!/usr/bin/env node
// see https://github.com/tc39/proposal-hashbang on how the above is standardizing

// usage ./scripts/buildPop2020.js in-geo.json out-geo.json in.csv [out-debug.csv]
import fs from 'fs/promises'
import { csvParse } from 'd3-dsv'

const IN_FILE = process.argv[2]
const OUT_FILE = process.argv[3]
const IN_CSV_FILE = process.argv[4]
const OUT_CSV_FILE = process.argv[5]

const rawCSV = await fs.readFile(IN_CSV_FILE)
const usItemsAsParsed = csvParse(rawCSV.toString())
const usItems = usItemsAsParsed.map((d) => {
  d.TOWN = d.NAME.toUpperCase()
    .replace(/ CITY$/, '')
    .replace(/ TOWN$/, '')
  // In US data MANCHESTER-BY-THE-SEA in mass data MANCHESTER
  if (d.TOWN === 'MANCHESTER-BY-THE-SEA') d.TOWN = 'MANCHESTER'
  d.POP2020 = Number.parseInt(d.POPESTIMATE2020, 10)
  d.POP2010 = Number.parseInt(d.POPESTIMATE2010, 10)
  return d
})

const rawJSON = await fs.readFile(IN_FILE)
let geoData = JSON.parse(rawJSON)

let csvLines = ['TOWN,POP2020,POP2010,SUM_SQUARE,DENSITY']
geoData.features.forEach((feature) => {
  const usMatches = usItems.filter((d) => d.TOWN === feature.properties.TOWN)
  if (usMatches.length === 0) console.warn(`Missing ${feature.properties.TOWN} in US Census data.`)
  if (usMatches.length > 1) {
    const pop2010 = new Set(usMatches.map((d) => d.POP2010))
    const pop2020 = new Set(usMatches.map((d) => d.POP2010))
    if (pop2010.size > 1) {
      console.warn(`Multiple records for ${usMatches[0].TOWN} that don't match for POP2010`)
    }
    if (pop2020.size > 1) {
      console.warn(`Multiple records for ${usMatches[0].TOWN} that don't match for POP2020`)
    }
  }
  const usMatch = usMatches[0]
  if (usMatch.POP2010 !== feature.properties.POP2010) {
    const difference = Math.abs(usMatch.POP2010 - feature.properties.POP2010)
    if (difference / usMatch.POP2010 > 0.01 && difference > 500) {
      console.warn(
        `Greater than 1% Mismatch and 500 difference on POP2010 for ${usMatch.TOWN} Mass was ${feature.properties.POP2010} and US was ${usMatch.POP2010}`,
      )
    }
  }
  feature.properties.POP2010 = usMatch.POP2010
  feature.properties.POP2020 = usMatch.POP2020
  feature.properties.DENSITY = Math.floor(
    feature.properties.POP2020 / feature.properties.SUM_SQUARE,
  )
  csvLines.push(
    [
      feature.properties.TOWN,
      feature.properties.POP2020,
      feature.properties.POP2010,
      feature.properties.SUM_SQUARE,
      feature.properties.DENSITY,
    ].join(','),
  )
})
// csv can be viewed at https://vega.github.io/voyager/
if (OUT_CSV_FILE) await fs.writeFile(OUT_CSV_FILE, csvLines.join('\n'))
await fs.writeFile(OUT_FILE, JSON.stringify(geoData))
