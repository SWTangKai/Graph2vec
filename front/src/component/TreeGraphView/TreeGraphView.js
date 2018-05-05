import "./TreeGraphView.css";
import { log, Loader } from "../../utils/utils";

class TreeGraph {
    constructor(domName){
        this.domName = domName;
        this.dom = document.querySelector(domName)
    }
    render(data){
        log(data);
    }
}

export default TreeGraph;