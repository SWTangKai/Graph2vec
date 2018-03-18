import * as d3 from "d3";

export const log = console.log.bind(console);

/**
 * @param  {string} path
 * @param  {(value:{})=>{}|void} callback
 */
export const Loader = (path, callback) => {
    d3.json("http://localhost:5000/api/" + path, callback);
};