import echarts from "echarts";
import DetailGraph from "Graphs/DetailGraph";
import DetailCircleGraph from "Graphs/DetailCircleGraph";
import SubView from "component/SubView/SubView";
import "./SubCard.css";

class SubCard {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(domName);
        this.detailCircleGraph = new DetailCircleGraph(this.domName);
    }

    rename(domName){
        this.domName = domName;
        this.dom = document.querySelector(domName);
        this.detailCircleGraph.rename(domName);
    }

    clean() {
        this.dom.innerHTML = "";
    }
    render(data) {
        this.detailCircleGraph.render(data);
        // detailCircleGraph.bindEvent(this.domName, "click", d => {
        //     let divlength = $('#sub-view').children().length
        //     if (divlength >= 2)
        //         document.getElementById('sub-view').removeChild(document.getElementById('sub-view').getElementsByTagName("div")[0])
        //     let subview = new SubView("#sub-view")
        //     let ID = parseInt(Math.random() * 100)
        //     subview.render(data, ID)
        // })
    }
}

export default SubCard;