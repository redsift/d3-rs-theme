let COUNT = 1;

export function shadow(id) {
    
    let morphRadius = 1,
        colour = 'rgba(127,127,127,0.4)',
        blurRadius = 3,
        padding = "10px",
        width = 100,
        height = 100;
    
    if (id == null) {
        id = 'filter-shadow-' + COUNT;
        COUNT++;
    }
    
    function _impl(context) {
        var selection = context.selection ? context.selection() : context;
        
        var defs = selection.select('defs');
        if (defs.empty()) {
            defs = selection.append('defs');
        }
        
        let filter = defs.select(_impl.self());
        if (filter.empty()) {
            filter = defs
                        .append('filter')
                        .attr('id', id);

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
        }        
        
        filter
            .attr('x', '-' + padding)
            .attr('y', '-' + padding)
            .attr('width', width)
            .attr('height', height);

        filter.select('feMorphology')    
            .attr('radius', morphRadius);

        filter.select('feFlood')    
            .attr('flood-color', colour)

        filter.select('feGaussianBlur')
            .attr('stdDeviation', blurRadius);
    }
    
    _impl.id = function() {
        return id;
    };
    
    _impl.self = function() { return '#' + id; }
    
    // .url() can be used with filter on a SVG component
    _impl.url = function() { return 'url(#' + id + ')'; }
    
    // .css() can be used with style on a SVG component
    _impl.css = function() { return 'filter: ' + _impl.url() + ';'; }
            
    _impl.morphRadius = function(value) {
        return arguments.length ? (morphRadius = value, _impl) : morphRadius;
    };
    
    _impl.colour = function(value) {
        return arguments.length ? (colour = value, _impl) : colour;
    };
    
    _impl.blurRadius = function(value) {
        return arguments.length ? (blurRadius = value, _impl) : blurRadius;
    };
    
    _impl.padding = function(value) {
        return arguments.length ? (padding = value, _impl) : padding;
    };                  

    _impl.width = function(value) {
        return arguments.length ? (width = value, _impl) : width;
    };    
    
    _impl.height = function(value) {
        return arguments.length ? (height = value, _impl) : height;
    };        
    
    return _impl;
}