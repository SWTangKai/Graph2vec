class ForceHighlight {
    constructor(node, link, linksData) {
        this.linkedByIndex = {};
        linksData.forEach(d => {
            this.linkedByIndex[`${d.source.index},${d.target.index}`] = true;
        });
        this.node = node;
        this.linkDom = link;
    }
    isConnected(a, b) {
        return (
            this.isConnectedAsTarget(a, b) ||
            this.isConnectedAsSource(a, b) ||
            a.index === b.index
        );
    }

    isConnectedAsSource(a, b) {
        return this.linkedByIndex[`${a.index},${b.index}`];
    }

    isConnectedAsTarget(a, b) {
        return this.linkedByIndex[`${b.index},${a.index}`];
    }

    fade(opacity) {
        return d => {
            console.log(d);
            // const circle = d3.select(this);
            this.node
                .transition(500)
                .style("opacity", o => {
                    let isConnectedValue = this.isConnected(o, d);
                    if (!isConnectedValue) {
                        return opacity;
                    }
                })
            this.linkDom
                .transition(500)
                .style("stroke-opacity", o => {
                    let v = o.source.index === d.index || o.target.index === d.index ? 1 : opacity;
                    return v;
                })
                .transition(500);

            // circle.transition(500).attr("r", () => 1.4 * nodeRadius(d));
        }
    }

    path(opacity) {
        return tree_path_data => {
            let linkedByIndex = {};
            let nodes = {}
            const calls = (now, children) => {
                linkedByIndex[`${now.name},${children.name}`] = true;
                
                nodes[children.name] = true;
            };
            let iterTree = (roots) => {
                if (!roots['children'] || roots['children'] === []) {
                    return;
                }
                nodes[roots.name] = true;
                roots['children'].forEach(n => {
                    calls(roots, n);
                    iterTree(n);
                })
            }
            iterTree(tree_path_data);
            this.node
                .transition(500)
                .style("opacity", o => {
                    // console.log(o)
                    if (!nodes[o.group_id]) {
                        return opacity;
                    }else{
                        return 1;
                    }
                })
            this.linkDom
                .transition(500)
                .style("stroke-opacity", o => {
                    // console.log(o)
                    
                    let v = linkedByIndex[`${o.source.group_id},${o.target.group_id}`] || 
                            linkedByIndex[`${o.target.group_id},${o.source.group_id}`];
                    if(v){
                        return 1;
                    }else{
                        return opacity;
                    }
                    // return v ? 1 : opacity;;
                });
        }
    }

}
export default ForceHighlight;