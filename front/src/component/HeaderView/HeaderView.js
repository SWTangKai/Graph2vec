import {
    Loader,
    log
} from "../../utils/utils";

import "./header.css";

export default function (headerDom, changeCallBack) {

    let dataset_dropdown_menu = $("#dataset-dropdown-menu");
    Loader.json("graph/").then(graphNameList => {
        graphNameList.forEach(e => {
<<<<<<< HEAD
            dataset_dropdown_menu.append("<li><a href='#' id='" + e +"' value = '" + e + "'>" + e + "</a><li>");
            log('first',e)
            $("#" + e).click(function(){
=======
            dataset_dropdown_menu.append("<li><a class='dropdown open' href='#' id='" + e + "' value = '" + e + "'>" + e + "</a><li>");
            $("#" + e).click(function () {
>>>>>>> 01b200a4b20107bd637069fbb2c614b73ac5ba84
                changeCallBack($(this).attr("value"))
            })
        });
    })

    let select_dropdown_menu = $("#select-dropdown-menu"),
        select_group = ['s1', 's2', 's3', 's4'];

    select_group.forEach(e => {
<<<<<<< HEAD
        select_dropdown_menu.append("<li><a href='#' id='" + e +"' value = '" + e + "'>" + e + "</a><li>");
        log('second',e)
        $("#" + e).click(function(){
=======
        select_dropdown_menu.append("<li><a href='#' id='" + e + "' value = '" + e + "'>" + e + "</a><li>");
        $("#" + e).click(function () {
>>>>>>> 01b200a4b20107bd637069fbb2c614b73ac5ba84
            changeCallBack($(this).attr("value"))
        })
    })


}