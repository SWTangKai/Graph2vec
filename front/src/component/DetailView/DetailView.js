import { Loader, log } from "Utils/utils";

import Card from "./Card/Card";

import "./DetailView.css";

export default class {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(this.domName);
    }

    render(dataset_name) {
        Loader.json("graph-struc/" + dataset_name + "/subStruc")
            .then(results => {
                results.map(subData => {
                    let ID = "detail-" + subData["id"];
                    let card = new Card("" + subData["id"]);
                    document
                        .querySelector("#detail-view")
                        .appendChild(card.dom());
                    card.render(subData, "");
                });
            })
            .then(() => {
                $("#detail-view").owlCarousel({
                    items: 3,
                    itemsDesktop: [1199, 2],
                    itemsDesktopSmall: [980, 2],
                    itemsMobile: [600, 1],
                    pagination: false,
                    navigationText: false,
                    autoPlay: true
                });
            });
    }
}
