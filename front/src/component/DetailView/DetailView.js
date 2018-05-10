import {
    Loader,
    log
} from "Utils/utils";

import Card from "./Card/Card";

import "./DetailView.css";
import {
    ColorManage
} from "Utils/utils";

export default class {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(this.domName);
        this.owl = $(domName);
        this.setOwl(this.owl);
    }

    reset_dom(name) {
        let item_num = $(name + " .owl-item").length;
        for (let i = 0; i < item_num; i++) {
            $(".owl-carousel")
                .data("owl-carousel")
                .removeItem(0);
        }
    }

    render(dataset_name) {
        let me = this;
        me.reset_dom(this.domName);
        Loader.json("graph-struc/" + dataset_name + "/subStruc").then(
            results => {
                results.map(subData => {
                    // TODO: render dynamic
                    me.createOneCard(subData);
                });
            }
        );
    }

    setOwl(owl) {
        owl.owlCarousel({
            items: 3,
            itemsDesktop: [1199, 2],
            itemsDesktopSmall: [980, 2],
            itemsMobile: [600, 1],
            pagination: false,
            navigationText: false,
            autoPlay: true
        });
        // your initial option here, again.});
        // $(name).owlCarousel();
    }

    createOneCard(data) {
        let ID = "detail-" + data["id"];
        let card = new Card("" + data["id"]);
        let content = card.dom().outerHTML;
        this.owl.data("owl-carousel").addItem(content);
        let nodec = '';
        data.nodes.forEach(function (d) {
            if (d['id'] == data['id'])
                nodec = d['c']
        })
        let color = new ColorManage();
        color = color.Get(nodec);
        document.querySelector("#" + ID).style["border-bottom"] =
            color + " solid 3px";
        card.render(data, "");
    }
}