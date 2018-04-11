import "./sidebar.css";

export default class {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(this.domName);
    }

    render(data) {
        this.dom.innerHTML = "";

        let ul = document.createElement("ul");

        for (let k in data) {
            if (k === "ID") {
                this.createHeader(data[k]);
                continue;
            }
            console.log(k);
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(k + ":" + data[k]));
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
