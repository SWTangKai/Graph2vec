import { Loader, log } from "Utils/utils";
import HeaderView from "./component/HeaderView/HeaderView";
import MainGraphView from "./component/MainGraphView/MainGraphView";
import DetailView from "./component/DetailView/DetailView";
import SidebarView from "./component/SidebarView/SidebarView";

/**
 * @param  {Document} container
 */
export default function(container) {
    let mainGraph = new MainGraphView("#mainGraph");
    let sidebar = new SidebarView("#sidebar");
    let header = new HeaderView("#header", dataset_name => {
        Loader.json("graph-struc/" + dataset_name + "/maingraph").then(
            mainData => {
                mainGraph.render(mainData);
                DetailGroup("#mainGraph .node", dataset_name);
            }
        );
        Loader.json("graph-struc/" + dataset_name).then(infoData => {
            sidebar.render(infoData);
        });
    });
    let element;
    return element;
}
/**
 * @param  {string} dom
 * @param  {string} dataset_name
 */
function DetailGroup(dom, dataset_name) {
    document.querySelector("#detail-view").innerHTML = "";
    // TODO: Bug fix: re render have problem
    let d = new DetailView("#content");
    d.render(dataset_name);
}
