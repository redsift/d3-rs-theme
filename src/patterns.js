
export const angle = 33.75;

export const patterns = {
    diagonal1: { a: angle, w: 5, h: 4, s: 5 },
    diagonal2: { a: angle, w: 5, h: 2, s: 5 },
    diagonal3: { a: angle, w: 5, h: 3, s: 5 },
    crosshatch1: { a: 45, w: 4, h: 4, s: 5 },
    crosshatch2: { a: 45, w: 3, h: 4, s: 5 },
    crosshatch3: { a: 45, w: 3, h: 3, s: 5 },
    blocks: { a: 0, w: 3, h: 4, s: 5 },
    redsift: { a: angle, w: 3, h: 3, s: 5 }
}

let COUNT = 1;

export function diagonals(id, opts) {
    if (opts == null) opts = {};
    
    let s = opts.s || 4;
    let w = opts.w || 3;
    let h = opts.h || 3;
    let a = opts.a || 45;
    
    let background = 'transparent',
        foreground = 'rgba(0,0,0,0.1)';
    
    if (id == null) {
        id = 'pattern-diagonals-' + COUNT;
        COUNT++;
    }
        
    function _impl(context) {
        var selection = context.selection ? context.selection() : context;
        
        var defs = selection.select('defs');
        if (defs.empty()) {
            defs = selection.append('defs');
        }
        
        let pattern = defs.select(_impl.self());
        if (pattern.empty()) {
            pattern = defs.append('pattern')
                    .attr('id', id)
                    .attr('patternUnits', 'userSpaceOnUse');    
                    
            pattern.append('rect')
                .attr('class', 'background');
            
            pattern.append('rect')
                .attr('class', 'foreground')
                .attr('transform', 'translate(0,0)');                        
        }
                                
        pattern.attr('width', s)
                .attr('height', s)
                .attr('patternTransform', 'rotate('+ a + ')');

        pattern.select('rect.background')
                .attr('width', s)
                .attr('height', s)
                .attr('fill', background);

        pattern.select('rect.foreground')
                .attr('width', w)
                .attr('height', h)
                .attr('fill', foreground);
    }
    
    _impl.id = function() {
        return id;
    };
    
    _impl.self = function() { return '#' + id; }
    
    // .url() can be used with filter on a SVG component
    _impl.url = function() { return 'url(#' + id + ')'; }
    
    // .css() can be used with style on a SVG component
    _impl.css = function() { return 'fill: ' + _impl.url() + ';'; }
    
    _impl.s = function(value) {
        return arguments.length ? (s = value, _impl) : s;
    };  
      
    _impl.w = function(value) {
        return arguments.length ? (w = value, _impl) : w;
    };
     
    _impl.h = function(value) {
        return arguments.length ? (h = value, _impl) : h;
    };
     
    _impl.a = function(value) {
        return arguments.length ? (a = value, _impl) : a;
    };
    
    _impl.foreground = function(value) {
        return arguments.length ? (foreground = value, _impl) : foreground;
    };
    
    _impl.background = function(value) {
        return arguments.length ? (background = value, _impl) : background;
    };        
                 
    return _impl;
}