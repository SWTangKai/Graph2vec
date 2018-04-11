import "./NodeInfoView.css";

class NodeInfoView {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(domName);
    }

    render(data) {
        let ul = document.createElement("ul");

        for (let k in data) {
            if (k === "ID") {
                this.createHeader("Node: " + data[k]);
                continue;
            }
            console.log(k);
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(k + "\t:\t" + data[k]));
            ul.appendChild(li);
        }

        this.dom.appendChild(ul);
    }

    createHeader(name) {
        let dom = document.createElement("div");
        dom.setAttribute("class", "ID-header");
        dom.appendChild(document.createTextNode(name));
        this.dom.appendChild(dom);
    }
}

export default NodeInfoView;
