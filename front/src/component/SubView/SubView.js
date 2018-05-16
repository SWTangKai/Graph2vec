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
        this.dataset_name = dataset_name;
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
                log("Clean first")
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
                log("Clean second");
                let ID = d.data.id;
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
        this.firstCard = this.secondCard;
        this.secondCard = new SubCard(this.secondView);
        this
            .firstCard
            .detailCircleGraph
            .bindEvent(this.firstView + " .entry", 'click', d => {
                this
                    .secondCard
                    .clean();
                log("Clean first")
                let ID = d.data.id;
                Loader
                    .json("graph-struc/" + this.dataset_name + "/subDis/" + ID)
                    .then(second_data => {
                        this.creatSecondView(second_data, this.dataset_name);
                    })
            })

    }

}

export default SubView;