//@ts-check

import { Loader, log } from "./utils/utils";
import Header from "./component/Header/Header";
/**
 * @param  {Document} container
 */
export default function(container) {
    new Header();
    var element = document.createElement("h1");
    element.innerHTML = "Hello webpack";
    Loader.json("graph/")
        .then(d => {
            log(d);
        })
        .catch(e => {
            log(e);
        });
    return element;
}
