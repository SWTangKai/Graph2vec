//@ts-check

import { Loader, log } from "./utils/utils";
/**
 * @param  {Document} container
 */
export default function(container) {
    var element = document.createElement("h1");
    element.innerHTML = "Hello webpack";
    Loader("graph/", d => {
        log(d);
    });
    return element;
}
