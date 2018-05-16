var data = {
    type: 'action',
    name: '1',
    attributes: [],
    children: [{
        type: 'children',
        name: '2',
        attributes: [{
            'source-type-property-value': 'streetlight'
        }],
        children: [{
            type: 'parents',
            name: '3',
            attributes: [{
                'source-type-property-value': 'cable'
            }],
            children: [{
                type: 'resource-delete',
                name: '4',
                attributes: [],
                children: []
            }]
        }, {
            type: 'children',
            name: '5',
            attributes: [{
                'source-type-property-value': 'lantern'
            }],
            children: []
        }]
    }]
};

// ### DATA MODEL END Set the dimensions and margins of the diagram
var margin = {
        top: 20,
        right: 90,
        bottom: 30,
        left: 90
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page appends a 'group' element to
// 'svg' moves the 'group' element to the top left margin
var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var i = 0,
    duration = 750,
    root;

// declares a tree layout and assigns the size
var treemap = d3
    .tree()
    .size([height, width]);

// Assigns parent, children, height, depth
root = d3.hierarchy(data, function (d) {
    return d.children;
});
root.x0 = height / 2;
root.y0 = 0;

update(root);

var selected = null;

function update(source) {

    // Assigns the x and y position for the nodes
    var treeData = treemap(root);

    // Compute the new tree layout.
    var nodes = treeData.descendants(),
        links = treeData
        .descendants()
        .slice(1);

    // Normalize for fixed-depth.
    nodes.forEach(function (d) {
        d.y = d.depth * 180
    });

    // ### LINKS Update the links...
    var link = svg
        .selectAll('path.link')
        .data(links, function (d) {
            return d.id;
        });
    let curves = d3.line().curve(d3.curveBasis);

    // Enter any new links at the parent's previous position.
    var linkEnter = link
        .enter()
        .append('path')
        .attr("class", "link")
        .attr("stroke-width", 2)
        .attr("fill", 'none')
        .attr("stroke", 'black')
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

    var linkUpdate = linkEnter.merge(link);

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
            // console.log(d)
            // return "M" + d.y + "," + d.x +
            //     "C" + (d.y + d.parent.y) / 2 + "," + d.x +
            //     " " + (d.y + d.parent.y) / 2 + "," + d.parent.x +
            //     " " + d.parent.y + "," + d.parent.x;
            return curves(point)
        });



    // Remove any exiting links
    var linkExit = link
        .exit()
        .transition()
        .duration(duration)
        .attr("d", function (d) {
            let point = [
                [d.y, d.x],
                [d.y, d.x]
            ]
            // console.log(d)
            // return "M" + d.y + "," + d.x +
            //     "C" + (d.y + d.parent.y) / 2 + "," + d.x +
            //     " " + (d.y + d.parent.y) / 2 + "," + d.parent.x +
            //     " " + d.parent.y + "," + d.parent.x;
            return curves(point)
        })
        .remove();

    // var linkExit = link.selectAll('path').remove()

    // ### CIRCLES Update the nodes...
    var node = svg
        .selectAll('g.node')
        .data(nodes, function (d) {
            return d.id || (d.id = ++i);
        });

    // Enter any new modes at the parent's previous position.
    var nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr("transform", function (d) {
            return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on('click', click);

    // Add Circle for the nodes
    nodeEnter
        .append('circle')
        .attr('class', 'node')
        .attr('r', 25)
        .style("fill", function (d) {
            return "#0e4677";
        });

    // Update
    var nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate
        .transition()
        .duration(duration)
        .attr("transform", function (d) {
            return "translate(" + d.y + "," + d.x + ")";
        });

    // Update the node attributes and style
    nodeUpdate
        .select('circle.node')
        .attr('r', 25)
        .style("fill", function (d) {
            return "#0e4677";
        })
        .attr('cursor', 'pointer');

    // Remove any exiting nodes
    var nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr("transform", function (d) {
            return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

    // On exit reduce the node circles size to 0
    nodeExit
        .select('circle')
        .attr('r', 0);

    // Store the old positions for transition.
    nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });

    // Toggle children on click.
    function click(d) {
        selected = d;
        document
            .getElementById('add-child')
            .disabled = false;
        // document
        //     .getElementById('remove')
        //     .disabled = false;
        update(d);
    }
}

document
    .getElementById('add-child')
    .onclick = function () {

        //creates New OBJECT
        var newNodeObj = {
            type: 'resource-delete',
            name: new Date().getTime(),
            attributes: [],
            children: []
        };
        //Creates new Node
        var newNode = d3.hierarchy(newNodeObj);
        newNode.depth = selected.depth + 1;
        newNode.height = selected.height - 1;
        newNode.parent = selected;
        newNode.id = Date.now();

        if (!selected.children) {
            selected.children = [];
            selected.data.children = [];
        }
        selected
            .children
            .push(newNode);
        selected
            .data
            .children
            .push(newNode.data);

        update(selected);
    };