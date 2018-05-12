import echarts from "echarts";
import DetailGraph from "Graphs/DetailGraph";
import DetailCircleGraph from "Graphs/DetailCircleGraph";
import SubView from "component/SubView/SubView";
import "./SubCard.css";

class SubCard {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(domName);
    }

    render(data,ID) {
        let detailCircleGraph = new DetailCircleGraph(this.domName);
        detailCircleGraph.render(data, ID);
        detailCircleGraph.bindEvent(this.domName, "click", d => {
            let divlength = $('#sub-view').children().length
            if(divlength >= 2)
                document.getElementById('sub-view').removeChild(document.getElementById('sub-view').getElementsByTagName("div")[0])
            let subview = new SubView("#sub-view")
            let ID = parseInt(Math.random() * 100)
            subview.render(data, ID)
        })
    }
}

export default SubCard;