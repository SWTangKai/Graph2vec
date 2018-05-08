import { Loader, log } from "Utils/utils";
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
export default function(container) {
    let sidebar = new SidebarView("#sidebar");
    let mainGraphView = new MainGraphView("#main-graph");
    let detailView = new DetailView("#detail-view");

    let treeGraphView = new TreeGraphView("#tree-graph");
    let nodeInfoView = new NodeInfoView("#node-info-view");
    let subView = new SubView("#sub-view");
    let strucInfoView = new StrucInfoView("#struc-info-view");

    let header = new HeaderView("#header", dataset_name => {
        Loader.json("graph-struc/" + dataset_name + "/main_graph").then(
            mainData => {
                mainGraphView.render(mainData);
                detailView.render(dataset_name);
                mainGraphView.bindEvent("#main-graph .node", "click", d => {
                    let ID = d.group_id;
                    Loader.json("graph-struc/" + dataset_name + "/sub/" + ID)
                        .then(sub_graph => {
                            subView.render(sub_graph,ID);
                        });
                });
                Loader.json("graph-struc/" + dataset_name + "/subInfo").then(
                    sub_info => {
                        let info = {
                            name: "kind info",
                            kind: [],
                            xAxix: [],
                            data: []
                        };
                        sub_info.forEach(d => {
                            info.kind.push("bar-" + d["id"]);
                            let b = [];
                            for (let x in d.count) {
                                b.push(x);
                            }
                            // cal union
                            info.xAxix = Array.from(
                                new Set(info.xAxix.concat(b))
                            );
                        });
                        info.xAxix = info.xAxix.sort();
                        let len = info.xAxix.length;
                        sub_info.forEach(d => {
                            let ar = Array(len).fill(0);
                            for (let x in d.count) {
                                ar[info.xAxix.indexOf(x)] = d.count[x];
                            }
                            info.data.push({
                                kind: "bar-" + d["id"],
                                data: ar
                            });
                        });

                        window.sub_info = sub_info;
                        window.info = info;
                        strucInfoView.render([info]);
                    }
                );
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
