# Massachusetts Municipalities Map

Based on data from:

https://www.mass.gov/info-details/massgis-data-municipalities

First we simplify the data so it is easier to work with.

Then we add in population density as an example to start with,
and show that on a color scale. The data shown can be switched.

The essential library is [mapshaper](https://github.com/mbloch/mapshaper)
for geo file manipulation.

Color scales were picked from the wonderful colorbrewer2,
mapshaper could be used for color scales directly instead.

Note the data from Massachusetts came already projected
so it is planar to begin with.

## Getting Started

Before getting started run `npm install` to get the `mapshaper` dependency.

Then run the following:

```bash
npm run data:fetch # run this once to download data and unzip it in data
npm run build:init # make geojson file from shapefile while simplifying in build
npm run build:pop # adds population density to geojson data in build
npm run build:svg # creates svg file and key from the geojson data in dist
```

You should be able to see locally `dist/map.svg`
that should look like the following example here.

<img src="example-map.svg" alt="Example Map">

<img src="example-map-key.svg" alt="Example Map Key">

Population density (in 2010) for people / square mile by municipality.

## Appendix

Inspired by:

https://medium.com/@mbostock/command-line-cartography-part-1-897aa8f8ca2c

But the tools in use in that article were not as useful as `mapshaper` is.

Colors were picked from:

https://colorbrewer2.org/

Population density breaks were investigated in:

https://vega.github.io/voyager/

Very useful command line reference for mapshaper is:

https://github.com/mbloch/mapshaper/wiki/Command-Reference
