let echarts = require("echarts");

import "./StrucInfoView.css";

class StrucInfoView {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(domName);
    }

    render(data) {
        // this.dom.innerHTML = "Structure Information";
        // 基于准备好的dom，初始化echarts实例

        [1, 2, 3, 4].forEach(d => {
            this.OneChart(this.CreateDom(this.dom));
        });
    }

    CreateDom(parent) {
        let item = document.createElement("div");
        item.setAttribute("class", "struc-info-item");
        parent.appendChild(item);
        return item;
    }

    OneChart(dom) {
        let myChart = echarts.init(dom);
        let xAxisData = [];
        let data1 = [];
        let data2 = [];
        for (let i = 0; i < 100; i++) {
            xAxisData.push("类目" + i);
            data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
            data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
        }

        let option = {
            title: { text: "柱状图动画延迟" },
            legend: { data: ["bar", "bar2"], align: "left" },
            toolbox: {
                // y: 'bottom',
                feature: {
                    magicType: { type: ["stack", "tiled"] },
                    dataView: {},
                    saveAsImage: { pixelRatio: 2 }
                }
            },
            tooltip: {},
            xAxis: {
                data: xAxisData,
                silent: false,
                splitLine: { show: false }
            },
            yAxis: {},
            series: [
                {
                    name: "bar",
                    type: "bar",
                    data: data1,
                    animationDelay: function(idx) {
                        return idx * 10;
                    }
                },
                {
                    name: "bar2",
                    type: "bar",
                    data: data2,
                    animationDelay: function(idx) {
                        return idx * 10 + 100;
                    }
                }
            ],
            animationEasing: "elasticOut",
            animationDelayUpdate: function(idx) {
                return idx * 5;
            }
        };

        // 绘制图表
        myChart.setOption(option);
    }
}

export default StrucInfoView;
