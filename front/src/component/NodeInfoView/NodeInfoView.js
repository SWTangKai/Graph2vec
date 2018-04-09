import "./NodeInfoView.css";

class NodeInfoView {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(domName);
    }

    render(data) {
        this.dom.innerHTML = "Node Information";

        let ul = document.createElement("ul");

        for (let k in data) {
            console.log(k);
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(k + ":" + data[k]));
            ul.appendChild(li);
        }

        this.dom.appendChild(ul);
    }
}

export default NodeInfoView;
