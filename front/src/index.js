import App from "./App";
import {
    $,
    jquery
} from "jquery";

import "./index.css";

function render() {
    return App(document.body.querySelector("#container"));
}

//HMR 接口
if (module.hot) {
    module.hot.accept();
}

let d = render();