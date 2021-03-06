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

    clean(){
        this.dom.innerHTML = "";
        this.tree = new TreeGraph(this.domName);
    }

    render(treeData) {
        this.tree.render(treeData);
        // this.bindDrag();
    }

    update(newData) {
        this.tree.update(newData);
    }

    bindEvent(callback){
        d3.selectAll('#tree-graph circle').on('click', callback)
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