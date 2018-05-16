import "./TreeGraphView.css";
import {
    log,
    Loader
} from "../../utils/utils";
import TreeGraph from "Graphs/TreeGraph";

class TreeView {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(domName);
        this.tree = new TreeGraph(domName);
    }
    render(data) {
        let treeData = {
            "name": "Top Level",
            "children": [{
                    "name": "Level 2: A",
                    "children": [{
                            "name": "Son of A"
                        },
                        {
                            "name": "Daughter of A"
                        }
                    ]
                },
                {
                    "name": "Level 2: B"
                }
            ]
        };
        this.tree.render(treeData);
    }

    update(newData) {
        this.tree.update(newData);
    }

}

export default TreeView;