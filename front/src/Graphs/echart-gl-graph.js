import echarts from "echarts";

class EchartGraphGL {
    constructor(domName) {
        this.domName = domName;
        this.width = document.querySelector(domName).clientWidth;
        this.height = document.querySelector(domName).clientHeight;
        this.chart = echarts.init(document.querySelector(domName));
        let color = [
            "rgb(203,239,15)",
            "rgb(73,15,239)",
            "rgb(239,231,15)",
            "rgb(15,217,239)",
            "rgb(30,15,239)",
            "rgb(15,174,239)",
            "rgb(116,239,15)",
            "rgb(239,15,58)",
            "rgb(15,239,174)",
            "rgb(239,102,15)",
            "rgb(239,15,15)",
            "rgb(15,44,239)",
            "rgb(239,145,15)",
            "rgb(30,239,15)",
            "rgb(239,188,15)",
            "rgb(159,239,15)",
            "rgb(159,15,239)",
            "rgb(15,239,44)",
            "rgb(15,239,87)",
            "rgb(15,239,217)",
            "rgb(203,15,239)",
            "rgb(239,15,188)",
            "rgb(239,15,102)",
            "rgb(239,58,15)",
            "rgb(239,15,145)",
            "rgb(116,15,239)",
            "rgb(15,131,239)",
            "rgb(73,239,15)",
            "rgb(15,239,131)",
            "rgb(15,87,239)",
            "rgb(239,15,231)"
        ];
        this.option = {
            color: color,
            series: []
        };
        ser = {
            type: "graphGL",
            nodes: nodes,
            edges: edges,
            categories: categories.sort(function(a, b) {
                return a.name - b.name;
            }),
            lineStyle: { color: "rgba(255,255,255,0.2)" },
            itemStyle: { opacity: 1 },
            forceAtlas2: {
                steps: 1,
                stopThreshold: 1,
                jitterTolerence: 10,
                edgeWeight: [0.2, 1],
                gravity: 0,
                edgeWeightInfluence: 1,
                scaling: 0.2
            }
        };
    }

    render(data) {}
}
export default EchartGraphGL;
