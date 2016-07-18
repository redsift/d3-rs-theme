import { display, brand } from './palettes'

let COUNT = 1;

function scaffold(id, onetime, dynamic, transitions) {
    function _impl(context) {
        let selection = context.selection ? context.selection() : context,
            transition = (context.selection !== undefined);

        let defs = selection.select('defs');
        if (defs.empty()) {
            defs = selection.append('defs');
        }
        
        let filter = defs.select(_impl.self());
        if (filter.empty()) {
            filter = defs.append('filter')
                        .attr('filterUnits', 'objectBoundingBox')
                        .attr('x', '0%')
                        .attr('y', '0%')
                        .attr('width', '100%')
                        .attr('height', '100%')
                        .attr('id', id);

            onetime(filter);
        }        
        
        dynamic(filter);

        if (transition === true) {
            filter = filter.transition(context);
        }
        
        transitions(filter);
    }

    _impl.id = () => id;
    _impl.self = () => `#${id}`;
    
    // .url() can be used with filter on a SVG component
    _impl.url = () => `url(#${id})`;
    
    // .css() can be used with style on a SVG component
    _impl.css = () => `fill: ${_impl.url()};`;

    return _impl;
}

export function shadow(id) {
    
    let morphRadius = 1,
        color = display.light.shadow,
        blurRadius = 3,
        padding = "10";
    
    if (id == null) {
        id = 'filter-shadow-' + COUNT;
        COUNT++;
    }
    
    let _impl = scaffold(id, 
    function onetime(filter) {
        filter.append('feMorphology')
            .attr('operator', 'dilate')
            .attr('in', 'SourceAlpha')
            .attr('result', 'TEMPLATE');

        filter.append('feFlood')
                .attr('result', 'COLOUR');

        filter.append('feComposite')
            .attr('in', 'COLOUR')
            .attr('in2', 'TEMPLATE')
            .attr('operator', 'in')
            .attr('result', 'TEMPLATE_COLOUR');

        filter.append('feGaussianBlur')
            .attr('result', 'BG');
        
        let merge = filter.append('feMerge');
        merge.append('feMergeNode').attr('in', 'BG');
        merge.append('feMergeNode').attr('in', 'SourceGraphic');
    },
    function dynamic(filter) {
        filter
            .attr('x', '-' + padding + '%')
            .attr('y', '-' + padding + '%')
            .attr('width', (2*padding + 100) + '%')
            .attr('height', (2*padding + 100) + '%');
    },
    function transition(filter) {
        filter.select('feMorphology')    
            .attr('radius', morphRadius);

        filter.select('feFlood')    
            .attr('flood-color', color)

        filter.select('feGaussianBlur')
            .attr('stdDeviation', blurRadius);
    });

    
    _impl.morphRadius = function(value) {
        return arguments.length ? (morphRadius = value, _impl) : morphRadius;
    };
    
    _impl.color = function(value) {
        return arguments.length ? (color = value, _impl) : color;
    };
    
    _impl.blurRadius = function(value) {
        return arguments.length ? (blurRadius = value, _impl) : blurRadius;
    };
    
    _impl.padding = function(value) {
        return arguments.length ? (padding = value, _impl) : padding;
    };                  

    return _impl;
}

export function greyscale(id) { 
    let strength = 1.0;

    if (id == null) {
        id = 'filter-greyscale-' + COUNT;
        COUNT++;
    }

    let _impl = scaffold(id, 
    function onetime(filter) {
        filter.append('feColorMatrix')
                .attr('type', 'matrix');
    },
    function dynamic() {

    },
    function transition(filter) {
        const s = (1.0 / 3.0);

        let o = s * strength;
        let d = 1.0 - 2*o;

        filter.select('feColorMatrix')
                .attr('values', `${d} ${o} ${o} 0 0 ` +
                                `${o} ${d} ${o} 0 0 ` +
                                `${o} ${o} ${d} 0 0 ` +
                                `0 0 0 1 0`);
    });

    _impl.strength = function(v) { 
        return arguments.length ? (strength = v, _impl) : strength; 
    }

    return _impl;
}

export function emboss(id) { 
    let color = brand.standard[brand.names.grey],
        blur = 0.6,
        sharpness = -0.1,
        strength = 0.8;

    if (id == null) {
        id = 'filter-emboss-' + COUNT;
        COUNT++;
    }

    let _impl = scaffold(id, 
    function onetime(filter) {
        filter.append('feColorMatrix')
                .attr('type', 'matrix')
                .attr('values', `0.3333 0.3333 0.3333 0 0 ` +
                                `0.3333 0.3333 0.3333 0 0 ` +
                                `0.3333 0.3333 0.3333 0 0 ` +
                                `0 0 0 1 0`);
        
        let transfer = filter.append('feComponentTransfer');
        [ 'feFuncR', 'feFuncG', 'feFuncB' ].forEach(function (ch) {
            transfer.append(ch)
                    .attr('type', 'discrete')
                    .attr('tableValues', `0.0 0.08 0.75 1.0`);
        });
    
        filter.append('feGaussianBlur')
                .attr('stdDeviation', blur);

        filter.append('feComponentTransfer')
                .append('feFuncA')
                    .attr('type', 'discrete');

        filter.append('feConvolveMatrix')
                .attr('result', 'SHARP')
                .attr('order', '3, 3')
                .attr('preserveAlpha', true)
                .attr('kernelMatrix', ` 1 -1  1 ` +
                                      `-1  ${sharpness} -1 ` +
                                      ` 1 -1  1`);

        filter.append('feFlood')
                .attr('rect', '')
                .attr('x', '0%')
                .attr('y', '0%')
                .attr('width', '100%')
                .attr('height', '100%')
                .attr('result', 'FILL');

        filter.append('feBlend')
                .attr('in', 'SHARP')
                .attr('in2', 'FILL')
                .attr('mode', 'multiply');
    },
    function dynamic() {

    },
    function transition(filter) {
        filter.select('feFlood').attr('flood-color', color);
        filter.select('feFuncA').attr('tableValues', `0.0 ${strength}`);
    });

    _impl.color = function(v) { 
        return arguments.length ? (color = v, _impl) : color; 
    }

    _impl.strength = function(v) { 
        return arguments.length ? (strength = v, _impl) : strength; 
    }

    return _impl;
}