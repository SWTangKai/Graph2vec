/*jslint es6 */
import { ColorManage, log } from "Utils/utils";
import "./Ssankeycss.css";
/**
 *
 *
 * @class ssankey
 */
class Ssankey {
    constructor(domName) {
        this.domName = domName;
        this.width = document.querySelector(domName).clientWidth;
        this.height = document.querySelector(domName).clientHeight;
    }

    render(data, ID) {
        let graph = { nodes: [], links: [] };
        let fulllink = [],
            linktemp = [],
            nodetemp = [];

        // get the node' cluster thorough id
        let idtoc = {};
        data.nodes.forEach(function(d) {
            if (!idtoc[d.id]) {
                idtoc[d.id] = d.c;
            }
        });
        //add the root nodes
        nodetemp.push(ID);
        //get the first floor links
        data.links.forEach(function(d) {
            if (+d.source == +ID && +d.target != +ID) {
                fulllink.push({
                    source: "0-" + idtoc[d.source],
                    target: "1-" + idtoc[d.target]
                });
                nodetemp.push(d.target);
            } else {
                linktemp.push(d);
            }
        });

        //get the second floor links
        linktemp.forEach(function(d) {
            //judge the source is it in previous node
            if (nodetemp.indexOf(d.source) > -1) {
                if (nodetemp.indexOf(d.target) == -1) {
                    //target is not in previous node
                    fulllink.push({
                        source: "1-" + idtoc[d.source],
                        target: "2-" + idtoc[d.target]
                    });
                }
            }
        });
        // use temp to store unformat link data
        let temp = {};
        fulllink.forEach(function(d) {
            let str = d.source + "_" + d.target;
            if (temp[str]) {
                temp[str]++;
            } else {
                temp[str] = 0;
                temp[str]++;
            }
        });
        for (let head in temp) {
            let source = head.split("_")[0],
                target = head.split("_")[1],
                value = temp[head];
            graph.links.push({ 'source': source, 'target': target, 'value': value });
            graph.nodes.push({ 'name': source });
            graph.nodes.push({ 'name': target });
        }
        
        //recalculate sankey link value
        let recalLinkData = {}
        graph.links.forEach(function(d){
            let s = d.source
            let v = d.value
            if(s.split('-')[0] == 1){
                if(recalLinkData[s]){
                    recalLinkData[s] += v 
                }else{
                    recalLinkData[s] = v
                }
            }
        })

        graph.links.forEach(function(d){
            let s = d.target
            if(recalLinkData[s])
                d.value = recalLinkData[s]
        })


        // return only the distinct / unique nodes
        
        
        graph.nodes = d3
            .nest()
            .key(function(d) {
                return d.name;
            })
            .entries(graph.nodes);
        let ttemp = [];
        graph.nodes.forEach(function(d) {
            ttemp.push(d.key);
        });
        graph.nodes = ttemp;
        // loop through each link replacing the text with its index from node
        graph.links.forEach(function(d, i) {
            d.source = graph.nodes.indexOf(d.source);
            d.target = graph.nodes.indexOf(d.target);
        });

        //now loop through each nodes to make nodes an array of objects
        // rather than an array of strings
        graph.nodes.forEach(function(d, i) {
            graph.nodes[i] = { name: d };
        });

        let domName = this.domName;
        let margin = {
            top: this.height * 0.1,
            bottom: this.height * 0.1,
            left: this.width * 0.1,
            right: this.width * 0.1
        };
        let width = this.width - margin.left - margin.right,
            height = this.height - margin.top - margin.bottom;

        let svg = d3
            .select(domName)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.bottom + margin.top)
            .append("g")
            .attr(
                "transform",
                "translate(" + margin.left + "," + margin.top + ")"
            );

        // format variables
        let formatNumber = d3.format(",.0f"), // zero decimal places
            format = function(d) {
                return formatNumber(d) + "Widgets";
            },
            color = new ColorManage();

        let sankey = d3
            .sankey()
            .nodeWidth(width * 0.05)
            .nodePadding(height * 0.05)
            .size([width, height]);

        let path = sankey.link();

        sankey
            .nodes(graph.nodes)
            .links(graph.links)
            .layout(10);

        // add in the links
        let link = svg
            .append("g")
            .selectAll(".link")
            .data(graph.links)
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", path)
            .style("stroke-width", function(d) {
                return Math.max(1, d.dy);
            })
            .sort(function(a, b) {
                return b.dy - a.dy;
            });

        // add the link titles
        link.append("title").text(function(d) {
            return (
                d.source.name + " → " + d.target.name + "\n" + format(d.value)
            );
        });

        // add in the nodes
        let node = svg
            .append("g")
            .selectAll(".node")
            .data(graph.nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            .call(
                d3
                    .drag()
                    .subject(function(d) {
                        return d;
                    })
                    .on("start", function() {
                        this.parentNode.appendChild(this);
                    })
                    .on("drag", dragmove)
            );

        // add the rectangles for the nodes
        node
            .append("rect")
            .attr("height", function(d) {
                return d.dy;
            })
            .attr("width", sankey.nodeWidth())
            .style("fill", function(d) {
                return (d.color = color.Get(d.name.split("-")[1]));
            })
            .append("title")
            .text(function(d) {
                return d.name + "\n" + format(d.value);
            });

        // add in the title for the nodes
        node
            .append("text")
            .attr("x", -6)
            .attr("y", function(d) {
                return d.dy / 2;
            })
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .attr("transform", null)
            .text(function(d) {
                return d.name;
            })
            .filter(function(d) {
                return d.x < width / 2;
            })
            .attr("x", 6 + sankey.nodeWidth())
            .attr("text-anchor", "start");

        // the function for moving the nodes
        function dragmove(d) {
            d3
                .select(this)
                .attr(
                    "transform",
                    "translate(" +
                        d.x +
                        "," +
                        (d.y = Math.max(
                            0,
                            Math.min(height - d.dy, d3.event.y)
                        )) +
                        ")"
                );
            sankey.relayout();
            link.attr("d", path);
        }
    }
}
export default Ssankey;
