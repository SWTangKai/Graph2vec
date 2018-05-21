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

    window.treeGraphView = new TreeGraphView("#tree-graph");
    let nodeInfoView = new NodeInfoView("#node-info-view");
    let subView = new SubView("#sub-view");
    let strucInfoView = new StrucInfoView("#struc-info-view");
    
    let header = new HeaderView("#header", dataset_name => {
        $('#selecteddataset').html(dataset_name)
        Loader.json("graph-struc/" + dataset_name + "/main_graph").then(
            mainData => {
                let forceHilight = mainGraphView.render(mainData);
                window.forceHilight = forceHilight;
                detailView.render(dataset_name);
                // d3.selectAll(".detail-info").on('mouseover', forceHilight.fade(.2)).on('mouseout', forceHilight.fade(1));
                mainGraphView.bindEvent("#main-graph .real-nodes", "click", d => {
                    let ID = d.group_id;
                    Loader.json("graph-struc/" + dataset_name + "/subDis/" + ID)
                        .then(sub_graph => {
                            subView.clean();
                            subView.render(sub_graph, dataset_name);
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


if (module.hot) {
    module.hot.accept("./component/TreeGraphView/TreeGraphView", () => {
        $('#tree-graph').remove()
        let treeGraphView = new TreeGraphView("#tree-graph");
        treeGraphView.render(1);
    });
    // module.hot.accept();
}