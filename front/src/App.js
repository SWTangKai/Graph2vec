import { Loader, log } from "./utils/utils";
import Header from "./component/Header/Header";
import ForceDirect from "./component/Graphs/ForceGraph";
import DetailGraph from "./component/Graphs/DetailGraph";
/**
 * @param  {Document} container
 */
export default function(container) {
    let mainGraph = new ForceDirect("#mainGraph");
    let header = new Header("#header", dataset_name => {
        //TODO:refresh change main Graph
        Loader.json("graph-struc/" + dataset_name).then(mainData => {
            mainGraph.render(mainData);
            BindClickEvent("#mainGraph .node", dataset_name);
        });
    });
    //
    let element;
    return element;
}
/**
 * @param  {string} dom
 * @param  {string} dataset_name
 */
function BindClickEvent(dom, dataset_name) {
    d3.selectAll(dom).on("click", d => {
        log("Clicked:", d);
        log("graph-struc/" + dataset_name + "/" + d.id);
        Loader.json("graph-struc/" + dataset_name + "/" + d.id).then(
            subData => {
                d3
                    .select("#detailView")
                    .append("svg")
                    .attr("class", "detailGraph")
                    .attr("id", "detail-" + d.id)
                    .attr("width", 200)
                    .attr("height", 200);
                let detailGraph = new DetailGraph("#detail-" + d.id);
                detailGraph.render(subData);
            }
        );
    });
}
