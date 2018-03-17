const log = console.log.bind(console);
const Loader = (path, callback) => {
    d3.json("http://localhost:5000/api/" + path, callback);
};
