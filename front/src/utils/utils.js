import * as d3 from "d3";

export const log = console.log.bind(console);

export const Loader = {
    /**
     * @param  {string} name
     * @returns Promise
     */
    json: name => {
        return new Promise((resolve, reject) => {
            d3.json("http://10.10.4.53:5000/api/v2/" + name, (error, data) => {
                if (error) reject(error);
                resolve(data);
            });
        });
    }
};

// export const ColorManage = {
//     color: d3.scaleOrdinal(d3.schemeCategory20),
//     Get: function(idx) {
//         return this.color(idx);
//     }
// };

export class ColorManage {
    constructor() {
        if (ColorManage.prototype.Instance === undefined) {
            this.color = d3.scaleOrdinal(d3.schemeCategory20);
            ColorManage.prototype.Instance = this;
        }
        return ColorManage.prototype.Instance;
    }

    Get(idx) {
        return this.color(idx);
    }
}
