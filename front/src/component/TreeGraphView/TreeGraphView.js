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
<<<<<<< HEAD
        var treeData = {
            "name": "group_id_1",
=======
        let treeData = {
            "name": "Top Level",
>>>>>>> e00e0e3a8f40daa054100219fa52ed798c771541
            "children": [{
                    "name": "group_id_2",
                    "children": [{
                            "name": "Son of A"
                        },
                        {
                            "name": "Daughter of A"
                        }
                    ]
                },
                {
                    "name": "group_id_3"
                }
            ]
        };
        this.tree.render(treeData);
        this.bindDrag();
    }

    update(newData) {
        this.tree.update(newData);
    }

    bindDrag() {
        let isMouseDown = false,
            initX = 0,
            initY = 0;
        let me = this;

        me.dom.addEventListener('mousedown', function (e) {
            isMouseDown = true;
            initX = e.offsetX;
            initY = e.offsetY;
        })
        me.dom.addEventListener('mouseup', function () {
            isMouseDown = false;
        })
        document.addEventListener('mousemove', function (e) {
            if (isMouseDown) {
                var cx = e.clientX,
                    cy = e.clientY;
                me.dom.style.left = e.clientX - initX + 'px';
                me.dom.style.top = e.clientY - initY + 'px';
            }
        })

    }

}

export default TreeView;