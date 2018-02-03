d3
    .json('/graph/api/v1.0/test/', function (data) {
        console.log(data);
        scatter(document.getElementById('scatter'), data);
    })

var scatter = function (dom, pointData) {
    const scatterOption = {
        xAxis: {
            // show: false
        },
        yAxis: {
            min: function (value) {
                return value.min - 20;
            },
            max: function (value) {
                return value.max + 20;
            }
        },
        dataZoom: [
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                start: 1,
                end: 100
            }, {
                type: 'slider',
                show: true,
                yAxisIndex: [0],
                left: '93%',
                start: 1,
                end: 100
            }, {
                type: 'inside',
                xAxisIndex: [0],
                start: 1,
                end: 100
            }, {
                type: 'inside',
                yAxisIndex: [0],
                start: 1,
                end: 100
            }
        ],
        series: [
            {
                symbolSize: 10,
                data: pointData,
                type: 'scatter'
            }
        ]
    };
    var scatterChart = echarts.init(dom, 'westeros');
    scatterChart.setOption(scatterOption);
}