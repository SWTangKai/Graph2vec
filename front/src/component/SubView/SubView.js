import echarts from "echarts";
import SubCard from "./SubCard/SubCard";
import "./SubView.css";

class SubView {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(domName);
    }

    render(data,ID) {
        d3.select(this.domName).append('div').attr('id',"Sub-card-"+ID).attr('class','xxx')
        let subcard = new SubCard("#Sub-card-"+ID);
        subcard.render(data, ID);
    }
}

export default SubView;