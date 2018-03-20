import { Loader, log } from "../../utils/utils";

export default function(headerDom, changeCallBack) {
    $(".selectpicker").selectpicker({
        noneSelectedText: "Please select one dataset" //默认显示内容
    });
    var select = $("#slpk");
    select = select.html("");
    Loader("graph/", (error, graphNameList) => {
        log("INFO", graphNameList);
        graphNameList.forEach(e => {
            select.append("<option value='" + e + "'>" + e + "</option>");
        });
        $(".selectpicker").selectpicker("refresh");
        $(window).on("load", () => {
            $(".selectpicker").selectpicker("refresh");
        });
    });

    d3.select(headerDom).on("change", () => {
        let dataset_name = $("#slpk")
            .find("option:selected")
            .attr("value");
        log("SELECT: ", dataset_name);
        changeCallBack(name);
    });
}
