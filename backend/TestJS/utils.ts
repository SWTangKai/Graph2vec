const log = console.log.bind(console);
const Loader = (path: string, callback: (value: {}) => {} | void) => {
    d3.json("http://localhost:5000/api/" + path).then(callback);
};
