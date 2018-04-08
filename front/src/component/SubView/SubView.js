import "./SubView.css";

class SubView {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(domName);
    }

    render(data) {
        this.dom.innerHTML = "Sub Graph";
    }
}

export default SubView;
