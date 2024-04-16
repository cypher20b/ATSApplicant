// import { Component, OnInit } from '@angular/core';
// import Map from 'ol/Map.js';
// import Polygon from 'ol/geom/Polygon.js';
// import View from 'ol/View.js';
// import { OSM, Vector as VectorSource } from 'ol/source.js';
// import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
// import Draw, {
//   createBox,
//   createRegularPolygon,
// } from 'ol/interaction/Draw.js';
// type GeometryType = 'Point' | 'LineString' | 'Polygon' | 'Circle';
// @Component({
//     selector: 'app-jobs-on-map',
//     standalone: true,
//     imports: [],
//     templateUrl: './jobs-on-map.component.html',
//     styleUrl: './jobs-on-map.component.scss'
// })

// export class JobsOnMapComponent implements OnInit {
//   map!: Map;
//   draw!: Draw;
//   constructor() { }
//   removeme(){
//     console.log(this.draw)
//     this.draw.removeLastPoint()
//   }
//   ngOnInit(): void {
//     const raster = new TileLayer({
//       source: new OSM(),
//     });

//     const source = new VectorSource({ wrapX: false });

//     const vector = new VectorLayer({
//       source: source,
//     });

//     this.map = new Map({
//       layers: [raster, vector],
//       target: 'map',
//       view: new View({
//         center: [-11000000, 4600000],
//         zoom: 4,
//       }),
//     });

//     const typeSelect = document.getElementById('type') as HTMLSelectElement;
//     let drawType: GeometryType = 'Circle';
//     const addInteraction = () => {
//       let value = typeSelect.value;
//       const typeMapping: { [key: string]: GeometryType } = {
//         'Point': 'Point',
//         'LineString': 'LineString',
//         'Polygon': 'Polygon',
//         'Circle': 'Circle',
//       };
//       if (value !== 'None') {
//         let geometryFunction;
//         if (!drawType) {
//           console.error('Invalid geometry type selected');
//           return;
//         }
//         if (value === 'Square') {
//           value = 'Circle';
//           drawType = typeMapping[value]
//           geometryFunction = createRegularPolygon(4);
//         } else if (value === 'Box') {
//           value = 'Circle';
//           drawType = typeMapping[value]
//           geometryFunction = createBox();
//         } else if (value === 'Star') {
//           value = 'Circle';
//           geometryFunction = function (coordinates:any, geometry:any) {
//             const center = coordinates[0];
//             const last = coordinates[coordinates.length - 1];
//             const dx = center[0] - last[0];
//             const dy = center[1] - last[1];
//             const radius = Math.sqrt(dx * dx + dy * dy);
//             const rotation = Math.atan2(dy, dx);
//             const newCoordinates = [];
//             const numPoints = 12;
//             for (let i = 0; i < numPoints; ++i) {
//               const angle = rotation + (i * 2 * Math.PI) / numPoints;
//               const fraction = i % 2 === 0 ? 1 : 0.5;
//               const offsetX = radius * fraction * Math.cos(angle);
//               const offsetY = radius * fraction * Math.sin(angle);
//               newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
//             }
//             newCoordinates.push(newCoordinates[0].slice());
//             if (!geometry) {
//               geometry = new Polygon([newCoordinates]);
//             } else {
//               geometry.setCoordinates([newCoordinates]);
//             }
//             return geometry;
//           };
//         }
//         this.draw = new Draw({
//           source: source,
//           type: drawType,
//           geometryFunction: geometryFunction,
//         });
//         this.map.addInteraction(this.draw);
//       }
//     };

//     /**
//      * Handle change event.
//      */
//     typeSelect.onchange = () => {
//       this.map.removeInteraction(this.draw);
//       addInteraction();
//     };

//     document.getElementById('undo')!.addEventListener('click', () => {
//       this.draw.removeLastPoint();
//     });

//     addInteraction();
//   }

// }


import { AfterViewInit, Component, Inject, OnInit,PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Map from 'ol/Map.js';
import Polygon from 'ol/geom/Polygon.js';
import View from 'ol/View.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import Draw, { createBox, createRegularPolygon } from 'ol/interaction/Draw.js';

type GeometryType = 'Point' | 'LineString' | 'Polygon' | 'Circle';

@Component({
  selector: 'app-jobs-on-map',
  templateUrl: './jobs-on-map.component.html',
  styleUrls: ['./jobs-on-map.component.scss']
})
export class JobsOnMapComponent implements OnInit {
  map!: Map;
  draw: Draw | null = null

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const raster = new TileLayer({
        source: new OSM(),
      });
  
      const source = new VectorSource({ wrapX: false });
  
      const vector = new VectorLayer({
        source: source,
      });
  
    this.map = new Map({
      layers: [raster, vector],
      target: 'map',
      view: new View({
        center: [-11000000, 4600000],
        zoom: 4,
      }),
    });

    const typeSelect = document.getElementById('type') as HTMLSelectElement;

    let drawType: GeometryType = 'Circle';
    
    const addInteraction = () => {
      let value = typeSelect.value;
      const typeMapping: { [key: string]: GeometryType } = {
        'Point': 'Point',
        'LineString': 'LineString',
        'Polygon': 'Polygon',
        'Circle': 'Circle',
      };
      if (value !== 'None') {
        let geometryFunction;
        if (!drawType) {
          console.error('Invalid geometry type selected');
          return;
        }
        if (value === 'Square') {
          value = 'Circle';
          drawType = typeMapping[value]
          geometryFunction = createRegularPolygon(4);
        } else if (value === 'Box') {
          value = 'Circle';
          drawType = typeMapping[value]
          geometryFunction = createBox();
        } else if (value === 'Star') {
          value = 'Circle';
          geometryFunction = function (coordinates: any, geometry: any) {
            const center = coordinates[0];
            const last = coordinates[coordinates.length - 1];
            const dx = center[0] - last[0];
            const dy = center[1] - last[1];
            const radius = Math.sqrt(dx * dx + dy * dy);
            const rotation = Math.atan2(dy, dx);
            const newCoordinates = [];
            const numPoints = 12;
            for (let i = 0; i < numPoints; ++i) {
              const angle = rotation + (i * 2 * Math.PI) / numPoints;
              const fraction = i % 2 === 0 ? 1 : 0.5;
              const offsetX = radius * fraction * Math.cos(angle);
              const offsetY = radius * fraction * Math.sin(angle);
              newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
            }
            newCoordinates.push(newCoordinates[0].slice());
            if (!geometry) {
              geometry = new Polygon([newCoordinates]);
            } else {
              geometry.setCoordinates([newCoordinates]);
            }
            return geometry;
          };
        }
        this.draw = new Draw({
          source: source,
          type: drawType,
          geometryFunction: geometryFunction,
        });
        this.map.addInteraction(this.draw);
      }
    };

    typeSelect.onchange = () => {
      if (this.draw !== null) {
        this.map.removeInteraction(this.draw);
      }
      addInteraction();
    };

    // document.getElementById('undo')!.addEventListener('click', () => {
    //   this.removeDrawing();
    // });

    addInteraction();
  }
}
  removeDrawing() {
    if (this.draw !== null) {
      console.log(this.draw)
      const layers = this.map.getLayers().getArray();
      layers.forEach(layer => {
        if (layer instanceof VectorLayer) {
          const source = layer.getSource();
          source.clear();
        }
      });
    }
  }

}
