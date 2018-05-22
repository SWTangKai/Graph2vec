import "./NodeInfoView.css";

class NodeInfoView {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(this.domName);
    }

    render(data) {
        /*
        this.dom.innerHTML = "";
        this.dom.className = "panel panel-primary";
        let span_f = document.createElement("span")
        span_f.className = "list-group-item active";
        this.dom.appendChild(span_f)
        for(let k in data){
            if(k == "ID"){
                span_f.innerText = data[k]
                continue;
            }

            let li = document.createElement("li")
            let i = document.createElement("i")
            let spans = document.createElement("span")
            li.setAttribute("herf", "#")
            li.setAttribute("class", "list-group-item")
            i.setAttribute("class", "fa fa-bar-chart-o")
            spans.setAttribute("class", "badge")

            i.appendChild(document.createTextNode(k))
            spans.appendChild(document.createTextNode(data[k]))

            li.appendChild(i)
            li.appendChild(spans)

            this.dom.appendChild(li)
        }
        */
    }
}

export default NodeInfoView;
