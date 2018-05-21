// import echarts from "echarts";
import SubCard from "./SubCard/SubCard";
import {
    Loader,
    log
} from "Utils/utils";

import "./SubView.css";

class SubView {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(domName);
        this.firstView = "#first-view";
        this.secondView = "#second-view";
        this.firstCard = new SubCard(this.firstView);
        this.secondCard = new SubCard(this.secondView);
        this.nowfloor = 0;
        this.headnode = null;
        this.data = {};
        this.nowNode = null;
        this.treeIndex = 0;
    }
    assignRoot(click_id) {
        this.data = this.createAnode(click_id);
        this.nowNode = this.data;
        this.notifyDataChange();
    }
    notifyDataChange(){
        window.forceHilight.path(.2)(this.data);
    }

    createAnode(x) {
        return {
            'name': x['id'],
            'c': x['c'],
            'treeID': this.treeIndex++,
            'children': []
        }
    }
    newLife(id) {
        this.nowNode['children'].push(this.createAnode(id))
        this.notifyDataChange();
    }

    newNode(root_id, id) {
        let tmp = this.findChild(this.nowNode, root_id);
        tmp['children'].push(this.createAnode(id))
        this.nowNode = tmp;
        this.notifyDataChange();
    }

    findChild(nodes, id){
        let node = null;
        nodes.children.forEach(d => {
            if(d['name'] === id){
                node = d; 
            }
        })
        return node
    }

    findByID(roots, id) {
        if (roots['treeID'] === id) {
            return roots
        } else {
            if ('children' in roots) {
                let ans = -1;
                roots['children'].forEach(d => {
                    let x = this.findByID(d, id)
                    if (x != -1) {
                        ans = x;
                    }
                })
                return ans;
            } else {
                return -1;
            }
        }
    }

    clean() {
        this.data = {};
        this
            .firstCard
            .clean();
        this
            .secondCard
            .clean();
        window.treeGraphView.clean();
    }

    GetData(){
        return this.data;
    }

    render(data, dataset_name) {
        window.d = this.data;
        this.dataset_name = dataset_name;
        this.createFirstView(data, dataset_name);
        this.assignRoot({'id':data.group_id, 'c':data.nodes[0].c});
        window.treeGraphView.render(this.GetData());
    }
    createFirstView(data, dataset_name) {
        this
            .firstCard
            .render(data);
            window.s = data;
        this
            .firstCard
            .detailCircleGraph
            .bindEvent(this.firstView + " .entry", 'click', d => {
                this
                    .secondCard
                    .clean();
                log("Clean first")
                window.x = d;
                let ID = d.data.id;
                this.newLife({'id':ID, 'c':d.data.c});
                // this.first_id = ID;
                log(this.data)
                window.datas = this.data;
        window.treeGraphView.update(this.GetData());
                
                Loader
                    .json("graph-struc/" + dataset_name + "/subDis/" + ID)
                    .then(second_data => {
                        this.creatSecondView(second_data, dataset_name);
                    })

            })
    }
    creatSecondView(second_data, dataset_name) {
        this
            .secondCard
            .render(second_data);
        this
            .secondCard
            .detailCircleGraph
            .bindEvent(this.secondView + " .entry", 'click', d => {
                log("Clean second");
                let ID = d.data.id;
                window.x = d;
                // this.appendTreeData(dataset_name, ID);
                this.newNode(second_data.group_id, {'id':ID, 'c':d.data.c});
                window.datas = this.data;
                log(this.data)
                window.treeGraphView.update(this.GetData());
                Loader
                    .json("graph-struc/" + dataset_name + "/subDis/" + ID)
                    .then(first_data => {
                        this.Lshift();
                        this.creatSecondView(first_data, dataset_name);
                    })
            })
    }

    Lshift() {
        $(this.firstView).remove();
        this
            .secondCard
            .detailCircleGraph
            .bindEvent(this.secondView + " .entry", 'click', null);
        $(this.secondView).attr('id', this.firstView.slice(1));
        $('<div class="xxx" id="' + this.secondView.slice(1) + '"></div>').appendTo(this.dom);
        this.secondCard.rename(this.firstView);
        this.firstCard = this.secondCard;
        this.secondCard = new SubCard(this.secondView);
        this
            .firstCard
            .detailCircleGraph
            .bindEvent(this.firstView + " .entry", 'click', d => {
                this
                    .secondCard
                    .clean();
                    let ID = d.data.id;
                this.newLife({'id':ID, 'c':d.data.c});
                log("Clean first")
                window.datas = this.data;
                window.treeGraphView.update(this.GetData());
                Loader
                    .json("graph-struc/" + this.dataset_name + "/subDis/" + ID)
                    .then(second_data => {
                        this.creatSecondView(second_data, this.dataset_name);
                    })
            })

    }

}

export default SubView;