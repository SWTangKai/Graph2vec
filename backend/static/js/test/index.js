d3.json('http://localhost:5000/api/v2/graph-struc/karate-mirrored/main_graph', (error, graph) => {
    const width = 1200;
    const height = 1000;

    const simulation = d3.forceSimulation()
        .nodes(graph.nodes)
        .force('link', d3.forceLink().id(d => d.group_id))
        .force('charge', d3.forceManyBody().strength([-150]))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .on('tick', ticked);

    simulation.force('link')
        .links(graph.links)
        .distance([50]);

    const R = 10;

    const svg = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height);


    let link = svg.selectAll('line')
        .data(graph.links)
        .enter().append('line');

    link
        .attr('class', 'link')
        .attr('marker-end', 'url(#end-arrow)')
        .on('mouseout', fade(1));

    let node = svg.selectAll('.node')
        .data(graph.nodes)
        .enter().append('g')
        .attr('class', 'node');

    node.append('circle')
        .attr('r', R)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    d3.selectAll('.x')
        .data([{
            index: 1
        }, {
            index: 2
        }, {
            index: 3
        }, {
            index: 4
        }, {
            index: 5
        }])
        .enter()

    d3.selectAll('.x')
        .on('mouseover', d => {
            console.log(d);
            fade(.1)(d);
        })
        .on('mouseout', d => {
            console.log(d);
            fade(1)(d);
        })


    node.append('text')
        .attr('x', 0)
        .attr('dy', '.35em')
        .text(d => d.name);

    function ticked() {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node
            .attr('transform', d => `translate(${d.x},${d.y})`);
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

    const linkedByIndex = {};
    graph.links.forEach(d => {
        linkedByIndex[`${d.source.index},${d.target.index}`] = 1;
    });
    window.links = linkedByIndex

    function isConnected(a, b) {
        return linkedByIndex[`${a.index},${b.index}`] || linkedByIndex[`${b.index},${a.index}`] || a.index === b.index;
    }

    function fade(opacity) {
        return d => {
            node.style('stroke-opacity', function (o) {
                const thisOpacity = isConnected(d, o) ? 1 : opacity;
                this.setAttribute('fill-opacity', thisOpacity);
                return thisOpacity;
            });

            link.style('stroke-opacity', o => (o.source.index === d.index || o.target.index === d.index ? 1 : opacity));
            link.attr('marker-end', o => (opacity === 1 || o.source.index === d.index || o.target.index === d.index ? 'url(#end-arrow)' : 'url(#end-arrow-fade)'));
        };
    }
})