/*jslint es6 */
import {
    ColorManage,
    log,
    Loader
} from "Utils/utils";

/**
 *
 *
 * @class DetailCircleGraph
 */

class DetailCircleGraph {
    constructor(domName) {
        this.domName = domName;
        this.width = document.querySelector(domName).clientWidth;
        this.height = document.querySelector(domName).clientHeight;
    }

    // TODO: node size change with node numbers
    // FIXME: node drag

    // render(data, ID) {

    //     this.testRender(d);

    // }
    rename(domName) {
        this.domName = domName;
        this.width = document.querySelector(domName).clientWidth;
        this.height = document.querySelector(domName).clientHeight;
    }
    render(linkdata) {
        let domName = this.domName,
            width = this.width,
            height = this.height;

        let color = new ColorManage();
        let radius = 15;
        let nodes = linkdata.nodes;
        let links = linkdata.edges;

        let simulation = d3
            .forceSimulation()
            .force("link", d3.forceLink().id(d => d.id))
            .force("charge", d3.forceManyBody().strength([-200]))
            .force("center", d3.forceCenter(width / 2, height / 2));

        simulation.nodes(nodes).on("tick", ticked);
        simulation.force("link").links(links).distance([50]);

        let pie = d3.pie()
            .value(function (d) {
                return d.value;
            })
            .sort(null);

        let svg = d3
            .select(domName)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append('g')

        let link = svg
            .selectAll(".xline")
            .data(links)
            .enter()
            .append("line");

        let node = svg
            .selectAll(".xnode")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "node");


        node
            .append("circle")
            .attr('id', d => {
                return d.id
            })
            .attr("r", d => {
                return 5;
            })
            .style("fill", d => {
                return color.Get(d.c);
            })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended))

        let partition = d3.partition()
            .size([2 * Math.PI, radius]);

        let arc = d3.arc()
            .startAngle(function (d) {
                return d.x0
            })
            .endAngle(function (d) {
                return d.x1
            })
            .innerRadius(function (d) {
                return d.y0
            })
            .outerRadius(function (d) {
                return d.y1
            });

        let Arc = node.selectAll(".Arc")
            .data(function (d) {
                // log(d);
                // let id = d.ind;
                let nodeData = d
                let root = d3.hierarchy(nodeData)
                    .sum(function (d) {
                        return d.value ? d.value : 0;
                    })
                partition(root);
                return root.descendants()
            })
            .enter().append('path')
            .attr("display", function (d) {
                return d.depth ? null : "none";
            })
            .attr("d", arc)
            .on("mouseover", function (d) {
                d3.select(this).transition().attr("transform", "scale(1.5)")
            })
            .on('mouseout', function (d) {
                let me = this;
                setTimeout(() => {
                    d3.select(me).transition().attr("transform", "scale(1)");
                }, 500);

            })
            .style('stroke', '#fff')
            .style("fill", function (d) {
                if ((d.children ? d : d.parent) == null) {
                    return d.data.c
                }
                // console.log("ARC:", d.data.id, ",C:", window.CLICK_ED_ID);
                if (d.children === undefined && d.data.id === window.CLICK_ED_ID) {
                    return "#000";
                }
                return color.Get((d.children ? d : d.parent).data.c);
                //if(d.children) d ;else d.parent
            })
            .attr('class', 'entry')


        let zoom_handler = d3.zoom()
            .scaleExtent([1, 10])
            .on("zoom", zoom_actions);

        function zoom_actions() {
            svg.attr("transform", d3.event.transform)
        }

        zoom_handler(svg);

        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
            node.attr("transform", d => `translate(${d.x},${d.y})`)
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

    bindEvent(domName, type, callback) {
        d3.selectAll(domName).on(type, callback);
    }
}

export default DetailCircleGraph;