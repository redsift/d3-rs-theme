
export const angle = 33.75;

export const patterns = {
    crosshatch1: { ang: 45, w: 4, h: 4, s: 5 },
    crosshatch2: { ang: 45, w: 3, h: 4, s: 5 },
    crosshatch3: { ang: 45, w: 3, h: 3, s: 5 },
    diagonal1: { ang: angle, w: 5, h: 4, s: 5 },
    diagonal2: { ang: angle, w: 5, h: 3, s: 5 },
    diagonal3: { ang: angle, w: 5, h: 2, s: 5 },
    blocks: { ang: 0, w: 3, h: 4, s: 5 },
    redsift: { ang: angle, w: 3, h: 3, s: 5 }
}

export function diagonals(defs, id, ang, w, h, s) {
    if (ang == null) {
        ang = 45;
    } else if (typeof ang  === 'object') {
        s = ang.s;
        w = ang.w;
        h = ang.h;
        ang = ang.ang;
    }
    if (w === undefined) {
        w = 3;
    }
    if (h === undefined) {
        h = 3;
    }
    if (s === undefined) {
        s = 4;
    }
    let p = defs.append('pattern')
            .attr('id', id)
            .attr('width', s)
            .attr('height', s)
            .attr('patternUnits', 'userSpaceOnUse')
            .attr('patternTransform', 'rotate('+ ang + ')');

    p.append('rect')
            .attr('class', 'background')
            .attr('width', s)
            .attr('height', s);

    p.append('rect')
            .attr('class', 'foreground')
            .attr('width', w)
            .attr('height', h)
            .attr('transform', 'translate(0,0)');

    return p;
}