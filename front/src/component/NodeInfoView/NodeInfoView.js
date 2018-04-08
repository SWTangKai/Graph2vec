import "./NodeInfoView.css";

class NodeInfoView {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(domName);
    }

    render(data) {
        this.dom.innerHTML = "Node Information";
    }
}

export default NodeInfoView;
