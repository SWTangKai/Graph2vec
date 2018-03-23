import { Loader, log } from "./utils/utils";
import Header from "./component/Header/Header";
import ForceDirect from "./component/Graphs/ForceGraph";
import DetailGraph from "./component/Graphs/DetailGraph";
import Card from "./component/card/card";

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
    // d3.selectAll(dom).on("click", d => {
    //     log("Clicked:", d);
    //     log("graph-struc/" + dataset_name + "/" + d.id);
    //     Loader.json("graph-struc/" + dataset_name + "/" + d.id).then(
    //         subData => {
    //             let ID = "detail-" + d.id;
    //             log(ID);
    //             let card = new Card(ID);
    //             document
    //                 .querySelector("#detailView")
    //                 .appendChild(card.append());
    //             card.render(subData, "");
    //         }
    //     );
    //     $("#detailView").owlCarousel({
    //         items: 3,
    //         itemsDesktop: [1199, 2],
    //         itemsDesktopSmall: [980, 2],
    //         itemsMobile: [600, 1],
    //         pagination: false,
    //         navigationText: false,
    //         autoPlay: true
    //     });
    // });
    // });
    for (let d = 1; d < 5; d++) {
        log("Clicked:", d);
        log("graph-struc/" + dataset_name + "/" + d);
        Loader.json("graph-struc/" + dataset_name + "/" + d).then(subData => {
            let ID = "detail-" + d.id;
            log(ID);
            let card = new Card(ID);
            document.querySelector("#detailView").appendChild(card.append());
            card.render(subData, "");
        });
    }
    $("#detailView").owlCarousel({
        items: 3,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [980, 2],
        itemsMobile: [600, 1],
        pagination: false,
        navigationText: false,
        autoPlay: true
    });
}
