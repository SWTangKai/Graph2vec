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
    }

    assignRoot(click_id){
        this.data['name'] = click_id;
        this.data = [this.data]
    }

    appendTreeData(rootId,id){
        let searchdata = this.data;
        let returnItem;
        let appendData = function(searchdata, rootId){
            searchdata.forEach((item) => {
                if(item.name == rootId){
                    	returnItem = item;
                    if(!item.children){
                        item.children = [];
                        item.children.push({'name': id})
                    }
                    else if(item.children.length > 0){
                        let isHere = 0
                        item.children.forEach((h) => {
                            if(h.name == id)
                                isHere = 1
                        })
                        if(!isHere)
                            item.children.push({'name': id})
                    }
                        return item;
                }
                if(item.children){
                    if(item.children.length > 0){
                        find(item.children, rootId);
                    }
                }
            })
        };
        let item = appendData(searchdata, rootId)
    }

    clean() {
        this.data = {};
        this
            .firstCard
            .clean();
        this
            .secondCard
            .clean();
    }
    render(data, dataset_name) {
        this.createFirstView(data, dataset_name);
        this.assignRoot(dataset_name)
    }
    createFirstView(data, dataset_name) {
        this
            .firstCard
            .render(data);
        this
            .firstCard
            .detailCircleGraph
            .bindEvent(this.firstView + " .entry", 'click', d => {
                this
                    .secondCard
                    .clean();
                let ID = d.data.id;
                if(!ID)
                    return;
                this.appendTreeData(dataset_name, ID)
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
                let ID = d.data.id;
                if(!ID)
                    return;
                this.appendTreeData(dataset_name, ID)
                log(this.data)
                Loader
                    .json("graph-struc/" + dataset_name + "/subDis/" + ID)
                    .then(first_data => {
                        // this.clean();
                        this.Lshift();
                        // this.createFirstView(second_data, dataset_name);
                        this.creatSecondView(first_data, dataset_name);
                    })
            })
    }

    Lshift() {
        $(this.firstView).remove()
        $(this.secondView).attr('id', this.firstView.slice(1))
        $('<div class="xxx" id="' + this.secondView.slice(1) + '"></div>').appendTo(this.dom)
    }

}

export default SubView;