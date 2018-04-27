import "./NodeInfoView.css";

class NodeInfoView {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(this.domName);
    }

    render(data) {
        this.dom.innerHTML = "";
        let div = document.createElement("div");
        div.className = "panel panel-primary" ;

        let ul = document.createElement("ul");
        ul.className = "list-group";
        for (let k in data) {
            if (k === "ID") {
                div.appendChild(this.createHeader("Node: " + data[k]));
                continue;
            }
            let li = document.createElement("li");
            li.className = "list-group-item";
            let span = document.createElement("span");
            span.className = "badge";
            span.innerHTML = data[k];
            li.innerHTML = k;
            li.appendChild(span);
            ul.appendChild(li);
        }
        div.appendChild(ul);
        this.dom.appendChild(div);
    }

    createHeader(name) {
        let dom = document.createElement("div");
        dom.setAttribute("class", "panel-heading");
        dom.appendChild(document.createTextNode(name));
        //this.dom.appendChild(dom);
        return dom;
    }
}

export default NodeInfoView;
