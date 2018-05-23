
import "./sidebar.css";



export default class {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(this.domName);
    }

    render(data) {
        this.dom.innerHTML = "";
        this.dom.className = "panel panel-primary";
        let span_f = document.createElement("span")
        span_f.id = "id-list-group-item-active"
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

        this.createFunbutton(this.dom)
        
    }

    createFunbutton(dom){
        let ul = document.createElement('ul')
        ul.setAttribute('class', 'sidebar-nav')
        let funArr = ['Start', 'Dashboard', 'Shortcuts', 'Overview' , 'Events', 'About']
        let icon = 'glyphicon glyphicon-menu-right'
        funArr.forEach((d,i) =>{
            let li = document.createElement('li')
            let a = document.createElement('a')
            if(i > 0){
                let ii = document.createElement('i')
                ii.setAttribute('class', icon)
                ii.setAttribute('style', 'color:white')
                li.appendChild(ii)
            }
            a.setAttribute('href' , '#')
            a.appendChild(document.createTextNode(d))
            li.appendChild(a)
            if(i == 0){
                li.setAttribute('class', 'sidebar-brand')
            }
            ul.appendChild(li)
        })
        dom.appendChild(ul)
    }
}
