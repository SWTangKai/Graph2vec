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
        let initLabelsHeight = height * 0.1
        let intervalLabelsHeight = height * (1 - 0.1) / 20
        let labelsCount = 19
        let isLabelsBeyond = false;

        document.querySelector(domName).innerHTML = "";

        let h4 = document.createElement('h4')
        h4.setAttribute('class', 'h4style')
        h4.appendChild(document.createTextNode('Exploration graph'))
        let dd = document.querySelector(domName)
        dd.appendChild(h4)


        let nodes = data.nodes;
        let links = data.links;


        let labels = d3.nest()
            .key(function (d) {
                return d.c
            })
            .entries(nodes)
        let labelsKey = d3.keys(labels)

        if(labelsKey.length > labelsCount){
            labelsKey = labelsKey.slice(0,labelsCount)
            isLabelsBeyond = true
        }

        let simulation = d3
            .forceSimulation()
            .force("link", d3.forceLink().id(d => d.group_id))
            .force("charge", d3.forceManyBody().strength([-40]))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(nodeRadius));

        simulation.nodes(nodes).on("tick", ticked);
        simulation.force("link").links(links).distance([20]).id(d => d.group_id);

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
            .attr("class", "heat");

        // .on("mouseover", mouseOverFunction)
        // .on("mouseout", mouseOutFunction)

        let color = new ColorManage();
        let num = 0;
        node
            .append("circle")
            .attr("r", d => nodeRadius(d) * 3)
            .style("fill", d => {
                let ncolor = color.Get(d.c)
                num = num + 1;
                let radialGradient = svg.append("defs")
                    .append("radialGradient")
                    .attr("id", "radial-gradient-" + num);

                radialGradient.append("stop")
                    .attr("offset", "40%")
                    .attr("stop-color", ncolor);

                radialGradient.append("stop")
                    .attr("offset", "100%")
                    .attr("stop-color", "#fff");
                return "url(#radial-gradient-" + num + ")"
            }).style("opacity", .15);

        let node1 = svg
            .selectAll(".node")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "real-nodes")
            .attr("group_id", d => d['group_id'])
            .attr("id", d => "_" + d['group_id']);
        node1
            .append("circle")
            .attr("r", Math.pow(40.0 * (4 + 1), 1 / 3))
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

        let labelg = svg.selectAll('xxxf')
            .data(labelsKey)
            .enter()
            .append('g')
            .attr('id', d => 'label-' + d)

        
        addLabels(labelg, initLabelsHeight, intervalLabelsHeight, isLabelsBeyond, labelsCount);

        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
            let rad = 5;
            node.attr("cx", d => d.x = Math.max(rad, Math.min(d.x, width - rad)));
            node.attr("cy", d => d.y = Math.max(rad, Math.min(d.y, height - rad)));
            node.attr("transform", d => `translate(${d.x},${d.y})`);
            node1.attr("cx", d => d.x = Math.max(rad, Math.min(d.x, width - rad)));
            node1.attr("cy", d => d.y = Math.max(rad, Math.min(d.y, height - rad)));
            node1.attr("transform", d => `translate(${d.x},${d.y})`);
        }

        function addLabels(labelg, initLabelsHeight, intervalLabelsHeight, isLabelsBeyond, labelsCount) {

            labelg.append('circle')
                .attr('cx', function(d,i){
                    return width * 0.9
                })
                .attr('cy', function(d,i){
                    return initLabelsHeight + intervalLabelsHeight * i
                })
                .attr('r', 5)
                .attr('width', '10px')
                .attr('height', '5px')
                .attr('fill', d => {
                    return color.Get(d)
                })

            labelg.append('text')
                .attr('x', (d, i) => {
                    return width * 0.93
                })
                .attr('y', (d, i) => {
                    return initLabelsHeight*1.05 + intervalLabelsHeight * i
                })
                .text(d => {
                    return d
                })
                .attr('fill', '#6e6c76')
                .attr('font-size', '12px')

            if(isLabelsBeyond){
                d3.select('#main-graph').select('svg')
                .append('text')
                .attr('x', width * 0.93)
                .attr('y', initLabelsHeight + intervalLabelsHeight * labelsCount)
                .attr('id','shengluehao')
                .text('...')
                .attr('fill', '#6e6c76')
                .attr('font-size', '20px')
            }
        }

        function nodeRadius(d) {
            return Math.pow(100.0 * (4 + 1) * (d.counts + 1), 1 / 3);
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
        let forceHilight = new ForceHighlight(node1, link, links)
        // d3.selectAll(".detail-info").on('mouseover', forceHilight.fade(.2)).on('mouseout', forceHilight.fade(1));
        return forceHilight;
    }
}
export default ForceGraph;