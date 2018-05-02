import { Loader, log } from "../../utils/utils";

import "./header.css";

export default function(headerDom, changeCallBack) {

    let dataset_dropdown_menu = $("#dataset-dropdown-menu");
    Loader.json("graph/").then(graphNameList => {
        graphNameList.forEach(e => {
            dataset_dropdown_menu.append("<li><a href='#' id='" + e +"' value = '" + e + "'>" + e + "</a><li>");
            $("#" + e).click(function(){
                changeCallBack($(this).attr("value"))
            })
        });
    })

    let select_dropdown_menu = $("#select-dropdown-menu"),
    select_group = ['s1','s2','s3','s4'];

    select_group.forEach(e => {
        select_dropdown_menu.append("<li><a href='#' id='" + e +"' value = '" + e + "'>" + e + "</a><li>");
        $("#" + e).click(function(){
            changeCallBack($(this).attr("value"))
        })
    })


}
