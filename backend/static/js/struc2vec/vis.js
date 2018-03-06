/* global d3 */

function ForceGraph(dataset_name, force) {
  if (dataset_name in window.cache) {
    force.render(window.cache[dataset_name]);
    d3
      .select(".mainGraph")
      .select(".node")
      .on("click", () => {
        n_force = new ForceDirect("#one");
        n_force.render(window.cache[dataset_name]);
      });
  } else {
    d3.json("/api/graph/" + dataset_name, function(err, data) {
      force.render(data);
      window.cache[dataset_name] = data;
      d3.selectAll(".mainGraph .node").on("click", () => {
        n_force = new ForceDirect("#one");
        n_force.render(window.cache[dataset_name]);
      });
    });
  }
}
