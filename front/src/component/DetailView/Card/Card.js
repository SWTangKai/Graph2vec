//import DetailGraph from "Graphs/DetailGraph";
import Ssankey from "Graphs/Ssankey";
import "./Card.css";

class Card {
    constructor(ID) {
        this.main = this.createEle(
            "div",
            "detail-item my-2 mx-auto p-relative bg-white shadow-1 blue-hover",
            ""
        );
        this.main.appendChild(
            this.createEle("div", "detail-graph", "detail-" + ID)
        );
        this.main.appendChild(
            this.createEle("div", "detail-info", "info-" + ID)
        );
        this.ID = ID;
        this.graphID = "#detail-" + ID;
        this.infoID = "#info-" + ID;
    }

    dom() {
        return this.main;
    }

    render(data) {
        //let detailGraph = new DetailGraph(this.graphID);
        //detailGraph.render(data, this.ID);
        let ssankey = new Ssankey(this.graphID);
        ssankey.render(data, this.ID);
        d3.select(this.infoID).data([{
            index: data.id
        }]).enter();
        // console.log(this);
    }

    createEle(type, className, id) {
        let iDiv = document.createElement(type);
        iDiv.className = className;
        if (id != "") {
            iDiv.id = id;
        }
        return iDiv;
    }
}

export default Card;