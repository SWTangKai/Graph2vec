
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

        //this.createFunbutton(this.dom)
        this.createDragBar('Line width','1','5')
        this.createDragBar('Node size','3','10')
        this.createDragBar('Simulator force','1','10')
        this.createDragBar('Circle distance','0','1')
        this.createDragBar('Heat size','0','1')
        
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

    createDragBar(txt,attr1,attr2){
        d3.select('#sidebar').append('span').attr('id','id-list-group-item-active').attr('class','list-group-item active').text(txt)
        let width = +d3.select('#bigsidebar').style('width').split('px')[0]
        let height = +d3.select('#bigsidebar').style('height').split('px')[0] * 0.05
        let margin = width * 0.2
        let radius = 10
        let x1 = margin
        let x2 = width - margin
        let y = height/2
        let svg = d3.select('#sidebar').append('svg')
                .attr('width', width)
                .attr('height', height)
                .style('background-color','#2a2a2a')
                .datum({
                    x: x1 + (x2 - x1) * Math.random(),
                    y: height / 2
                  });
        svg.append('text')
            .attr("x", '15px')
            .attr("y", '30px')
                .attr('fill','white')
                  .attr("font-family", "sans-serif")
                 .attr("font-size", "12px")
                .text(attr1)
        
        svg.append('text')
                .attr("x", '250px')
                .attr("y", '30px')
                    .attr('fill','white')
                      .attr("font-family", "sans-serif")
                     .attr("font-size", "12px")
                    .text(attr2)
                  
        

        let line = svg.append("line")
            .attr("x1", x1)
            .attr("x2", x2)
            .attr("y1", y)
            .attr("y2", y)
            .style("stroke", "gray")
            .style("stroke-linecap", "round")
            .style("stroke-width", 5);
        
        let circle = svg.append("circle")
            .attr("r", radius)
            .attr("cy", function(d) { return d.y; })
            .attr("cx", function(d) { return d.x; })
            .attr('fill','gray')
            .call(d3.drag()
                .on('drag', dragged));

        function dragged(d) {
            let x = d3.event.x
                x = x < x1 ? x1 : x > x2 ? x2 : x;
                d.x = x;
            d3.select(this)
              .attr("cx", d.x);
        }
    }

}
