import "./TreeGraphView.css";
import {
    log,
    Loader
} from "../../utils/utils";

class TreeGraph {
    constructor(domName) {
        this.domName = domName;
        this.dom = document.querySelector(domName)
    }
    render(data) {
        log(data);

        function SourceCache() {
            var ks = [],
                vs = [];

            function getValue(k) {
                var idx = ks.indexOf(k);
                if (idx !== -1) {
                    return vs[idx];
                }
            }

            function cache(source) {
                var k = source.name;
                if (source && !getValue(k)) {
                    var idx = ks.length;
                    ks[idx] = k;
                    vs[idx] = source;
                }
            }

            function cacheUntilMatch(v, root) {
                var m;

                function recurse(source) {
                    cache(source);
                    if (m || !source) {
                        return;
                    } else if (source.name === v) {
                        m = source;
                        return;
                    } else if (source.children) {
                        source.children.forEach((d) => {
                            recurse(d);
                        });
                    }
                }
                recurse(root);
                return m;
            }

            return {
                getValue: getValue,
                cacheUntilMatch: cacheUntilMatch
            };
        }

        // this must be outside of the submit function to be reused across searches
        var cache = SourceCache();

        // We only cache nodes that have been visited. We stop caching as soon as a match has been found. 
        // If trees can be very deep and performance is critical, another strategy might be required. 

        function onSubmitFilter() {
            var v = document.getElementById('filterInput').value;
            if (v === '') {
                filtered(root);
            } else {
                var m = cache.getValue(v);
                if (!m) {
                    m = cache.cacheUntilMatch(v, root);
                }
                filtered(m);
            }
        }

        function filtered(source) {
            collapse(root);
            update(root);
            if (source && source._children) {
                source.children = source._children;
                source._children = null;
            }
            update(source);
        } 
            var margin = {
                    top: 20,
                    right: 120,
                    bottom: 20,
                    left: 120
                },
                width = 960 - margin.right - margin.left,
                height = 800 - margin.top - margin.bottom;

        var i = 0,
            duration = 750,
            root;

        var tree = d3.layout.tree()
            .size([height, width]);

        var diagonal = d3.svg.diagonal()
            .projection(function (d) {
                return [d.y, d.x];
            });

        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        function collapse(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
                d._children.forEach(collapse);
            }
        }


        d3.json("https://gist.githubusercontent.com/mbostock/1093025/raw/490fffd1ae637d3275aa9eaa8b0487147717dd40/flare.json", function (error, flare) {

            total = d3.select("body").selectAll("p")
                .data([flare])
                .enter()
                .append("p")

            root = flare;
            root.x0 = height / 2;
            root.y0 = 0;

            root.children.forEach(collapse);
            update(root);
        });

        var previousSource;

        d3.select(self.frameElement).style("height", "800px");


        function update(source) {

            /*
            if(previousSource && previousSource.name === source.name) {
              // Compute the new tree layout.
              source= source.parent;
            } 
            // Compute the new tree layout.
            */
            var nodes = tree.nodes(source).reverse(),
                links = tree.links(nodes);
            previousSource = source;

            // Normalize for fixed-depth.
            nodes.forEach(function (d) {
                d.y = d.depth * 180;
            });

            // Update the nodes…
            var node = svg.selectAll("g.node")
                .data(nodes, function (d) {
                    return d.id || (d.id = ++i);
                });

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function (d) {
                    return "translate(" + source.y0 + "," + source.x0 + ")";
                })
                .on("click", click)
                .call(d3.helper.tooltip()
                    .text(function (d, i) {
                        return (("Name: ").bold() + d.name) + " " + (("Time: ").bold() + d.time + ":00") + " " + (("Percentage: ").bold()) + ((d.time / total.data()[0].time) * 100);
                    })
                );

            nodeEnter.append("circle")
                .attr("r", function (d) {
                    if (((d.time / total.data()[0].time) * 100) <= 20) {
                        return 4.5;
                    }
                })
                .attr("fill", "white")
                .attr("stroke", "steelblue")
                .attr("stroke-width", function (d) {
                    if (d._children) {
                        return "3px";
                    } else {
                        return "2px";
                    }
                });
            nodeEnter.append("ellipse")
                .attr("rx", function (d) {
                    if (((d.time / total.data()[0].time) * 100) >= 20 && ((d.time / total.data()[0].time) * 100) <= 40) {
                        return 8;
                    }
                })
                .attr("ry", function (d) {
                    if (((d.time / total.data()[0].time) * 100) >= 20 && ((d.time / total.data()[0].time) * 100) <= 40) {
                        return 4;
                    }
                })
                .attr("fill", "orange")
                .attr("stroke", "steelblue")
                .attr("stroke-width", function (d) {
                    if (d._children) {
                        return "3px";
                    } else {
                        return "2px";
                    }
                });

            nodeEnter.append("rect")
                .attr("width", function (d) {
                    if (((d.time / total.data()[0].time) * 100) >= 40 && ((d.time / total.data()[0].time) * 100) <= 60) {
                        return 12;
                    } else if (((d.time / total.data()[0].time) * 100) >= 60 && ((d.time / total.data()[0].time) * 100) <= 80) {
                        return 15;
                    } else if (((d.time / total.data()[0].time) * 100) >= 80 && ((d.time / total.data()[0].time) * 100) <= 100) {
                        return 18;
                    }
                })
                .attr("height", function (d) {
                    if (((d.time / total.data()[0].time) * 100) >= 40 && ((d.time / total.data()[0].time) * 100) <= 60) {
                        return 12;
                    } else if (((d.time / total.data()[0].time) * 100) >= 60 && ((d.time / total.data()[0].time) * 100) <= 80) {
                        return 15;
                    } else if (((d.time / total.data()[0].time) * 100) >= 80 && ((d.time / total.data()[0].time) * 100) <= 100) {
                        return 18;
                    }
                })
                .attr("x", function (d) {
                    if (((d.time / total.data()[0].time) * 100) >= 40 && ((d.time / total.data()[0].time) * 100) <= 60) {
                        return -6;
                    } else if (((d.time / total.data()[0].time) * 100) >= 60 && ((d.time / total.data()[0].time) * 100) <= 80) {
                        return -9;
                    } else if (((d.time / total.data()[0].time) * 100) >= 80 && ((d.time / total.data()[0].time) * 100) <= 100) {
                        return -9;
                    }
                })
                .attr("y", function (d) {
                    if (((d.time / total.data()[0].time) * 100) >= 40 && ((d.time / total.data()[0].time) * 100) <= 60) {
                        return -6;
                    } else if (((d.time / total.data()[0].time) * 100) >= 60 && ((d.time / total.data()[0].time) * 100) <= 80) {
                        return -9;
                    } else if (((d.time / total.data()[0].time) * 100) >= 80 && ((d.time / total.data()[0].time) * 100) <= 100) {
                        return -12;
                    }
                })
                .attr("fill", "red")
                .attr("stroke", "steelblue")
                .attr("stroke-width", function (d) {
                    if (d._children) {
                        return "3px";
                    } else {
                        return "2px";
                    }
                });

            nodeEnter.append("text")
                .attr("x", function (d) {
                    return d.children || d._children ? -10 : 10;
                })
                .attr("dy", ".35em")
                .attr("text-anchor", function (d) {
                    return d.children || d._children ? "end" : "start";
                })
                .text(function (d) {
                    var str = d.name;
                    var res = str.split(" ", 1);
                    return res;
                })
                .style("fill-opacity", 1e-6);

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function (d) {
                    return "translate(" + d.y + "," + d.x + ")";
                });

            nodeUpdate.select("circle")
                .attr("r", function (d) {
                    if (((d.time / total.data()[0].time) * 100) <= 20) {
                        return 4.5;
                    }
                })
                .attr("fill", "white")
                .attr("stroke", "steelblue")
                .attr("stroke-width", function (d) {
                    if (d._children) {
                        return "3px";
                    } else {
                        return "2px";
                    }
                });

            nodeUpdate.select("ellipse")
                .attr("rx", function (d) {
                    if (((d.time / total.data()[0].time) * 100) >= 20 && ((d.time / total.data()[0].time) * 100) <= 40) {
                        return 8;
                    }
                })
                .attr("ry", function (d) {
                    if (((d.time / total.data()[0].time) * 100) >= 20 && ((d.time / total.data()[0].time) * 100) <= 40) {
                        return 4;
                    }
                })
                .attr("fill", "orange")
                .attr("stroke", "steelblue")
                .attr("stroke-width", function (d) {
                    if (d._children) {
                        return "3px";
                    } else {
                        return "2px";
                    }
                });

            nodeUpdate.select("rect")
                .attr("width", function (d) {
                    if (((d.time / total.data()[0].time) * 100) >= 40 && ((d.time / total.data()[0].time) * 100) <= 60) {
                        return 12;
                    } else if (((d.time / total.data()[0].time) * 100) >= 60 && ((d.time / total.data()[0].time) * 100) <= 80) {
                        return 15;
                    } else if (((d.time / total.data()[0].time) * 100) >= 80 && ((d.time / total.data()[0].time) * 100) <= 100) {
                        return 18;
                    }
                })
                .attr("height", function (d) {
                    if (((d.time / total.data()[0].time) * 100) >= 40 && ((d.time / total.data()[0].time) * 100) <= 60) {
                        return 12;
                    } else if (((d.time / total.data()[0].time) * 100) >= 60 && ((d.time / total.data()[0].time) * 100) <= 80) {
                        return 15;
                    } else if (((d.time / total.data()[0].time) * 100) >= 80 && ((d.time / total.data()[0].time) * 100) <= 100) {
                        return 18;
                    }
                })
                .attr("x", function (d) {
                    if (((d.time / total.data()[0].time) * 100) >= 40 && ((d.time / total.data()[0].time) * 100) <= 60) {
                        return -6;
                    } else if (((d.time / total.data()[0].time) * 100) >= 60 && ((d.time / total.data()[0].time) * 100) <= 80) {
                        return -9;
                    } else if (((d.time / total.data()[0].time) * 100) >= 80 && ((d.time / total.data()[0].time) * 100) <= 100) {
                        return -9;
                    }
                })
                .attr("y", function (d) {
                    if (((d.time / total.data()[0].time) * 100) >= 40 && ((d.time / total.data()[0].time) * 100) <= 60) {
                        return -6;
                    } else if (((d.time / total.data()[0].time) * 100) >= 60 && ((d.time / total.data()[0].time) * 100) <= 80) {
                        return -9;
                    } else if (((d.time / total.data()[0].time) * 100) >= 80 && ((d.time / total.data()[0].time) * 100) <= 100) {
                        return -12;
                    }
                })
                .attr("fill", "red")
                .attr("stroke", "steelblue")
                .attr("stroke-width", function (d) {
                    if (d._children) {
                        return "3px";
                    } else {
                        return "2px";
                    }
                });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function (d) {
                    return "translate(" + source.y + "," + source.x + ")";
                })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1e-6);

            // Update the links…
            var link = svg.selectAll("path.link")
                .data(links, function (d) {
                    return d.target.id;
                });

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function (d) {
                    var o = {
                        x: source.x0,
                        y: source.y0
                    };
                    return diagonal({
                        source: o,
                        target: o
                    });
                });

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function (d) {
                    var o = {
                        x: source.x,
                        y: source.y
                    };
                    return diagonal({
                        source: o,
                        target: o
                    });
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });

        }

        // Toggle children on click.
        function click(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            update(d);
        }

        d3.helper = {};

        d3.helper.tooltip = function () {
            var tooltipDiv;
            var bodyNode = d3.select('body').node();
            var attrs = {};
            var text = '';
            var styles = {};

            function tooltip(selection) {

                selection.on('mouseover.tooltip', function (pD, pI) {
                        var name, value;
                        // Clean up lost tooltips
                        d3.select('body').selectAll('div.tooltip').remove();
                        // Append tooltip
                        tooltipDiv = d3.select('body').append('div').attr('class', 'tooltip');
                        tooltipDiv.attr(attrs);
                        //tooltipDiv.style(styles);
                        var absoluteMousePos = d3.mouse(bodyNode);
                        tooltipDiv.style({
                            left: (absoluteMousePos[0] + 30) + 'px',
                            top: (absoluteMousePos[1] - 15) + 'px',
                            position: 'absolute',
                            'z-index': 1001
                        });
                        // Add text using the accessor function, Crop text arbitrarily
                        tooltipDiv.style('width', function (d, i) {
                                return (text(pD, pI).length > 80) ? '300px' : null;
                            })
                            .html(function (d, i) {
                                return text(pD, pI);
                            });
                    })
                    .on('mousemove.tooltip', function (pD, pI) {
                        // Move tooltip
                        var absoluteMousePos = d3.mouse(bodyNode);
                        tooltipDiv.style({
                            left: (absoluteMousePos[0] + 30) + 'px',
                            top: (absoluteMousePos[1] - 15) + 'px'
                        });
                        // Keep updating the text, it could change according to position
                        tooltipDiv.html(function (d, i) {
                            return text(pD, pI);
                        });
                    })
                    .on('mouseout.tooltip', function (pD, pI) {
                        // Remove tooltip
                        tooltipDiv.remove();
                    });

            }

            tooltip.attr = function (_x) {
                if (!arguments.length) return attrs;
                attrs = _x;
                return this;
            };

            tooltip.style = function (_x) {
                if (!arguments.length) return styles;
                styles = _x;
                return this;
            };

            tooltip.text = function (_x) {
                if (!arguments.length) return text;
                text = d3.functor(_x);
                return this;
            };
            return tooltip;
        };
    }
}

export default TreeGraph;