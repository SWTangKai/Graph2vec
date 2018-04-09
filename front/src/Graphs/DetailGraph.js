/*jslint es6 */
import { ColorManage } from "Utils/utils";
/**
 *
 *
 * @class DetailGraph
 */
class DetailGraph {
    constructor(domName) {
        this.domName = domName;
        this.width = document.querySelector(domName).clientWidth;
        this.height = document.querySelector(domName).clientWidth;
    }

    render(data, ID) {
        let domName = this.domName;
        let width = this.width;
        let height = this.height;

        document.querySelector(domName).innerHTML = "";

        let nodes = data.nodes;
        let links = data.links;

        let simulation = d3
            .forceSimulation()
            .force("link", d3.forceLink().id(d => d.id))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));

        simulation.nodes(data.nodes).on("tick", ticked);
        simulation.force("link").links(data.links);

        let svg = d3
            .select(domName)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        let link = svg
            .selectAll("line")
            .data(data.links)
            .enter()
            .append("line");

        let node = svg
            .selectAll(".node")
            .data(data.nodes)
            .enter()
            .append("g")
            .attr("class", "node");
        let color = new ColorManage();

        node
            .append("circle")
            .attr("r", d => {
                return d.id === ID ? 9 : 5;
            })
            .style("fill", d => {
                return color.Get(d.c);
            });

        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node.attr("transform", d => `translate(${d.x},${d.y})`);
        }
    }
}
export default DetailGraph;
