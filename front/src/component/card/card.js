import DetailGraph from "../Graphs/DetailGraph";

class Card {
    /**
     * @param  {string} domID
     */
    constructor(domID) {
        console.log(domID);
        this.id = domID;
        this.main = this.createEle("div", "post-content", "");
        let graph = this.createEle("div", "detail-Graph", domID);
        let info = this.createEle("div", "detail-info", "");
        this.main.append(graph);
        this.main.append(info);
    }

    append() {
        return this.main;
    }

    render(data, info) {
        let detailGraph = new DetailGraph("#" + this.id);
        detailGraph.render(data);
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
