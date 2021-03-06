import { LinkObject, GraphDataObject, NodeObject } from "./interface";
import * as d3 from "d3";
/**
 *
 *
 * @class ForceDirect
 */
class ForceDirect {
    public dom: string;
    public width: number;
    public height: number;
    public linkedByIndex: {};
    constructor(dom: string) {
        this.dom = dom;
        this.width = document.querySelector(dom).clientWidth;
        this.height = document.querySelector(dom).clientHeight;
        this.linkedByIndex = {};
    }

    render(data: GraphDataObject) {
        let width = this.width;
        let height = this.height;
        let domName = this.dom;

        const nodes = data.nodes;
        const links = data.links;

        document.querySelector(domName).innerHTML = "";

        const simulation = d3
            .forceSimulation()
            .force("link", d3.forceLink().id((d: NodeObject) => d.id))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));

        const svg = d3
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

        node
            .append("circle")
            .attr("r", nodeRadius)
            .on("mouseover", mouseOverFunction)
            .on("mouseout", mouseOutFunction)
            .call(
                d3
                    .drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)
            );

        simulation.nodes(data.nodes).on("tick", ticked);
        simulation.force("link").links(data.links);

        links.forEach((d: any) => {
            this.linkedByIndex[`${d.source.index},${d.target.index}`] = true;
        });

        function ticked() {
            link
                .attr("x1", (d: any) => d.source.x)
                .attr("y1", (d: any) => d.source.y)
                .attr("x2", (d: any) => d.target.x)
                .attr("y2", (d: any) => d.target.y);

            node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
        }

        function mouseOverFunction(d) {
            const circle = d3.select(this);
            const second: any = {};
            node
                .transition()
                .delay(500)
                .style("opacity", (o: any) => {
                    const isConnectedValue = isConnected(o, d);
                    if (isConnectedValue) {
                        second[o.index] = true;
                        return 1.0;
                    }
                    return 0.2;
                })
                .style("fill", o => {
                    let fillColor;
                    if (
                        isConnectedAsTarget(o, d) &&
                        isConnectedAsSource(o, d)
                    ) {
                        fillColor = "green";
                    } else if (isConnectedAsSource(o, d)) {
                        fillColor = "red";
                    } else if (isConnectedAsTarget(o, d)) {
                        fillColor = "blue";
                    } else if (isEqual(o, d)) {
                        fillColor = "hotpink";
                    } else {
                        fillColor = "#000";
                    }
                    return fillColor;
                });
            link
                .transition(500)
                .style("stroke-opacity", o => {
                    let v = o.source === d || o.target === d ? 1 : 0.2;
                    return v;
                })
                .transition(500);

            circle.transition(500).attr("r", () => 1.4 * nodeRadius(d));
        }

        function mouseOutFunction() {
            const circle = d3.select(this);

            node.transition(500);

            link.transition(500);

            circle.transition(500).attr("r", nodeRadius);
        }

        function isConnected(a, b) {
            return (
                isConnectedAsTarget(a, b) ||
                isConnectedAsSource(a, b) ||
                a.index === b.index
            );
        }

        function isConnectedAsSource(a, b) {
            return self.linkedByIndex[`${a.index},${b.index}`];
        }

        function isConnectedAsTarget(a, b) {
            return self.linkedByIndex[`${b.index},${a.index}`];
        }

        function isEqual(a, b) {
            return a.index === b.index;
        }

        function nodeRadius(d) {
            return Math.pow(40.0 * (d.size + 1), 1 / 3);
        }

        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    }
}
