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
    }

    clean() {
        this
            .firstCard
            .clean();
        this
            .secondCard
            .clean();
    }
    render(data, dataset_name) {
        this.createFirstView(data, dataset_name);
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
                Loader
                    .json("graph-struc/" + dataset_name + "/subDis/" + ID)
                    .then(first_data => {
                        this.clean();
                        this.createFirstView(second_data, dataset_name);
                        this.creatSecondView(first_data, dataset_name);
                    })
            })
    }

}

export default SubView;