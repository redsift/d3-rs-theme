export function shadow(defs, fname, morphRadius, shadowColour, blurRadius, padding) {
    if (morphRadius === undefined) {
        morphRadius = 1;
    }
    if (shadowColour === undefined) {
        shadowColour = 'rgba(230,230,230,0.6)';
    }

    if (blurRadius === undefined) {
        blurRadius = 1.1;
    }

    if (padding === undefined) {
        padding = "10px";
    }

    let filter = defs
        .append("filter")
        .attr("id", fname)
        .attr("x", "-" + padding)
        .attr("y", "-" + padding)
        .attr("width", "120")
        .attr("height", "120");

    filter.append("feMorphology")
        .attr('operator', 'dilate')
        .attr('radius', morphRadius)
        .attr('in', 'SourceAlpha')
        .attr('result', 'TEMPLATE');

    filter.append('feFlood')
        .attr('flood-color', shadowColour)
        .attr('result', 'COLOUR');

    filter.append('feComposite')
        .attr('in', "COLOUR")
        .attr('in2', "TEMPLATE")
        .attr('operator', "in")
        .attr('result', 'TEMPLATE_COLOUR');

    filter.append('feGaussianBlur')
        .attr('stdDeviation', blurRadius)
        .attr('result', 'BG');

    let merge = filter.append('feMerge');
    merge.append('feMergeNode').attr('in', "BG");
    merge.append('feMergeNode').attr('in', "SourceGraphic");
}