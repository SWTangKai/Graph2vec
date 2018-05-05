/*jslint es6 */
import { ColorManage, log } from "Utils/utils";
/**
 *
 *
 * @class DetailCircleGraph
 */

 class DetailCircleGraph{
    constructor(domName){
        this.domName = domName;
        this.width = document.querySelector(domName).clientWidth;
        this.height = document.querySelector(domName).clientHeight;
    }
    
    render(data, ID){
        log(data,ID)
    }
 }

 export default DetailCircleGraph;