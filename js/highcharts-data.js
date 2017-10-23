/**
 * Highcharts chart options for all charts as a single object.
 * This allows charts to be loaded on demand or by a normal page load.
 */
(function($, Highcharts) {
  Highcharts.chartData = {};

  Highcharts.setOptions({
    lang: {
      thousandsSep: ',',
      useUTC: true
    },
    legend: {
      itemMarginBottom: 8,
    }
  });

  /**
   * Defer animating the chart until it is on screen.
   */
  Highcharts.deferRender = function(proceed) {
    var series = this,
      $renderTo = $(this.chart.container.parentNode);

    // If visible, render it.
    if ($renderTo.is(':appeared') || !series.options.animation) {
      setTimeout(function() {
        proceed.call(series)
      }, 1500);

      // Not yet visible, render it when it is.
    }
    else {
      $renderTo.appear({interval: 1500});
      // Initialize appear plugin
      $renderTo.one('appear', function() {
        proceed.call(series);
      });
    }
  };

  Highcharts.wrap(Highcharts.Series.prototype, 'render', Highcharts.deferRender);

  /**
   * ChartData object
   * @param {string} type Used to determine what function to use when rendering.
   */
  var ChartData = function(type) {
    this.type = type || false;

    var chartOptions = {};
    var mapData = [];
    var that = this;

    this.setOptions = function(options) {
      chartOptions = options;
      return this;
    };

    this.getOptions = function() {
      return $.extend({}, chartOptions);
    };

    this.setMapData = function(paths) {
      $.extend(mapData, Highcharts.maps['custom/world-custom']);
      $.each(paths, function(index, path) {
        mapData.push(path);
      });
      return that;
    };

    this.getMapData = function() {
      return mapData;
    };

    return this;
  };

  /**
   * Charts.
   */

  Highcharts.chartData['chart-6.4a'] = new ChartData('map').setMapData([{
      "name": "regSouthWestAsia",
      "path": "M262,-691L269,-691L269,-683L262,-683Z"
    }, {
      "name": "regSouthEastAsia",
      "path": "M402,-766L410,-766L410,-759L402,-759Z"
    }, {
      "name": "regNorthPacific",
      "path": "M455,-721L462,-721L462,-714L455,-714Z"
    }, {
      "name": "regPacific",
      "path": "M578,-723L585,-723L585,-716L578,-716Z"
    }, {
      "name": "regMiddleEast",
      "path": "M111,-771L118,-771L118,-764L111,-764Z"
    }, {
      "name": "regSubSaharanAfrica",
      "path": "M100,-688L108,-688L108,-681L100,-681Z"
    }, {
      "name": "regPalestinianTerritories",
      "path": "M141,-784L149,-784L149,-777L141,-777Z"
    }]
  );
  Highcharts.chartData['chart-6.4a'].setOptions({
    chart: {
      map: 'custom/world-custom'
    },
    credits: {
      enabled: false
    },
    exporting: {
      fallbackToExportServer: false,
      sourceWidth: 944,
      sourceHeight: 549,
      chartOptions: {
        title: {
          text: 'Destinations of Australian development assitance (2017 - 2018 FY)'
        },
        credits: {
          enabled: true,
          text: 'Source: Department of Foreign Affairs and Trade'
        }
      }
    },
    title: {
      text: null
    },
    legend: {
      enabled: false
    },
    mapNavigation: {
      enabled: true
    },
    plotOptions: {
      map: {
        allAreas: true,
      },
      mapbubble: {
        dataLabels: {
          enabled: true,
          format: '${point.z}m'
        },
      }
    },
    tooltip: {
      pointFormat: '{point.displayName}: ${point.z}m'
    },
    series: [
      {
        name: 'Australia ODA by partner country and region 2017-18',
        enableMouseTracking: false
      }, {
        name: 'Pacific',
        type: 'mapbubble',
        joinBy: [
          'name', 'id'
        ],
        // minSize: 2,
        // maxSize: '10%',
        mapData: Highcharts.chartData['chart-6.4a'].getMapData(),
        data: [
          {
            id: 'regPacific',
            displayName: 'Pacific Regional',
            z: 127.3
          },
          {
            id: 'Federated States of Micronesia',
            displayName: 'North Pacific',
            z: 8
          },
          {
            id: 'Papua New Guinea',
            displayName: 'Papua New Guinea',
            z: 546.3
          },
          {
            id: 'Solomon Islands',
            displayName: 'Solomon Islands',
            z: 142.2
          },
          {
            id: 'Vanuatu',
            displayName: 'Vanuatu',
            z: 69.8
          },
          {
            id: 'Samoa',
            displayName: 'Samoa',
            z: 37.2
          },
          {
            id: 'Fiji',
            displayName: 'Fiji',
            z: 65.6
          },
          {
            id: 'Tonga',
            displayName: 'Tonga',
            z: 30.4
          },
          {
            id: 'Nauru',
            displayName: 'Nauru',
            z: 25.4
          },
          {
            id: 'Kiribati',
            displayName: 'Kiribati',
            z: 30.9
          },
          {
            id: 'Tuvalu',
            displayName: 'Tuvalu',
            z: 8.7
          },
          {
            id: 'CookIslands',
            displayName: 'Cook Islands',
            z: 3.2
          },
          {
            id: 'Niue and Tokelau',
            displayName: 'Niue and Tokelau',
            z: 2.9
          }
        ]
      }, {
        name: 'South East and East Asia',
        type: 'mapbubble',
        joinBy: [
          'name', 'id'
        ],
        // minSize: 2,
        // maxSize: '10%',
        mapData: Highcharts.chartData['chart-6.4a'].getMapData(),
        data: [
          {
            id: 'regSouthEastAsia',
            displayName: 'South East and East Asia Regional',
            z: 53.8
          },
          {
            id: 'Indonesia',
            displayName: 'Indonesia',
            z: 356.9
          },
          {
            id: 'Vietnam',
            displayName: 'Vietnam',
            z: 84.2
          },
          {
            id: 'Philippines',
            displayName: 'Philippines',
            z: 85.0
          },
          {
            id: 'East Timor',
            displayName: 'Timor-Leste',
            z: 96.1
          },
          {
            id: 'Cambodia',
            displayName: 'Cambodia',
            z: 87.4
          },
          {
            id: 'Myanmar',
            displayName: 'Myanmar',
            z: 66.4
          },
          {
            id: 'Laos',
            displayName: 'Laos',
            z: 42.3
          },
          {
            id: 'Mongolia',
            displayName: 'Mongolia',
            z: 10.9
          }
        ]
      }, {
        name: 'South and West Asia',
        type: 'mapbubble',
        joinBy: [
          'name', 'id'
        ],
        // minSize: 2,
        // maxSize: '10%',
        mapData: Highcharts.chartData['chart-6.4a'].getMapData(),
        data: [
          {
            id: 'regSouthWestAsia',
            displayName: 'South and West Asia Regional',
            z: 25.4
          },
          {
            id: 'Afghanistan',
            displayName: 'Afghanistan',
            z: 80.9
          },
          {
            id: 'Bangladesh',
            displayName: 'Bangladesh',
            z: 57.9
          },
          {
            id: 'Bhutan',
            displayName: 'Bhutan',
            z: 9.2
          },
          {
            id: 'Sri Lanka',
            displayName: 'Sri Lanka',
            z: 27.7
          },
          {
            id: 'Maldives',
            displayName: 'Maldives',
            z: 3.8
          },
          {
            id: 'Nepal',
            displayName: 'Nepal',
            z: 31.9
          },
          {
            id: 'Pakistan',
            displayName: 'Pakistan',
            z: 47.1
          }
        ]
      }, {
        name: 'Africa and the Middle East',
        type: 'mapbubble',
        joinBy: [
          'name', 'id'
        ],
        // minSize: 2,
        // maxSize: '10%',
        tooltip: {
          pointFormat: '{point.displayName}: ${point.z}m'
        },
        mapData: Highcharts.chartData['chart-6.4a'].getMapData(),
        data: [
          {
            id: 'regSubSaharanAfrica',
            displayName: 'Sub-Saharan Africa',
            z: 108.2
          },
          {
            id: 'regMiddleEast',
            displayName: 'Middle East and North Africa',
            z: 101.6
          },
          {
            id: 'regPalestinianTerritories',
            displayName: 'Palestinian Territories',
            z: 43.8
          },
        ]
      }
    ]
  });

  Highcharts.chartData['chart-6.4b'] = new ChartData().setOptions({
    chart: {
      type: 'pie'
    },
    credits: {
      enabled: false
    },
    exporting: {
      fallbackToExportServer: false,
      sourceWidth: 1170,
      sourceHeight: 600,
      chartOptions: {
        title: {
          text: 'Australian aid by sector (2017 - 2018)'
        },
        credits: {
          enabled: true,
          text: 'Source: Department of Foreign Affairs and Trade'
        }
      },
    },
    title: {
      text: null
    },
    tooltip: {
      pointFormat: '{series.name}: ${point.y} MIL'
    },
    plotOptions: {
      pie: {
        allowPointSelect: false,
        dataLabels: {
          enabled: true,
         // format: '${point.y} MIL'
          format: '{point.percentage:.1f}%'
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Development assistance',
      innerSize: '60%',
      data: [{
        name: 'General development support',
        y: 234.5
      }, {
        name: 'Building resilience',
        y: 618.3
      }, {
        name: 'Health',
        y: 495.7
      }, {
        name: 'Education',
        y: 675.3
      }, {
        name: 'Effective governance',
        y: 823.7
      }, {
        name: 'Agriculture, fisheries and water',
        y: 339.5
      }, {
        name: 'Infrastructure and trade',
        y: 543.9
      }]
    }]
  });

  Highcharts.chartData['chart-5.1'] = new ChartData().setOptions({
    chart: {
      type: 'column'
    },
    credits: {
      enabled: false
    },
    exporting: {
      fallbackToExportServer: false,
      sourceWidth: 944,
      sourceHeight: 549,
    },
    xAxis: {
      title: {
        text: 'Year'

      },
      categories: [2001, 2006, 2011, 2017],
      tickPosition: 'inside'
    },
    yAxis: {
      title: {
        text: 'Percentage of Australians with an Australian passport'
      },
      labels: {
        format: '{value}',
      },
      allowDecimals: false
    },
    legend: {
      enabled: false
    },
    title: {
      text: null
    },
    plotOptions: {
      column: {
        marker: {
          enabled: true
        }
      }
    },
    tooltip: {
      shared: true,
      crosshairs: true,

      //OLD TOOLTIP FORMAT
      //pointFormat: '{series.name}: <b>{point.y}%</b>',
      formatter: function() {
        return '<b>'+this.y +'%</b>';
      }
    },
    series: [{
      name: 'Percentage of Australians',
      data: [38, 43, 49, 56]
    }]
  });

  Highcharts.chartData['chart-1.4'] = new ChartData('map').setMapData([
    {
      "name": "cityHongKong",
      "path": "M356,-754L363,-754L363,-747L356,-747Z"
    }
  ]);
  Highcharts.chartData['chart-1.4'].setOptions({
    chart: {
      map: 'custom/world-custom',
      events: {
        load: function () {
          var ren = this.renderer;
          // Separator, client from service
          ren.label('Other<br/>$211.2b', 500, 300)
            .attr({
            })
            .css({
                color: 'black'
            })
            .add();
        }
      }
    },
    exporting: {
      fallbackToExportServer: false,
      sourceWidth: 944,
      sourceHeight: 549,
    },
    title: {
      text: null
    },
    legend: {
      enabled: false
    },
    mapNavigation: {
      enabled: true
    },
    colorAxis: {
      min: 0
    },
    plotOptions: {
      mapbubble: {
        dataLabels: {
          enabled: true,
          format: ' ${point.z:,.1f}b'
        }
      }
    },
    series: [
      {
        name: 'Countries',
        enableMouseTracking: false
      }, {
        name: '2016',
        type: 'mapbubble',
        joinBy: [
          'name', 'id'
        ],
        tooltip: {
          pointFormat: '{point.displayName}: ${point.z:,.1f}b'
        },
        // minSize: 6,
        maxSize: '30%',
        mapData: Highcharts.chartData['chart-1.4'].getMapData(),
        data: [
          {
            displayName: 'United States',
            id: 'United States of America',
            z: 195.0
          },
          {
            displayName: 'Japan',
            id: 'Japan',
            z: 90.9
          },
          {
            displayName: 'United Kingdom',
            id: 'United Kingdom',
            z: 67.9
          },
          {
            displayName: 'Netherlands',
            id: 'Netherlands',
            z: 50.4
          },
          {
            displayName: 'China',
            id: 'China',
            z: 41.9
          },
          {
            displayName: 'Singapore',
            id: 'Singapore',
            z: 31.2
          },
          {
            displayName: 'EU (excluding UK, NL)',
            id: 'Italy',
            z: 46.6
          },
          {
            displayName: 'ASEAN (excluding Singapore)',
            id: 'Vietnam',
            z: 12.7
          },
          {
            displayName: 'Hong Kong',
            id: 'cityHongKong',
            z: 12.1
          },
          {
            displayName: 'New Zealand',
            id: 'New Zealand',
            z: 7.2
          },
          {
            displayName: 'Canada',
            id: 'Canada',
            z: 29.1
          },
        ]
      }
    ]
  });

  Highcharts.chartData['chart-4.4a'] = new ChartData().setOptions({
    chart: {
      type: 'column'
    },
    credits: {
      enabled: false
    },
    exporting: {
      fallbackToExportServer: false,
      sourceWidth: 944,
      sourceHeight: 549,
    },
    title: {
      text: null
    },
    xAxis: {
      categories: [
        'China', 'India', 'Japan', 'Republic of Korea'
      ],
      crosshair: true,
      tickPosition: 'inside'
    },
    yAxis: {
      max: 100,
      title: {
        text: 'Percentage of imports from Australia'
      }
    },
    tooltip: {
      pointFormat: '{series.name}: {point.y}%',
      valueDecimals: 1
    },
    series: [
      {
        name: 2005,
        data: [61.5, 82.7, 70.7, 56.5]
      }, {
        name: 2010,
        data: [51.3, 89.3, 75.2, 58.4]
      }, {
        name: 2015,
        data: [53.6, 83.8, 73.5, 64.0]
      }
    ]
  });

  Highcharts.chartData['chart-4.4b'] = new ChartData().setOptions({
    chart: {
      type: 'column'
    },
    credits: {
      enabled: false
    },
    exporting: {
      fallbackToExportServer: false,
      sourceWidth: 944,
      sourceHeight: 549,
    },
    title: {
      text: null
    },
    xAxis: {
      categories: [
        'China', 'India', 'Japan', 'Republic of Korea'
      ],
      crosshair: true,
      tickPosition: 'inside'
    },
    yAxis: {
      max: 100,
      title: {
        text: 'Percentage of imports from Australia'
      }
    },
    tooltip: {
      pointFormat: '{series.name}: {point.y}%',
      valueDecimals: 1
    },
    series: [
      {
        name: 2005,
        data: [42.7, 0, 57.6, 59.0]
      }, {
        name: 2010,
        data: [44.2, 30.5, 56.3, 68.5]
      }, {
        name: 2015,
        data: [65.5, 3.6, 54.2, 71.6]
      }
    ]
  });

  Highcharts.chartData['chart-2.7'] = new ChartData().setOptions({
    chart: {
      type: 'bar'
    },
    credits: {
      enabled: false
    },
    exporting: {
      fallbackToExportServer: false,
      sourceWidth: 944,
      sourceHeight: 549,
    },
    legend: {
      enabled: false,
    },
    title: {
      text: null
    },
    xAxis: {
      categories: ['China', 'India', 'Indonesia', 'Philippines', 'Vietnam', 'Thailand', 'Republic of Korea', 'Japan']
    },
    yAxis: {
     title: {
        text: "Additional number of people (million)",
      },
      tickInterval: 50
    },
    tooltip: {
      pointFormat: '{series.name}: {point.y:.1f} million',
      valueDecimals: 1
    },
    series: [{
      name: '2010-2030 change',
      data: [329.5, 210.1, 64.8, 16.9, 16.7, 13.9, 4.4, 1.6]
    }]
  });

  Highcharts.chartData['chart-4.6'] = new ChartData().setOptions({
    chart: {
      type: 'bar',
      ignoreHiddenSeries: false
    },
    credits: {
      enabled: false
    },
    exporting: {
      fallbackToExportServer: false,
      sourceWidth: 944,
      sourceHeight: 549,
    },
    title: {
      text: null
    },
    xAxis: {
      categories: [1987, 2002, 2016]
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Percentage of total exports'
      }
    },
    plotOptions: {
      series: {
        stacking: 'percent'
      },
      bar: {
        dataLabels: {
          enabled: false,
          format: '{point.percentage:.0f}%'
        }
      }
    },
    tooltip: {
      pointFormat: '{series.name}: {point.percentage:.0f}%'
    },
    series: [
      {
        name: 'Asia',
        data: [23024, 89246, 240870]
      }, {
        name: 'Europe',
        data: [10359, 24288, 34773]
      }, {
        name: 'Americas',
        data: [6887, 20500, 28032]
      }, {
        name: 'Oceania',
        data: [4785, 13652, 16976]
      }, {
        name: 'Other',
        data: [1926, 3932, 6059]
      }, {
        name: 'Africa',
        data: [689, 3677, 3650]
      }
    ]
  });

  Highcharts.chartData['chart-4.2'] = new ChartData().setOptions({
    chart: {
      type: 'areaspline'
    },
    credits: {
      enabled: false
    },
    exporting: {
      fallbackToExportServer: false,
      sourceWidth: 944,
      sourceHeight: 549,
    },
    title: {
      text: null
    },
    yAxis: {
      title: {
        text: 'AUD$ billions'
      },
    },
    plotOptions: {
      series: {
        pointStart: 1980,
      },
      areaspline: {
        marker: {
          enabled: false
        },
        stacking: 'normal',
      }
    },
    tooltip: {
      shared: true,
      crosshairs: true,
    },
    series: [ {
      name: 'Rural goods',
      data: [8, 7, 8, 7, 9, 11, 12, 14, 15, 15, 13, 14, 15, 16, 18, 18, 20, 23, 22, 22, 26, 30, 29, 22, 27, 25, 26, 24, 28, 27, 27, 34, 35, 38, 41, 45, 43]
    }, {
      name: 'Minerals, fuels, non-monetary gold',
      data: [6, 7, 8, 9, 9, 11, 12, 14, 15, 17, 22, 23, 24, 24, 23, 26, 27, 32, 34, 30, 42, 47, 45, 43, 46, 66, 82, 85, 135, 118, 150, 174, 162, 172, 171, 149, 161]
    }, {
      name: 'Manufactures',
      data: [4, 4, 4, 5, 10, 14, 13, 14, 10, 12, 13, 15, 16, 19, 20, 24, 25, 28, 28, 29, 35, 38, 37, 33, 34, 37, 42, 45, 47, 39, 40, 42, 40, 41, 43, 45, 44]
    }, {
      name: 'Other goods',
      data: [2, 2, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 7, 8, 8, 10, 11, 13, 15, 16, 14, 13, 14, 13, 13, 12, 12, 12, 12]
    }, {
      name: 'Total services',
      data: [3, 4, 4, 5, 5, 6, 7, 9, 11, 11, 13, 14, 16, 19, 20, 23, 25, 26, 27, 29, 35, 35, 37, 38, 39, 42, 47, 52, 58, 57, 57, 56, 57, 60, 65, 73, 78]
    }]
  });

  Highcharts.chartData['chart-2.6'] = new ChartData().setOptions({
    chart: {
      type: 'column'
    },
    credits: {
      enabled: false
    },
    exporting: {
      fallbackToExportServer: false,
      sourceWidth: 944,
      sourceHeight: 549,
    },
    title: {
      text: null
    },
    xAxis: {
      categories: [2015, 2020, 2025, 2030]
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of people in the middle class (billions)'
      },
      reversedStacks: false
    },
    plotOptions: {
      column: {
        stacking: 'normal',
      }
    },
    series: [
      {
        name: 'Asia',
        data: [1.38, 2.02, 2.78, 3.49]
      }, {
        name: 'Europe',
        data: [0.72, 0.74, 0.74, 0.73]
      }, {
        name: 'North America',
        data: [0.34, 0.34, 0.35, 0.35]
      }, {
        name: 'Central and South America',
        data: [0.29, 0.3, 0.32, 0.34]
      }, {
        name: 'Middle East and North Africa',
        data: [0.19, 0.23, 0.26, 0.29]
      }, {
        name: 'Sub-Saharan Africa',
        data: [0.11, 0.13, 0.17, 0.21]
      }
    ]
  });

  Highcharts.chartData['chart-2.5'] = new ChartData().setOptions({
    chart: {
      type: 'bar'
    },
    credits: {
      enabled: false
    },
    exporting: {
      fallbackToExportServer: false,
      sourceWidth: 944,
      sourceHeight: 549,
    },
    legend: {
      enabled: false
    },
    title: {
      text: null
    },
    xAxis: {
      categories: ['Japan', 'Republic of Korea', 'EU-28', 'Thailand', 'China', 'US', 'Australia', 'Indonesia', 'Malaysia', 'India', 'Philippines'],
      title: {
        text: 'Country'
      },
    },
    yAxis: {
      title: {
        text: 'Percentage change in the working age population'
      },
      labels: {
        format: '{value}'
      }
    },
    tooltip: {
      formatter: function() {
        var result = '% change: ' + this.point.y + '%<br>';
        result += 'Population 2015: ' + Highcharts.numberFormat(this.point.pop15 * 1000, 0) + '<br>';
        result += 'Population 2030: ' + Highcharts.numberFormat(this.point.pop30 * 1000, 0);
        return result;
      }
    },
    plotOptions: {
      series: {
        negativeColor: true
      }
    },
    series: [
      {
        name: 'Change',
        data: [
          {y: -10, change: -8158,  pop15: 78056,   pop30: 69899},
          {y: -10, change: -3780,  pop15: 36999,   pop30: 33219},
          {y: -6,  change: -19510, pop15: 331864,  pop30: 312354},
          {y: -5,  change: -2663,  pop15: 49051,   pop30: 46388},
          {y: -4,  change: -41179, pop15: 1014777, pop30: 973598},
          {y: 3,   change: 6186,   pop15: 211623,  pop30: 217809},
          {y: 12,  change: 1845,   pop15: 15752,   pop30: 17597},
          {y: 17,  change: 28813,  pop15: 173088,  pop30: 201901},
          {y: 18,  change: 3890,   pop15: 21252,   pop30: 25142},
          {y: 20,  change: 168652, pop15: 860128,  pop30: 1028780},
          {y: 26,  change: 16877,  pop15: 64284,   pop30: 81161},
        ]
      }
    ]
  });

  Highcharts.chartData['chart-8.1'] = new ChartData().setOptions({
    chart: {
      type: 'pie',
      colorCount: 11
    },
    credits: {
      enabled: false
    },
    exporting: {
      fallbackToExportServer: false,
      sourceWidth: 944,
      sourceHeight: 549,
    },
    title: {
      text: null
    },
    tooltip: {
      pointFormat: '{series.name}: {point.percentage:.1f}%'
    },
    plotOptions: {
      pie: {
        allowPointSelect: false,
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y:,.0f}'
        }
      }
    },
    series: [
      {
        name: 'Students',
        data: [
          {
            name: 'China',
            y: 156961
          }, {
            name: 'India',
            y: 60013
          }, {
            name: 'Malaysia',
            y: 23539
          }, {
            name: 'Vietnam',
            y: 22487
          }, {
            name: 'Republic of Korea',
            y: 21923
          }, {
            name: 'Brazil',
            y: 19526
          }, {
            name: 'Thailand',
            y: 19158
          }, {
            name: 'Nepal',
            y: 18710
          }, {
            name: 'Indonesia',
            y: 14776
          }, {
            name: 'Hong Kong',
            y: 13992
          }, {
            name: 'Other',
            y: 183094
          }
        ]
      }
    ]
  });

  Highcharts.chartData['chart-8.2'] = new ChartData('map').setMapData([
    {
      "name": "cityHongKong",
      "path": "M356,-754L363,-754L363,-747L356,-747Z"
    }
  ]);
  Highcharts.chartData['chart-8.2'].setOptions({
    chart: {
      map: 'custom/world-custom',
      events: {
        load: function () {
          this.mapZoom(0.6, 400, -700);
        }
      }
    },
    exporting: {
      fallbackToExportServer: false,
      sourceWidth: 944,
      sourceHeight: 549,
    },
    title: {
      text: null
    },
    legend: {
      enabled: false
    },
    mapNavigation: {
      enabled: true
    },
    colorAxis: {
      min: 0
    },
    plotOptions: {
      mapbubble: {
        dataLabels: {
          enabled: true,
          format: '{point.z}'
        }
      }
    },
    series: [
      {
        name: 'Countries',
        enableMouseTracking: false
      }, {
        id: 'bubbles',
        name: 'Country',
        type: 'mapbubble',
        joinBy: [
          'name', 'id'
        ],
        mapData: Highcharts.chartData['chart-8.2'].getMapData(),
        minSize: 3,
        // maxSize: '8%',
        tooltip: {
          pointFormat: '{point.displayName}: {point.z}'
        },
        data: [
          {
            displayName: 'Bangladesh',
            id: 'Bangladesh',
            z: 150
          },  {
            displayName: 'Bhutan',
            id: 'Bhutan',
            z: 208
          }, {
            displayName: 'ASEAN (excluding Indonesia)',
            id: 'Laos',
            z: 8267
          }, {
            displayName: 'China',
            id: 'China',
            z: 4708
          }, {
            displayName: 'Cook Islands',
            id: 'CookIslands',
            z: 106
          }, {
            displayName: 'Fiji',
            id: 'Fiji',
            z: 805
          }, {
            displayName: 'India',
            id: 'India',
            z: 3346
          }, {
            displayName: 'Indonesia',
            id: 'Indonesia',
            z: 5336
          }, {
            displayName: 'Hong Kong',
            id: 'cityHongKong',
            z: 1110
          }, {
            displayName: 'Japan',
            id: 'Japan',
            z: 2337
          }, {
            displayName: 'Kiribati',
            id: 'Kiribati',
            z: 69
          }, {
            displayName: 'Maldives',
            id: 'Maldives',
            z: 64
          }, {
            displayName: 'Mongolia',
            id: 'Mongolia',
            z: 80
          }, {
            displayName: 'Nauru',
            id: 'Nauru',
            z: 10
          }, {
            displayName: 'Nepal',
            id: 'Nepal',
            z: 956
          }, {
            displayName: 'New Caledonia',
            id: 'New Caledonia',
            z: 82
          }, {
            displayName: 'Pakistan',
            id: 'Pakistan',
            z: 1
          }, {
            displayName: 'Palau',
            id: 'Palau',
            z: 35
          }, {
            displayName: 'Papua New Guinea',
            id: 'Papua New Guinea',
            z: 128
          }, {
            displayName: 'Samoa',
            id: 'Samoa',
            z: 315
          }, {
            displayName: 'Solomon Islands',
            id: 'Solomon Islands',
            z: 354
          }, {
            displayName: 'Republic of Korea',
            id: 'South Korea',
            z: 1007
          }, {
            displayName: 'Sri Lanka',
            id: 'Sri Lanka',
            z: 530
          }, {
            displayName: 'Taiwan',
            id: 'Taiwan',
            z: 450
          }, {
            displayName: 'Timor-Leste',
            id: 'East Timor',
            z: 449
          }, {
            displayName: 'Tonga',
            id: 'Tonga',
            z: 115
          }, {
            displayName: 'Tuvalu',
            id: 'Tuvalu',
            z: 22
          }, {
            displayName: 'Vanuatu',
            id: 'Vanuatu',
            z: 388
          }
        ]
      }
    ]
  });

  Highcharts.chartData['chart-2.3'] = new ChartData().setOptions({
    chart: {
      type: 'spline'
    },
    credits: {
      enabled: false
    },
    exporting: {
      fallbackToExportServer: false,
      sourceWidth: 944,
      sourceHeight: 549,
    },
    title: {
      text: null
    },
    yAxis: {
      title: {
        text: 'Percentage of world merchandise trade'
      },
      tickInterval: 5
    },
    xAxis: {
      tickPosition: 'inside'
    },
    plotOptions: {
      series: {
        pointStart: 1980
      },
      spline: {
        marker: {
          enabled: false
        }
      }
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      valueDecimals: 1
    },
    series: [{
      name: 'Total trade',
      data: [22.5, 24.3, 24.1, 24.0, 24.0, 23.3, 21.8, 22.1, 23.3, 24.0, 23.7, 25.8, 26.7, 28.7, 28.7, 28.7, 28.6, 28.6, 25.6, 26.7, 28.9, 27.7, 28.4, 28.9, 30.0, 30.9, 31.4, 31.6, 32.6, 33.8, 36.0, 36.7, 37.8, 37.9, 38.0, 38.0, 37.5]
    }, {
      name: 'Exports',
      data: [24.8, 26.5, 25.2, 24.6, 25.3, 24.8, 23.8, 24.3, 24.9, 25.5, 25.1, 27.1, 28.2, 30.2 ,30.3, 29.8, 29.3, 29.8 ,27.9, 29.3, 31.6, 29.9, 30.7, 31.3, 32.3, 33.5, 34.2, 34.4, 35.0, 35.9, 38.2, 38.6, 39.6, 39.5, 39.9, 40.4, 39.9]
    }, {
      name: 'Imports',
      data: [20.2, 22.3, 23.0, 23.3, 22.7, 21.8, 19.7, 19.9, 21.8, 22.5, 22.4, 24.5, 25.1, 27.2, 27.2, 27.7, 28.0, 27.4, 23.4, 24.3, 26.3, 25.7, 26.2, 26.6, 27.7, 28.5, 28.7, 28.9, 30.2, 31.7, 33.9, 34.8, 36.0, 36.4, 36.1, 35.7, 35.1]
    }]
  });

  Highcharts.chartData['chart-1.1'] = new ChartData().setOptions({
    chart: {
      type: 'column'
    },
    credits: {
      enabled: false
    },
    exporting: {
      fallbackToExportServer: false,
      sourceWidth: 944,
      sourceHeight: 549,
    },
    title: {
      text: null
    },
    xAxis: {
      type: 'category',
      tickPosition: 'inside'
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      }
    },
    legend: false,
    tooltip: {
      pointFormat: '{series.name}: {point.y}%',
    },
    series: [
      {
        name: 'Proportion of people born overseas',
        data: [
          ['Australia', 26],
          ['New Zealand', 23],
          ['Canada', 22],
          ['USA', 14],
          ['UK', 13]
        ]
      }
    ]
  });

  Highcharts.chartData['chart-2.2'] = new ChartData().setOptions({
    chart: {
      type: 'areaspline'
    },
    credits: {
      enabled: false
    },
    exporting: {
      fallbackToExportServer: false,
      sourceWidth: 944,
      sourceHeight: 549,
    },
    title: {
      text: null
    },
    yAxis: {
      title: {
        text: 'Percentage of world manufacturing output'
      },
      max: 50
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        pointStart: 1991
      },
      spline: {
        marker: {
          enabled: false
        }
      },
      areaspline: {
        stacking: 'normal',
      }
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      valueDecimals: 1
    },
    series: [{
      name: 'Difference',
      enableMouseTracking: false,
      marker: false,
      data: [27.7, 27.1, 24.2, 23, 22.4, 23.1, 23.6, 26.5, 24.2, 21.8, 22.9, 23, 22.9, 22.6, 22.1, 21.8, 20.9, 18.9, 15.3, 12.9, 11.7, 9.9, 10.5, 9.6, 7.3, 6.4]
    }, {
      name: 'Asia’s share of global manufacturing output',
      data: [27.3, 27.9, 30.8, 32.0, 32.6, 31.9, 31.4, 28.5, 30.8, 33.2, 32.1, 32.0, 32.1, 32.4, 32.9, 33.2, 34.1, 36.1, 39.7, 42.1, 43.3, 45.1, 44.5, 45.4, 47.7, 48.6]
    }]
  });

  Highcharts.chartData['chart-6.2'] = new ChartData().setOptions({
    chart: {
      type: 'column'
    },
    credits: {
      enabled: false
    },
    exporting: {
      fallbackToExportServer: false,
      sourceWidth: 944,
      sourceHeight: 549,
    },
    title: {
      text: null
    },
    xAxis: {
      categories: [
        'Pacific', 'South Asia', 'East Asia', 'Southeast Asia'
      ],
      crosshair: true,
      tickPosition: 'inside'
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Percentage of population'
      },
      tickInterval: 10
    },
    tooltip: {
      pointFormat: '{series.name}: {point.y}%',
      valueDecimals: 1
    },
    series: [
      {
        name: 2002,
        data: [46.0, 36.0, 31.9, 20.8]
      }, {
        name: 2013,
        data: [26.6, 16.1, 1.8, 7.2]
      }
    ]
  });

  Highcharts.chartData['chart-43'] = new ChartData().setOptions({
    chart: {
      type: 'column'
    },
    credits: {
      enabled: false
    },
    exporting: {
      fallbackToExportServer: false,
      sourceWidth: 1200,
      sourceHeight: 800,
    },
    title: {
      text: null
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom'
    },
    xAxis: {
      categories: ['2013-14', '2014-15', ' 2015-16', '2016-17']
    },
    yAxis: {
      min: 0,
      reversedStacks: false,
      title: {
        text: 'Border crossings (millions)'
      },
      labels: {
        formatter: function () {
          return  this.value.toString().substring(0, 2);
        }
      }
    },
    plotOptions: {
      column: {
        //stacking: 'normal',
      }
    },
    series: [
      {
        'name' : 'Temporary visas processed',
        'data' : [6961744, 7373922, 8001843, 8677249 ]
      },
      {
        'name' :'Sea freight consignments',
        'data' :[2900000, 3000000, 3100000, 3200000 ]
      },
      {
        'name' :'Air freight consignments',
        'data' :[30600000, 33600000, 34900000, 41900000 ]
      }
    ]
  });

  Highcharts.chartData['chart-6.5'] = new ChartData().setOptions({
    chart: {
      type: 'areaspline'
    },
    credits: {
      enabled: false
    },
    exporting: {
      fallbackToExportServer: false,
      sourceWidth: 944,
      sourceHeight: 549,
    },
    legend: {
      enabled: false
    },
    title: {
      text: null
    },
    yAxis: {
      title: {
        text: 'Displaced persons (millions)'
      },
      labels: {
        formatter: function () {
          return  this.value.toString().substring(0, 2);
        }
      },
      // leave this as 70 million.
      max: 70
    },
    plotOptions: {
      series: {
        pointStart: 2006
      },
      spline: {
        marker: {
          enabled: true
        }
      },
      areaspline: {
        stacking: 'normal',
      }
    },
    tooltip: {
      shared: false,
      crosshairs: true,
      valueDecimals: 1
    },
    series: [ {
      name: 'Forcibly displaced worlwide (million)',
      data: [39, 43, 42, 43, 44, 43, 45, 51, 59, 65, 66]
    }]
  });

  Highcharts.chartData['chart-2.8'] = new ChartData().setOptions({
    chart: {
      type: 'column'
    },
    credits: {
      enabled: false
    },
    exporting: {
      fallbackToExportServer: false,
      sourceWidth: 944,
      sourceHeight: 549
    },
    title: {
      text: null
    },
    xAxis: {
      categories: [2014, 2025, 2040]
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Million tonnes of oil equivalent'
      },
      labels: {
        format: '{value:,f}'
      },
      reversedStacks: false
    },
    plotOptions: {
      column: {
        stacking: 'normal'
      }
    },
    series: [
      {
        'name': 'Coal',
        'data': [3926, 3955, 4140]
      }, {
        'name': 'Oil',
        'data': [4266, 4577, 4775]
      }, {
        'name': 'Gas',
        'data': [2893, 3390, 4314]
      }, {
        'name': 'Nuclear',
        'data': [662, 888, 1181]
      }, {
        'name': 'Renewables',
        'data': [1937, 2531, 3456]
      }
    ]
  });

  Highcharts.chartData['chart-2.1'] = new ChartData().setOptions({
    chart: {
      type: 'spline'
    },
    credits: {
      enabled: false
    },
    exporting: {
      fallbackToExportServer: false,
      sourceWidth: 944,
      sourceHeight: 549,
    },
    yAxis: {
      title: {
        text: '$US TRILLIONS'
      },
    },
    xAxis: {
      tickPosition: 'inside'
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom'
    },
    title: {
      text: null
    },
    plotOptions: {
      series: {
        pointStart: 1990
      },
      spline: {
        marker: {
          enabled: true
        }
      },
      areaspline: {
        stacking: 'normal',
      }
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      valueDecimals: 1
    },
    series: [{
      name: 'Exports of Goods and Services',
      data: [4.3, 4.4, 4.8, 4.8, 5.4, 6.4, 6.7, 7.0, 6.9, 7.2, 8.0, 7.7, 8.1, 9.5, 11.5, 13.2, 15.1, 17.6, 20.2, 16.1, 19.2, 22.7, 23.0, 23.8, 24.2, 21.4, 20.8]
    },{
      name: 'Foreign Direct Investment',
      data: [2.2, 2.5, 2.5, 2.8, 3.1, 3.8, 4.3, 5.0, 6.1, 7.1, 7.5, 7.4, 7.5, 9.5, 11.1, 11.7, 14.5, 18.3, 15.7, 18.7, 20.6, 21.2, 22.8, 24.7, 24.9, 25.1, 26.4]
    }]
  });

})(jQuery, Highcharts);
