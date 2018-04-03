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
            console.log(k);
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(k + ":" + data[k]));
            ul.appendChild(li);
        }

        this.dom.appendChild(ul);
    }
}
