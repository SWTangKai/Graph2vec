import ForceDirect from "Graphs/ForceGraph";

import "./main_graph.css";

export default class {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(this.domName);
        this.graph = new ForceDirect(domName);
    }

    render(data) {
        this.graph.render(data);
    }
}
