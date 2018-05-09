/*jslint es6 */
import {
    ColorManage
} from "Utils/utils";
import ForceHighlight from "./ForceHighlight";
/**
 *
 *
 * @class ForceGraph
 */
class ForceGraph {
    constructor(domName) {
        this.domName = domName;
        this.width = document.querySelector(domName).clientWidth;
        this.height = document.querySelector(domName).clientHeight;
    }

    render(data) {

        let domName = this.domName;
        let width = this.width;
        let height = this.height;


        document.querySelector(domName).innerHTML = "";

        let nodes = data.nodes;
        let links = data.links;



        let simulation = d3
            .forceSimulation()
            .force("link", d3.forceLink().id(d => d.group_id))
            .force("charge", d3.forceManyBody().strength([-50]))
            .force("center", d3.forceCenter(width / 2, height / 2));

        simulation.nodes(nodes).on("tick", ticked);
        simulation.force("link").links(links).distance([10]).id(d => d.group_id);

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
            .attr("class", "node")
            .attr("group_id", d => d['group_id'])
            .attr("id", d => "_" + d['group_id']);

        // .on("mouseover", mouseOverFunction)
        // .on("mouseout", mouseOutFunction)

        let color = new ColorManage();
        node
            .append("circle")
            .attr("r", nodeRadius)
            .style("fill", d => {
                return color.Get(d.c);
            })
            .call(
                d3
                .drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
            );




        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node.attr("transform", d => `translate(${d.x},${d.y})`)
            node.attr("transx", d => d.x);
            node.attr("transy", d => d.y);

        }



        function nodeRadius(d) {
            return Math.pow(40.0 * (4 + 1), 1 / 3);
        }

        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
            d3.select(this).classed("fixed", (d.fixed = true));
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            // d.fx = null;
            // d.fy = null;
        }

        return new ForceHighlight(node, link, links);
    }
}
export default ForceGraph;