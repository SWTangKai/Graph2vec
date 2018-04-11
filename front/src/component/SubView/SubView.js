let echarts = require("echarts");
import DetailGraph from "Graphs/DetailGraph";
import "./SubView.css";

class SubView {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(domName);
    }

    render(data) {
        this.dom.innerHTML = "Sub Graph";

        let detailGraph = new DetailGraph(this.domName);
        detailGraph.render(data, -1);

        // var myChart = echarts.init(this.dom);
        // // 绘制图表

        // let nodes = [
        //     {
        //         name: "节点1",
        //         x: 300,
        //         y: 300
        //     },
        //     {
        //         name: "节点2",
        //         x: 800,
        //         y: 300
        //     },
        //     {
        //         name: "节点3",
        //         x: 550,
        //         y: 100
        //     },
        //     {
        //         name: "节点4",
        //         x: 550,
        //         y: 500
        //     }
        // ];

        // let links = [
        //     {
        //         source: 0,
        //         target: 1,
        //         symbolSize: [5, 20],
        //         label: {
        //             normal: {
        //                 show: true
        //             }
        //         },
        //         lineStyle: {
        //             normal: {
        //                 width: 5,
        //                 curveness: 0.2
        //             }
        //         }
        //     },
        //     {
        //         source: "节点2",
        //         target: "节点1",
        //         label: {
        //             normal: {
        //                 show: true
        //             }
        //         },
        //         lineStyle: {
        //             normal: {
        //                 curveness: 0.2
        //             }
        //         }
        //     },
        //     {
        //         source: "节点1",
        //         target: "节点3"
        //     },
        //     {
        //         source: "节点2",
        //         target: "节点3"
        //     },
        //     {
        //         source: "节点2",
        //         target: "节点4"
        //     },
        //     {
        //         source: "节点1",
        //         target: "节点4"
        //     }
        // ];

        // let option = {
        //     title: {
        //         text: "Graph 简单示例"
        //     },
        //     tooltip: {},
        //     animationDurationUpdate: 1500,
        //     animationEasingUpdate: "quinticInOut",
        //     series: [
        //         {
        //             type: "graph",
        //             layout: "none",
        //             symbolSize: 50,
        //             roam: true,
        //             label: {
        //                 normal: {
        //                     show: true
        //                 }
        //             },
        //             edgeSymbol: ["circle", "arrow"],
        //             edgeSymbolSize: [4, 10],
        //             edgeLabel: {
        //                 normal: {
        //                     textStyle: {
        //                         fontSize: 20
        //                     }
        //                 }
        //             },
        //             data: nodes,
        //             links: links,
        //             lineStyle: {
        //                 normal: {
        //                     opacity: 0.9,
        //                     width: 2,
        //                     curveness: 0
        //                 }
        //             }
        //         }
        //     ]
        // };

        // myChart.setOption(option);
    }
}

export default SubView;
