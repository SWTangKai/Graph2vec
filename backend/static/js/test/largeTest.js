if (typeof APP === 'undefined') {
    APP = {};
}

APP.rotatingDonut = function () {
    'use strict';
    var o,
        local;

    o = {
        thickness: 0.4,
        value: null,
        color: null,
        key: null,
        sort: null
    };

    local = {
        label: d3.local(),
        dimensions: d3.local()
    };

    function donut(group) {
        group.each(render);
    }

    function render(data) {
        var context,
            dim,
            pie,
            arc,
            segments,
            segmentEnter;

        if (!data) {
            return;
        }

        context = d3.select(this);
        dim = getDimensions(context);

        pie = d3.pie()
            .value(o.value)
            .sort(null);

        arc = d3.arc()
            .outerRadius(dim.outerRadius)
            .innerRadius(dim.innerRadius);

        context.selectAll('svg')
            .data([pie(data.sort(o.sort))])
            .enter()
            .append('svg')
            .append('g')
            .attr('class', 'group')
            .append('text')
            .attr('class', 'donut-label')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle');

        context.selectAll('svg')
            .attr('width', dim.width)
            .attr('height', dim.height)
            .selectAll('g.group')
            .attr('transform', 'translate(' + dim.width / 2 + ',' + dim.height / 2 + ')');

        context.select('text.donut-label')
            .text(local.label.get(context.node()));

        segments = context.selectAll('svg')
            .select('g.group')
            .selectAll('path.segment')
            .data(Object, dataAccess('key'));

        segmentEnter = segments.enter()
            .append('path')
            .attr('class', 'segment')
            .attr('fill', dataAccess('color'));

        segmentEnter
            .merge(segments)
            .attr('d', arc);

        segments.exit()
            .remove();
    }

    function dataAccess(key) {
        return function (d) {
            return o[key](d.data);
        };
    }

    function getDimensions(context) {
        var thisDimensions = local.dimensions.get(context.node()) || {},
            width = thisDimensions.width || context.node().getBoundingClientRect().width,
            height = thisDimensions.height || context.node().getBoundingClientRect().height,
            outerRadius = Math.min(width, height) / 2,
            innerRadius = outerRadius * (1 - o.thickness);

        return {
            width: width,
            height: height,
            outerRadius: outerRadius,
            innerRadius: innerRadius
        };
    }

    donut.thickness = function (_) {
        if (!arguments.length) {
            return o.thickness;
        }
        o.thickness = _;
        return donut;
    };
    donut.value = function (_) {
        if (!arguments.length) {
            return o.value;
        }
        o.value = _;
        return donut;
    };
    donut.color = function (_) {
        if (!arguments.length) {
            return o.color;
        }
        o.color = _;
        return donut;
    };
    donut.key = function (_) {
        if (!arguments.length) {
            return o.key;
        }
        o.key = _;
        return donut;
    };
    donut.sort = function (_) {
        if (!arguments.length) {
            return o.sort;
        }
        o.sort = _;
        return donut;
    };

    donut.dimensions = function (context, _) {
        var returnArray;
        if (typeof _ === 'undefined') {
            returnArray = context.nodes()
                .map(function (node) {
                    return local.dimensions.get(node);
                });
            return context._groups[0] instanceof NodeList ? returnArray : returnArray[0];
        }
        context.each(function () {
            local.dimensions.set(this, _);
        });
        return donut;
    };
    donut.label = function (context, _) {
        var returnArray;
        if (typeof _ === 'undefined') {
            returnArray = context.nodes()
                .map(function (node) {
                    return local.label.get(node);
                });
            return context._groups[0] instanceof NodeList ? returnArray : returnArray[0];
        }
        context.each(function () {
            local.label.set(this, _);
        });
        return donut;
    };

    return donut;
};

APP.pieTransition = function () {
    var enteringSegments,
        transitioningSegments;

    var previousSegmentData = d3.local();

    var o = {
        arc: null,
        sort: null
    };

    var methods = {
        enter: function (transition) {
            transition
                .each(setEnterAngle)
                .call(render);
        },
        transition: render,
        exit: function (transition) {
            transition
                .each(setExitAngle)
                .call(render);
        }
    };

    function previousAdjacentAngle() {
        // returns angle of adjacent segment using previous data
    }

    function currentAdjacentAngle() {
        // returns angle of adjacent segment using current data
    }

    function updateNodes() {
        // update variables which need to be correct 
        // when previousAdjacentAngle or  currentAdjacentAngle is called
    }

    function setEnterAngle() {
        // set enter angle of the segments and 
        // bind the node's current data to the node using previousSegmentData
    }

    function setExitAngle(d) {
        // set exit angle of the segments
    }

    function render(transition) {
        transition.attrTween('d', arcTween);
    }

    function arcTween() {
        // return tweening function using interpolate()
    }

    function interpolate() {
        // return d3.interpolate between old data and new
    }

    methods.enteringSegments = function (_) {
        enteringSegments = _;
        updateNodes();
        return methods;
    };

    methods.transitioningSegments = function (_) {
        transitioningSegments = _;
        updateNodes();
        return methods;
    };

    methods.arc = // getter/setter;
        methods.sort = // getter/setter};

        return methods;
};


document.addEventListener('DOMContentLoader', () => {
    'use strict';
    const donut,
        events;

    function build() {
        donut = APP.rotatingDonut()
            .thickness(0.5)
            .value(function (d) {
                return d.value;
            })
            .color(function (d) {
                return d.color;
            })
            .key(function (d) {
                return d.id;
            })
            .sort(function (a, b) {
                return a.id - b.id;
            });
    }

    function addToDom() {
        d3.select('#donut1')
            .datum(APP.generateData())
            .call(donut.label, 'Smith')
            .call(donut);

        d3.select('#donut2')
            .datum(APP.generateData())
            .call(donut.label, 'Jones')
            .call(donut);
    }

    function addListeners() {
        d3.select('button').on('click', events.dataButtonClick);
        d3.selectAll('.donut-size').on('change', events.resizeSliderChange);
    }

    events = {
        dataButtonClick: function () {
            d3.select('#donut1')
                .datum(APP.generateData(true))
                .call(donut);

            d3.select('#donut2')
                .datum(APP.generateData(true))
                .call(donut);
        },

        resizeSliderChange: function () {
            const target = d3.select(this).attr('data-target'),
                value = this.value * 2;

            d3.selectAll(target)
                .call(donut.dimensions, {
                    width: value,
                    height: value
                })
                .call(donut)
                .style('width', value + 'px')
                .style('height', value + 'px');
        }
    };

    build();
    addToDom();
    addListeners();
})