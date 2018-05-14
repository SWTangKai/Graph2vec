/* global d3 */

function isLinked(c, n) {
    return window.links[`${c},${n}`];
}

function RoundOfNode(center, nodes, wise = 2) {
    let nodeQ = [center];
    let record = [];
    let acc = {
        center: true
    };
    while (wise--) {
        for (let i = 0; i < nodeQ.length; i++) {
            const element = nodeQ[i];
            nodes.forEach(d => {
                let ID = d.id;
                if (!acc[ID] && isLinked(element, ID)) {
                    acc[ID] = true;
                    nodeQ.push(ID);
                    record.push({
                        source: element,
                        target: ID
                    });
                }
            });
        }
    }
    log(record);
    return record;
}

function BindClickEvent(dom, subDom, data) {
    d3.selectAll(dom).on("click", d => {
        log("Clicked:", d);
        RoundOfNode(d.id, data.nodes);
        d3
            .select(subDom)
            .selectAll(".node")
            .data([d])
            .enter()
            .append("g")
            .attr("id", d => {
                return d.id;
            })
            .append("circle")
            .attr("r", 100);
    });
}

const CacheData = (name, data) => {
    window.cache[name] = data;
    window.links = {};
    data.links.forEach(d => {
        window.links[`${d.source.index},${d.target.index}`] = true;
    });
};

function ForceGraph(dataset_name, force) {
    window.name = dataset_name;
    if (dataset_name in window.cache) {
        // force.render(window.cache[dataset_name]);
        // BindClickEvent(".mainGraph .node", "#one", window.cache[dataset_name]);
    } else {
        Loader("emb/" + dataset_name + "/graph", (err, data) => {
            force.render(data);
            BindClickEvent(".mainGraph .node", "#one", data);
            // let x = new ScatterGraph(".mainGraph");
            // x.render(data);
            CacheData(dataset_name, data);
        });
    }
}