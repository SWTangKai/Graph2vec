class Card {
    constructor(ID) {
        this.main = this.createEle(
            "div",
            "detail-item my-2 mx-auto p-relative bg-white shadow-1 blue-hover",
            ""
        );
        this.main.appendChild(
            this.createEle("div", "detail-graph", "detail-" + ID)
        );
        this.main.appendChild(
            this.createEle("div", "detail-info", "info-" + ID)
        );
    }

    dom() {
        return this.main;
    }

    render(data) {}

    createEle(type, className, id) {
        let iDiv = document.createElement(type);
        iDiv.className = className;
        if (id != "") {
            iDiv.id = id;
        }
        return iDiv;
    }
}

$("#detail-view").owlCarousel({
    items: 3,
    itemsDesktop: [1199, 2],
    itemsDesktopSmall: [980, 2],
    itemsMobile: [600, 1],
    pagination: false,
    navigationText: false
    // autoPlay: true
});
// $(".owl-carousel")
//     .trigger("add.owl.carousel", [$("<div>bar</div>"), 0])
//     .trigger("refresh.owl.carousel");
["1", "2", "3", "4", "5"].map(d => {
    let c = new Card(d);
    let content = c.dom().outerHTML;
    console.log(content);
    $("#detail-view")
        .data("owl-carousel")
        .addItem(content);
});
