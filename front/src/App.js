import { Loader, log } from "Utils/utils";
import HeaderView from "./component/HeaderView/HeaderView";
import MainGraphView from "./component/MainGraphView/MainGraphView";
import DetailView from "./component/DetailView/DetailView";
import SidebarView from "./component/SidebarView/SidebarView";
import SubView from "./component/SubView/SubView";
import StrucInfoView from "./component/StrucInfoView/StrucInfoView";
import NodeInfoView from "./component/NodeInfoView/NodeInfoView";
/**
 * @param  {Document} container
 */
export default function(container) {
    let mainGraphView = new MainGraphView("#main-graph");
    let detailView = new DetailView("#detail-view");
    let sidebar = new SidebarView("#sidebar");

    let subView = new SubView("#sub-view");
    let strucInfoView = new StrucInfoView("#struc-info-view");
    let nodeInfoView = new NodeInfoView("#node-info-view");

    let header = new HeaderView("#header", dataset_name => {
        Loader.json("graph-struc/" + dataset_name + "/mainGraph").then(
            mainData => {
                mainGraphView.render(mainData);
                detailView.render(dataset_name);
            }
        );
        Loader.json("graph-struc/" + dataset_name).then(infoData => {
            sidebar.render(infoData);
            nodeInfoView.render(infoData);
        });
    });

    subView.render(1);
    strucInfoView.render(1);

    let element;
    return element;
}
