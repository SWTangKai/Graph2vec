import * as d3 from "d3";
import { GraphDataObject } from "./interface";

class Cache {
    data: {};
    links: { string: boolean };
}

const cache = new Cache();
const cache.links = { string: boolean };

function isLinked(c: string, n: string) {
    return cache.links[`${c},${n}`];
}

function RoundOfNode(center: string, nodes: { id: string }[], wise = 2) {
    let nodeQ = [center];
    let record: {}[] = [];
    let acc: {} = { center: true };
    while (wise--) {
        for (let i = 0; i < nodeQ.length; i++) {
            const element = nodeQ[i];
            nodes.forEach(d => {
                let ID = d.id;
                if (!acc[ID] && isLinked(element, ID)) {
                    acc[ID] = true;
                    nodeQ.push(ID);
                    record.push({ source: element, target: ID });
                }
            });
        }
    }
    log(record);
    return record;
}

function BindClickEvent(dom: string, subDom: string, data: GraphDataObject) {
    d3.selectAll(dom).on("click", (d: { id: string }) => {
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

const CacheData = (name: string, data: GraphDataObject) => {
    cache.data[name] = data;
    cache.links = {};
    data.links.forEach(d => {
        cache.links[`${d.source.index},${d.target.index}`] = true;
    });
};

function ForceGraph(dataset_name: string, graph: any) {
    let name = dataset_name;
    if (dataset_name in cache.data) {
        // graph.render(cache[dataset_name]);
        // BindClickEvent(".mainGraph .node", "#one", cache[dataset_name]);
    } else {
        Loader("emb/" + dataset_name, (data:GraphDataObject) => {
            // graph.render(data);
            // BindClickEvent(".mainGraph .node", "#one", data);
            let x = new ScatterGraph(".mainGraph");
            x.render(data);
            CacheData(dataset_name, data);
        });
    }
}
