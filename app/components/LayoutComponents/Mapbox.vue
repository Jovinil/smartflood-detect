<template>
    <MapboxMap 
            class="flex-1 rounded-sm"
            map-id="<MAP_ID>"
            :options="{
              style: 'mapbox://styles/mapbox/standard', // style URL
              center: {lng: 124.22636, lat: 13.57884}, // starting position
              zoom: 16.70,
              bearing: 0,
              pitch: 49
            }"
          >
            <MapboxSource 
              source-id="<MAP_ID>"
              :source="{
                type: 'geojson',
                data: '/test.geojson'
              }"
            />
            <MapboxLayer
              :layer="{
                source: '<MAP_ID>',
                id: 'geojson-layer',
                type: 'fill'
              }"
            />
        <MapboxGeolocateControl position="top-left" />
    </MapboxMap>
</template>