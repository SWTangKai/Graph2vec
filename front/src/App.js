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
    // $.when(
    //     ["1", "2", "3", "4", "5"].map(d => {
    //         Loader.json("graph-struc/" + dataset_name + "/" + d).then(
    //             subData => {
    //                 let ID = "detail-" + d;
    //                 log(ID);
    //                 let card = new Card(d);
    //                 document
    //                     .querySelector("#detail-view")
    //                     .appendChild(card.dom());
    //                 card.render(subData, "");
    //             }
    //         );
    //         // let c = new Card(d);
    //         // document.querySelector("#detail-view").appendChild(c.dom());
    //     })
    // ).then(() => {
    //     log("INFO: DONE");
    //     $("#detail-view").owlCarousel({
    //         items: 3,
    //         itemsDesktop: [1199, 2],
    //         itemsDesktopSmall: [980, 2],
    //         itemsMobile: [600, 1],
    //         pagination: false,
    //         navigationText: false
    //         // autoPlay: true
    //     });
    // });

    var when = (function() {
        var i = 0,
            len = 0,
            data = [];
        return function(array, callback) {
            callback = callback || function() {};
            len = len || array.length;
            var fn = array.shift();

            fn(function(res) {
                i++;
                data.push(res);
                if (i < len) {
                    when(array, callback);
                } else {
                    callback(data);
                }
            });
        };
    })();

    let x = [];
    let count = 0;
    ["1", "2", "3", "4", "5"].map(d => {
        x.push(Loader.json("graph-struc/" + dataset_name + "/" + d));
    });
    Promise.all(
        ["1", "2", "3", "4", "5", "6"].map(d => {
            return Loader.json("graph-struc/" + dataset_name + "/" + d);
        })
    )
        .then(results => {
            results.map(subData => {
                let ID = "detail-" + count;
                log(ID);
                let card = new Card("" + count);
                count += 1;
                document.querySelector("#detail-view").appendChild(card.dom());
                card.render(subData, "");
            });
        }) // 1,Error: 2,3
        .then(() => {
            $("#detail-view").owlCarousel({
                items: 3,
                itemsDesktop: [1199, 2],
                itemsDesktopSmall: [980, 2],
                itemsMobile: [600, 1],
                pagination: false,
                navigationText: false
                // autoPlay: true
            });
        })
        .catch(e => console.log(e));

    // Loader.json("graph-struc/" + dataset_name + "/" + d).then(subData => {
    //     let ID = "detail-" + d;
    //     log(ID);
    //     let card = new Card(d);
    //     document.querySelector("#detail-view").appendChild(card.dom());
    //     card.render(subData, "");
    // });
    // ["1", "2", "3", "4", "5"].map(d => {
    //     let card = new Card(d);
    //     document.querySelector("#detail-view").appendChild(card.dom());
    // });
    // $("#detail-view").owlCarousel({
    //     items: 3,
    //     itemsDesktop: [1199, 2],
    //     itemsDesktopSmall: [980, 2],
    //     itemsMobile: [600, 1],
    //     pagination: false,
    //     navigationText: false
    //     // autoPlay: true
    // });
}
