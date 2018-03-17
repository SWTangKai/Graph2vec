"use strict";

const log = console.log.bind(console);

log("hhh");

d3.json("http://localhost:5000/api/emb/node2vec", function(err, data) {
    let x = new ForceDirect("#scatter");
    x.render(data);
});

/**
 *
 *
 * @class ForceDirect
 */
class ForceDirect {
    constructor(dom) {
        this.dom = dom;
        this.width = document.querySelector(dom).offsetWidth;
        this.height = document.querySelector(dom).offsetHeight;
    }

    render(data) {
        let width = this.width;
        let height = this.height;
        let domName = this.dom;

        document.querySelector(domName).innerHTML = "";

        const simulation = d3
            .forceSimulation()
            .force("link", d3.forceLink().id(d => d.id))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));

        const svg = d3
            .select(domName)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        let node = svg
            .selectAll(".node")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "node");

        let center = [this.width / 2, this.height / 2];

        var margin = { top: 20, right: 20, bottom: 30, left: 40 },
            wt = 960 - margin.left - margin.right,
            ht = 500 - margin.top - margin.bottom;

        var xScale = d3.scaleLinear().range([0, width]);
        var yScale = d3.scaleLinear().range([height, 0]);

        var xAxis = d3.axisBottom().scale(xScale);
        var yAxis = d3.axisLeft().scale(yScale);

        xScale
            .domain(
                d3.extent(data, d => {
                    return d.pos[0];
                })
            )
            .nice();

        yScale
            .domain(
                d3.extent(data, d => {
                    return d.pos[1];
                })
            )
            .nice();

        var tip = d3
            .tip()
            .attr("class", "d3-tip")
            .html(d => {
                return d.id;
            });

        node.call(tip);

        node
            .append("circle")
            .attr("r", 5)
            .attr("cx", d => {
                return xScale(d.pos[0]);
            })
            .attr("cy", d => {
                return yScale(d.pos[1]);
            })
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide);
    }
}
