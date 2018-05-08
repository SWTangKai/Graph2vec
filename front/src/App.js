import {
    Loader,
    log
} from "Utils/utils";
import HeaderView from "./component/HeaderView/HeaderView";
import MainGraphView from "./component/MainGraphView/MainGraphView";
import DetailView from "./component/DetailView/DetailView";
import SidebarView from "./component/SidebarView/SidebarView";
import SubView from "./component/SubView/SubView";
import StrucInfoView from "./component/StrucInfoView/StrucInfoView";
import NodeInfoView from "./component/NodeInfoView/NodeInfoView";
import TreeGraphView from "./component/TreeGraphView/TreeGraphView";
/**
 * @param  {Document} container
 */
export default function (container) {
    let sidebar = new SidebarView("#sidebar");
    let mainGraphView = new MainGraphView("#main-graph");
    let detailView = new DetailView("#detail-view");

    let treeGraphView = new TreeGraphView("#tree-graph");
    let nodeInfoView = new NodeInfoView("#node-info-view");
    let subView = new SubView("#sub-view");
    let strucInfoView = new StrucInfoView("#struc-info-view");
    // treeGraphView.render(1);
    let header = new HeaderView("#header", dataset_name => {
        Loader.json("graph-struc/" + dataset_name + "/main_graph").then(
            mainData => {
                let forceHilight = mainGraphView.render(mainData);
                detailView.render(dataset_name);
                window.fore = forceHilight;
                d3.selectAll(".detail-info").on('mouseover', forceHilight.fade(.2));
                mainGraphView.bindEvent("#main-graph .node", "click", d => {
                    let ID = d.group_id;
                    Loader.json("graph-struc/" + dataset_name + "/sub/" + ID)
                        .then(sub_graph => {
                            subView.render(sub_graph, ID);
                        });
                });
            }
        );

        Loader.json("graph-struc/" + dataset_name).then(infoData => {
            sidebar.render(infoData);
            nodeInfoView.render(infoData);
        });
    });

    // subView.render(1);

    let element;
    return element;
}