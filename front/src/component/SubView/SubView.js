import echarts from "echarts";
import DetailGraph from "Graphs/DetailGraph";
import DetailCircleGraph from "Graphs/DetailCircleGraph";
import "./SubView.css";

class SubView {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(domName);
    }

    render(data,ID) {
        this.dom.innerHTML = "Sub Graph";
        let detailCircleGraph = new DetailCircleGraph(this.domName);
        detailCircleGraph.render(data, ID);
    }
}

export default SubView;