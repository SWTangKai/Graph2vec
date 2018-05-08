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
            const circle = d3.select(this);
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


}
export default ForceHighlight;