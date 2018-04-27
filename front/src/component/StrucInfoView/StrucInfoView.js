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
        let charts = [];
        console.log("DATA:", data);
        data.forEach(d => {
            charts.push(this.OneChart(d, this.CreateDom(this.dom)));
        });
        echarts.connect(charts);
    }

    CreateDom(parent) {
        let item = document.createElement("div");
        item.setAttribute("class", "struc-info-item");
        parent.appendChild(item);
        return item;
    }

    OneChart(data, dom) {
        let myChart = echarts.init(dom);
        let xAxisData = data.xAxix;

        let title = data.name;
        let kind = data["kind"];
        let datas = data["data"];
        let serise = [];
        datas.forEach(d => {
            return serise.push({
                name: d.kind,
                type: "bar",
                data: d.data,
                animationDelay: function(idx) {
                    return idx * 10;
                }
            });
        });
        let option = {
            title: { text: title },
            legend: { data: kind, align: "left" },
            toolbox: {
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
            series: serise,
            animationEasing: "elasticOut",
            animationDelayUpdate: function(idx) {
                return idx * 5;
            }
        };
        console.log(option);
        // 绘制图表
        myChart.setOption(option);
        return myChart;
    }
}

export default StrucInfoView;
