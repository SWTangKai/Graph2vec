import echarts from "echarts";
import DetailGraph from "Graphs/DetailGraph";
import DetailCircleGraph from "Graphs/DetailCircleGraph";
import "./SubView.css";

class SubView {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(domName);
    }

    render(data) {
        this.dom.innerHTML = "Sub Graph";
        let detailCircleGraph = new DetailGraph(this.domName);
        detailCircleGraph.render(data, -1);
    }
}

export default SubView;