import {
    log,
    Loader
} from "../../utils/utils";
import ForceDirect from "Graphs/ForceGraph";

import "./main_graph.css";

export default class {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(this.domName);
        this.graph = new ForceDirect(domName);
    }

    render(data) {
        return this.graph.render(data);
    }

    bindEvent(domName, type, callback) {
        log(this.domName + " .node");
        d3.selectAll(domName).on(type, callback);
    }
}