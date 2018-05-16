class TreeGraph {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(domName);
    }

    update(data) {
        let duration = 750,
            nodeRedius = 10,
            interval = 150;
        let curves = d3.line().curve(d3.curveBasis);


        data = d3.hierarchy(data, function (d) {
            return d.children;
        });

        let treeData = this.treemap_1(data, 0, 100)

        let nodesData = treeData.descendants(),
            linksData = treeData.descendants().slice(1);
        // adds the links between the nodes

        //  // Normalize for fixed-depth.
        nodesData.forEach(function (d) {
            d.y = d.depth * interval
        });

        let link = this.g.selectAll(".link")
            .data(linksData, d => d.id);

        let linkEnter = link
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", function (d) {
                let point = [
                    [d.y, d.x],
                    [(d.y + d.parent.y) / 2, d.x],
                    [(d.y + d.parent.y) / 2, d.parent.x],
                    [d.parent.y, d.parent.x]
                ]
                // console.log(d)
                // return "M" + d.y + "," + d.x +
                //     "C" + (d.y + d.parent.y) / 2 + "," + d.x +
                //     " " + (d.y + d.parent.y) / 2 + "," + d.parent.x +
                //     " " + d.parent.y + "," + d.parent.x;
                return curves(point)
            });

        let linkUpdate = linkEnter.merge(link);

        linkUpdate
            .transition()
            .duration(duration)
            .attr("d", function (d) {
                let point = [
                    [d.y, d.x],
                    [(d.y + d.parent.y) / 2, d.x],
                    [(d.y + d.parent.y) / 2, d.parent.x],
                    [d.parent.y, d.parent.x]
                ]
                return curves(point)
            });

        let linkExit = link
            .exit()
            .transition()
            .duration(duration)
            .attr("d", function (d) {
                let point = [
                    [d.y, d.x],
                    [d.y, d.x]
                ]
                return curves(point)
            })
            .remove();

        // adds each node as a group
        let node = this.g.selectAll("g.node")
            .data(nodesData, d => d.id)

        let nodeEnter = node
            .enter()
            .append("g")
            .attr("class", function (d) {
                return "node" +
                    (d.children ? " node--internal" : " node--leaf");
            })
            .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });


        // adds the circle to the node
        nodeEnter.append("circle")
            .attr('class', 'node')
            .attr("r", nodeRedius);

        let nodeUpdate = nodeEnter.merge(node);

        nodeUpdate
            .transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        nodeUpdate
            .select('circle.node')
            .attr('r', nodeRedius)
            .style("fill", d => {
                return 'red';
            })
            .attr('cursor', 'pointer');

        let nodeExit = node
            .exit()
            .transition()
            .duration(duration)
            .remove();

        nodeExit
            .select('circle')
            .attr('r', 0);
    }

    render(treeData) {
        // set the dimensions and margins of the diagram
        const margin = {
                top: 20,
                right: 90,
                bottom: 30,
                left: 90
            },
            width = (this.dom.clientWidth - margin.left - margin.right) / 2,
            height = this.dom.clientHeight - margin.top - margin.bottom;


        // declares a tree layout and assigns the size
        this.treemap_1 = d3.tree()
            .size([height, width]);


        const svg = d3.select(this.domName)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);
        this.g = svg.append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        this.update(treeData);
    }
}

export default TreeGraph;