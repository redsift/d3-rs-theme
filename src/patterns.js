import { display } from './palettes'

export const angle = 33.75;

export const patterns = {
    diagonal1: { angle: angle, width: 5, height: 4, size: 5 },
    diagonal2: { angle: angle, width: 5, height: 2, size: 5 },
    diagonal3: { angle: angle, width: 5, height: 3, size: 5 },
    crosshatch1: { angle: 45, width: 4, height: 4, size: 5 },
    crosshatch2: { angle: 45, width: 3, height: 4, size: 5 },
    crosshatch3: { angle: 45, width: 3, height: 3, size: 5 },
    blocks: { angle: 0, width: 3, height: 4, size: 5 },
    redsift: { angle: angle, width: 3, height: 3, size: 5 }
}

let COUNT = 1;

export function highlights(id) {

    const sz = 8, // size of pattern
          a = 45, // angle of pattern
          sq = 5; // size of square

    const o = (sz - sq) / 2;
    const s = 2 * Math.sqrt(sz);

    let background = 'transparent',
        foreground = display.light.highlight;
    
    if (id == null) {
        id = 'pattern-diagonals-' + COUNT;
        COUNT++;
    }
            
    function _impl(context) {
        let selection = context.selection ? context.selection() : context;
        
        let defs = selection.select('defs');
        if (defs.empty()) {
            defs = selection.append('defs');
        }
        
        let inner = `${id}-inner`;

        let pinner = defs.select(`#${inner}`);
        if (pinner.empty()) {
            pinner = defs.append('pattern')
                    .attr('id', inner)
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('patternUnits', 'userSpaceOnUse');    
            
            pinner.append('rect');
        }

        pinner.attr('width', sz)
                .attr('height', sz)
                .attr('patternTransform', `rotate(${a})`);
        
        pinner.select('rect')
                .attr('x', o)
                .attr('y', o)
                .attr('width', sq)
                .attr('height', sq)
                .attr('fill', foreground);

        let pattern = defs.select(_impl.self());
        if (pattern.empty()) {
            pattern = defs.append('pattern')
                    .attr('id', id)
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', '100%')
                    .attr('height', '100%')
                    .attr('patternUnits', 'objectBoundingBox');    
            
            pattern.append('rect')
                    .attr('class', 'pattern-background')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', '100%')
                    .attr('height', '100%');

            pattern.append('rect')
                    .attr('class', 'pattern-foreground')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', '100%')
                    .attr('height', '100%')
                    .attr('fill', `url(#${inner})`)
        }

        pattern.select('rect.pattern-background').attr('fill', background);
    }

    _impl.id = () => id;
    _impl.self = () => `#${id}`;
    _impl.size = () => s;
    _impl.align = (v) => Math.round(s * Math.ceil(v / s));

    // .url() can be used with filter on a SVG component
    _impl.url = () => `url(#${id})`;
    
    // .css() can be used with style on a SVG component
    _impl.css = () => `fill: ${_impl.url()};`;

    _impl.foreground = function(value) {
        return arguments.length ? (foreground = value, _impl) : foreground;
    };
    
    _impl.background = function(value) {
        return arguments.length ? (background = value, _impl) : background;
    };        
                 
    return _impl;    

}

export function diagonals(id, opts) {
    if (opts == null) opts = {};
    
    let s = opts.size || 4;
    let w = opts.width || 3;
    let h = opts.height || 3;
    let a = opts.angle || 45;
    
    let background = 'transparent',
        foreground = display.light.highlight;
    
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
                .attr('class', 'pattern-background');
            
            pattern.append('rect')
                .attr('class', 'pattern-foreground');                        
        }
        pattern.attr('width', s)
                .attr('height', s)
                .attr('patternTransform', `translate(${w*Math.sin(a * (Math.PI / 180))},0),rotate(${a})`); // translation ensure rects are correct

        pattern.select('rect.pattern-background')
                .attr('width', s)
                .attr('height', s)
                .attr('fill', background);

        pattern.select('rect.pattern-foreground')
                .attr('width', w)
                .attr('height', h)
                .attr('fill', foreground);
    }
    
    _impl.id = () => id;
    _impl.self = () => `#${id}`;
    
    // .url() can be used with filter on a SVG component
    _impl.url = () => `url(#${id})`;
    
    // .css() can be used with style on a SVG component
    _impl.css = () => `fill: ${_impl.url()};`;
    
    _impl.size = function(value) {
        return arguments.length ? (s = value, _impl) : s;
    };     
      
    _impl.width = function(value) {
        return arguments.length ? (w = value, _impl) : w;
    };
     
    _impl.height = function(value) {
        return arguments.length ? (h = value, _impl) : h;
    };
     
    _impl.angle = function(value) {
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