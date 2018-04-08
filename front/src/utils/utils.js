import * as d3 from "d3";

export const log = console.log.bind(console);

export const Loader = {
    /**
     * @param  {string} name
     * @returns Promise
     */
    json: name => {
        return new Promise((resolve, reject) => {
            d3.json("http://localhost:5000/api/v2/" + name, (error, data) => {
                if (error) reject(error);
                resolve(data);
            });
        });
    }
};
