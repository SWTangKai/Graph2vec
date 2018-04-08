import "./StrucInfoView.css";

class StrucInfoView {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(domName);
    }

    render(data) {
        this.dom.innerHTML = "Structure Information";
    }
}

export default StrucInfoView;
