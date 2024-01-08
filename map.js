mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zaHdvbmciLCJhIjoiY2xra2JzYmMwMDRoODNkbW01cWQ5a3YxZyJ9.9FkG10VE5UOlc6BZhD2_zA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/joshwong/clp2p5o3q00xx01pe0bxvckff',
    zoom: 12,
    center: [-74, 40.765],
    maxZoom: 17,
    minZoom: 8,
    pitch: 55,
    bearing: -21
});

map.on('load', function () {
    // This is the function that finds the first symbol layer
    let layers = map.getStyle().layers;
    let firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        console.log(layers[i].id); // This is the line of code that prints the ids for every layer in the map
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }

    map.addLayer({
        'id': 'greenview_ratio',
        'type': 'fill-extrusion',
        'source': {
            'type': 'geojson',
            'data': 'data/SVI_buffer10_indexNumber.geojson'
        },
        'paint': {
            'fill-extrusion-color': ['interpolate', ['linear'], ['get', 'tree'],
            0, '#fafa6e',
            0.20, '#ffc058',
            0.40, '#f08a5b',
            0.60, '#ca5e62',
            0.80, '#953f62',
            1, '#582a56'
            ],
            //'circle-stroke-color': '#4d4d4d',
            //'circle-stroke-width': 0.2,
            'fill-extrusion-height': ['interpolate', ['exponential', 2], ['zoom'],
            10, ['interpolate', ['linear'], ['get', 'tree'],
                0, 300,
                1, 3000
            ],
            15, ['interpolate', ['linear'], ['get', 'tree'],
                0, 50,
                1, 500
            ]
            ],
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0.85
        }
    },firstSymbolId);  // Here's where we tell Mapbox where to slot this new layer

    map.addLayer({
        'id': 'skyview_ratio',
        'type': 'fill-extrusion',
        'layout': {
            'visibility': 'none'
        }, // make it invisible at the beginning
        'source': {
            'type': 'geojson',
            'data': 'data/SVI_buffer10_indexNumber.geojson'
        },
        'paint': {
            'fill-extrusion-color': ['interpolate', ['linear'], ['get', 'sky'],
            0, '#fafa6e',
            0.20, '#ffc058',
            0.40, '#f08a5b',
            0.60, '#ca5e62',
            0.80, '#953f62',
            1, '#582a56'
            ],
            //'circle-stroke-color': '#4d4d4d',
            //'circle-stroke-width': 0.2,
            'fill-extrusion-height': ['interpolate', ['exponential', 2], ['zoom'],
            10, ['interpolate', ['linear'], ['get', 'sky'],
                0, 300,
                1, 3000
            ],
            15, ['interpolate', ['linear'], ['get', 'sky'],
                0, 50,
                1, 500
            ]
            ],
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0.85
        }
    },firstSymbolId);  // Here's where to tell Mapbox where to slot this new layer

    map.addLayer({
        'id': 'medianIncome',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': 'data/medianIncome.geojson'
        },
        'paint': {
            'fill-color': ['step', ['get', 'MHHI'],
            '#ffffff',
            20000, '#ccedf5',
            50000, '#99daea',
            75000, '#66c7e0',
            100000, '#33b5d5',
            150000, '#00a2ca'],
            'fill-opacity': ['case', ['==', ['get', 'MHHI'], null], 0, 0.85]
        }
    }, 'waterway');
});


// Create the popup
map.on('click', 'greenview_ratio', function (e) {
    let green_view_ratio = e.features[0].properties.tree;
    let sky_exposure_ratio = e.features[0].properties.sky;
    let building_facade_ratio = e.features[0].properties.building;
    let car_ratio = e.features[0].properties.car;
    let SVI_number_index = e.features[0].SVI_ID;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4><b>SVI_computer_vision:</b>'+ '<h4>' 
            + '<p><b>Green_View_Ratio:</b> ' + green_view_ratio + '<br>'
            + '<b>Sky_Exposure_Ratio:</b>' + sky_exposure_ratio + '<br>'
            + '<b>Building_Facade_Ratio:</b> ' + building_facade_ratio + '<br>'
            + '<b>Car_Ratio:</b> ' + car_ratio+ '</p>') 
        .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the SVI index layer.
map.on('mouseenter', 'greenview_ratio', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'greenview_ratio', function () {
    map.getCanvas().style.cursor = '';
});

// Create the popup
map.on('click', 'skyview_ratio', function (e) {
    let green_view_ratio = e.features[0].properties.tree;
    let sky_exposure_ratio = e.features[0].properties.sky;
    let building_facade_ratio = e.features[0].properties.building;
    let car_ratio = e.features[0].properties.car;
    let SVI_number_index = e.features[0].SVI_ID;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4><b>SVI_computer_vision:</b>'+ '<h4>' 
            + '<p><b>Green_View_Ratio:</b> ' + green_view_ratio + '<br>'
            + '<b>Sky_Exposure_Ratio:</b>' + sky_exposure_ratio + '<br>'
            + '<b>Building_Facade_Ratio:</b> ' + building_facade_ratio + '<br>'
            + '<b>Car_Ratio:</b> ' + car_ratio+ '</p>') 
        .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the SVI index layer.
map.on('mouseenter', 'sky_ratio', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'sky_ratio', function () {
    map.getCanvas().style.cursor = '';
});


var toggleableLayerIds = ['greenview_ratio', 'medianIncome', 'skyview_ratio'];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.textContent = id;

    if (id === 'skyview_ratio') {
        link.className = ''; // 设置 medianIncome 的按钮为隐藏状态
    } else {
        link.className = 'active';
    }

    

    link.onclick = function(e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}


// 初始化第二个地图
const map2 = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/joshwong/clp2p5o3q00xx01pe0bxvckff',
    zoom: 13,
    center: [-74, 40.765],
    maxZoom: 17,
    minZoom: 8,
    //pitch: 55,
    //bearing: -21
});

map2.on('load', function() {
    // 添加基于 'green-view' 属性的热图图层
    map2.addLayer({
      'id': 'green-view-heatmap',
      'type': 'heatmap',
      'source': {
        'type': 'geojson',
        'data': 'data/SVI_with_indexNumber.geojson' 
      },
      'maxzoom': 18,
      'paint': {
        // 增加热图颜色权重
        'heatmap-weight': [
          'interpolate',
          ['linear'],
          ['get', 'tree'],
          0, 0,
          1, 1
        ],
        // 热图颜色范围设置
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, 'rgba(187, 235, 189, 0)',
          0.2, '#98cb9a',
          0.4, '#76ac77',
          0.6, '#548e57',
          0.8, '#327137',
          1, '#075518'
        ],
        // 调整热图强度
        'heatmap-intensity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 1,
          18, 3
        ],
        // 热图的半径设置
        'heatmap-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 2,
          18, 20
        ],
        // 热图的不透明度设置
        'heatmap-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          6, 1,
          18, 0
        ],
      }
    });

    map2.addLayer({
        'id': 'sky-view-heatmap',
        'type': 'heatmap',
        'source': {
          'type': 'geojson',
          'data': 'data/SVI_with_indexNumber.geojson' 
        },
        'maxzoom': 18,
        'paint': {
          // 增加热图颜色权重
          'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', 'tree'],
            0, 0,
            1, 1
          ],
          // 热图颜色范围设置
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(187, 235, 233, 0)',
            0.2, '#98c9c8',
            0.4, '#75a9a8',
            0.6, '#538989',
            0.8, '#316b6b',
            1, '#054e4f'
          ],
          // 调整热图强度
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 1,
            18, 3
          ],
          // 热图的半径设置
          'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 2,
            18, 20
          ],
          // 热图的不透明度设置
          'heatmap-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            6, 1,
            18, 0
          ],
        }
      });
      map2.addLayer({
        'id': 'medianIncome',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': 'data/medianIncome.geojson'
        },
        'paint': {
            'fill-color': ['step', ['get', 'MHHI'],
            '#ffffff',
            20000, '#ccedf5',
            50000, '#99daea',
            75000, '#66c7e0',
            100000, '#33b5d5',
            150000, '#00a2ca'],
            'fill-opacity': ['case', ['==', ['get', 'MHHI'], null], 0, 0.85]
        }
    }, 'waterway');
  
    // 
  });

  // 假设 map2 是您的第二个地图实例
// 为 map2 创建图层切换链接
var toggleableLayerIds2 = ['green-view-heatmap', 'sky-view-heatmap', 'medianIncome'];

for (var i = 0; i < toggleableLayerIds2.length; i++) {
    var id = toggleableLayerIds2[i];

    var link = document.createElement('a');
    link.href = '#';
    link.textContent = id; // 
    link.className = id === 'medianIncome' ? '' : 'active'; // make the default of median income deactivate

    link.onclick = (function(id) {
        return function(e) {
            e.preventDefault();
            e.stopPropagation();

            var visibility = map2.getLayoutProperty(id, 'visibility');

            if (visibility === 'visible') {
                map2.setLayoutProperty(id, 'visibility', 'none');
                this.className = '';
            } else {
                this.className = 'active';
                map2.setLayoutProperty(id, 'visibility', 'visible');
            }
        };
    })(id);

    var layers = document.getElementById('menu2'); // 确保这里是 'menu2'
    layers.appendChild(link);
}

  