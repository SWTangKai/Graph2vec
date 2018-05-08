/*jslint es6 */
import { ColorManage, log } from "Utils/utils";
/**
 *
 *
 * @class DetailCircleGraph
 */

 class DetailCircleGraph{
    constructor(domName){
        this.domName = domName;
        this.width = document.querySelector(domName).clientWidth;
        this.height = document.querySelector(domName).clientHeight;
    }
    
    render(data, ID){
        
        let domName = this.domName;
        let width = this.width;
        let height = this.height;
        
        let secondfloor = {}
        let firstfloor = {}
        let linkdata = {'links':[],"nodes":[]}
        let nodedict = {}
        let sourcenode = []

        data.nodes.forEach(function(d){
            if(!nodedict[d.id])
                nodedict[d.id] = d.c
        })
        //arc first floor data
        data.links.forEach(function(d){
            let source = d.source,
                target = d.target,
                c = nodedict[target];
            if(firstfloor[c]){
                firstfloor[c]['value']++
            }else{
                firstfloor[c] = {}
                firstfloor[c]['value'] = 1
            }
            if(sourcenode.indexOf(source) == -1){
                sourcenode.push(source)
                linkdata.nodes.push({"c":nodedict[d.source],"id":d.source})
            }
        })
        
        for(let head in firstfloor){
            let value = firstfloor[head]['value']
            firstfloor[head] = []
            firstfloor[head].push({'id':head, 'value':value, 'c':head})
        }
        //arc second floor data
        data.links.forEach(function(d){
            let source = d.source,
                target = d.target,
                c = nodedict[target];
            if(secondfloor[c]){
                secondfloor[c].push({'id':target, 'value':1, 'c':c})
            }else{
                secondfloor[c] = []
                secondfloor[c].push({'id':target, 'value':1, 'c':c})
            }
        })
        
        data.links.forEach(function(d){
            if(sourcenode.indexOf(d.source) != -1 && sourcenode.indexOf(d.target) != -1){
                linkdata.links.push(d)
            }
        })
        
        log("data:",data)
        log("linkdata:",linkdata)
        log("firstfloor:",firstfloor)
        log("secondfloor:",secondfloor)
        log('this is linkdata',linkdata)
        let nodes = linkdata.nodes;
        let links = linkdata.links;

        let simulation = d3
            .forceSimulation()
            .force("link", d3.forceLink().id(d => d.id))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));

        simulation.nodes(nodes).on("tick", ticked);
        simulation.force("link").links(links);

        let inarc = d3.arc()
            .innerRadius(20)
            .outerRadius(10)

        let outarc = d3.arc()
            .innerRadius(30)
            .outerRadius(20)

        let pie = d3.pie()
            .value(function(d) {return d.value; })
            .sort(null);

        let svg = d3
            .select(domName)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        let link = svg
            .selectAll("line")
            .data(links)
            .enter()
            .append("line");

        let node = svg
            .selectAll(".node")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "node");

        let color = new ColorManage();

        node
            .append("circle")
            .attr('id', d => {
                return  d.id
            })
            .attr("r", d => {
                return d.id === ID ? 9 : 5;
            })
            .style("fill", d => {
                return color.Get(d.c);
            });
            
        //append inner arc
        let innerArc = node.selectAll(".arc")
            .data(function(d){
                let meta = pie(firstfloor[d.c])
                return meta
            })
            .enter().append("g")
            .attr("class", "arc");

            innerArc.append("path")
            .attr("d", inarc)
            .attr("fill", d => {
                return color.Get(d.c)
            });
        
        let outerArc = innerArc.selectAll('.ddd')
            .data(function(d){
                let meta = pie(secondfloor[d.data.c])
                return meta
            })
            .enter().append("g")
            .attr("class", "arc");

            outerArc.append('path')
                .attr('d', outarc)
                .attr("fill", d => {
                    return color.Get(d.c)
                });




        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
            node.attr("transform", d => `translate(${d.x},${d.y})`)
        }
    }
 }

 export default DetailCircleGraph;