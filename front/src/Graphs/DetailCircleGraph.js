/*jslint es6 */
import { ColorManage, log } from "Utils/utils";
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

    render(data, ID) {

        let domName = this.domName,
            width = this.width,
            height = this.height;


        let linkdata = {
            'links': [{ 'source': '1', 'target': '37' }],
            'nodes': [{ 'c': '0', 'id': '1', 'ind': '1' },
            { 'c': '0', 'id': '37', 'ind': '37' }
            ]
        }

        let nodedata = {
            '1': {
                'id': '1', 'children': [{
                    "c": '0', "id": '0', 'children': [{ 'id': '37', 'value': 4, 'c': 0 }, { 'id': '22', 'value': 1, 'c': 0 }]
                }, {
                    "c": '0', "id": '1', 'children': [{ 'id': '9', 'value': 1, 'c': 1 }, { 'id': '10', 'value': 1, 'c': 1 }]
                }]
            }, '37': {
                'id': '1', 'children': [{
                    "c": '0', "id": '0', 'children': [{ 'id': '37', 'value': 4, 'c': 0 }, { 'id': '22', 'value': 1, 'c': 0 }]
                }, {
                    "c": '0', "id": '1', 'children': [{ 'id': '9', 'value': 1, 'c': 1 }, { 'id': '10', 'value': 1, 'c': 1 }]
                }]
            }
        }

        let color = new ColorManage();
        let radius = 15;
        let nodes = linkdata.nodes;
        let links = linkdata.links;

        let simulation = d3
            .forceSimulation()
            .force("link", d3.forceLink().id(d => d.id))
            .force("charge", d3.forceManyBody().strength([-50]))
            .force("center", d3.forceCenter(width / 2, height / 2));

        simulation.nodes(nodes).on("tick", ticked);
        simulation.force("link").links(links).distance([100]);

        let pie = d3.pie()
            .value(function (d) { return d.value; })
            .sort(null);

        let svg = d3
            .select(domName)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append('g')
            //.call(zoom);

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


        node
            .append("circle")
            .attr('id', d => {
                return d.id
            })
            .attr("r", d => {
                return d.id === ID ? 9 : 5;
            })
            .style("fill", d => {
                return color.Get(d.c);
            });

        let partition = d3.partition()
            .size([2 * Math.PI, radius]);

        let arc = d3.arc()
            .startAngle(function (d) { return d.x0 })
            .endAngle(function (d) { return d.x1 })
            .innerRadius(function (d) { return d.y0 })
            .outerRadius(function (d) { return d.y1 });

        let Arc = node.selectAll(".Arc")
            .data(function (d) {
                let id = d.ind;
                let nodeData = nodedata[id]
                let root = d3.hierarchy(nodeData)
                    .sum(function (d) { return d.value })
                partition(root);
                return root.descendants()
            })
            .enter().append('path')
            .attr("display", function (d) { return d.depth ? null : "none"; })
            .attr("d", arc)
            .style('stroke', '#fff')
            .style("fill", function (d) {log(d); return color.Get((d.children ? d : d.parent).data.id); })
        
        let zoom_handler = d3.zoom()
            .scaleExtent([1, 10])
            .on("zoom", zoom_actions);

        function zoom_actions(){
            svg.transition().duration(200).attr("transform", d3.event.transform)
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
    }
}

export default DetailCircleGraph;