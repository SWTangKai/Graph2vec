import {
    Loader,
    log
} from "../../utils/utils";

import "./header.css";

export default function (headerDom, changeCallBack) {

    let dataset_dropdown_menu = $("#dataset-dropdown-menu");
    Loader.json("graph/").then(graphNameList => {
        graphNameList.forEach(e => {
            dataset_dropdown_menu.append("<li><a class='dropdown open' href='#' id='" + e + "' value = '" + e + "'>" + e + "</a><li>");
            $("#" + e).click(function () {
                changeCallBack($(this).attr("value"))
            })
        });
    })

    //copyright @ 2018 all rights reserved

}