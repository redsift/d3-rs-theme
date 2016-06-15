# d3-rs-theme

`d3-rs-theme` color and theme support for charts.

## Builds

[![Circle CI](https://circleci.com/gh/Redsift/d3-rs-theme.svg?style=svg)](https://circleci.com/gh/Redsift/d3-rs-theme)

## Example

[View @redsift/d3-rs-theme on Codepen](https://....)

### Color palette

![Color palette for charts](https://raw.githubusercontent.com/Redsift/d3-rs-theme/master/readme/palettes.png)

Primary use for this package is central access to the Red Sift presentation color scheme.

The colors above represent the `d3_rs_theme.presentation10` arrays which is a ordinal color scale. The entries should be used in sequence as they are arranged to provide distinctive contrasts. The primary theme and the one that should be used normally is the `standard` scale at `d3_rs_theme.presentation10.standard`. `d3_rs_theme.presentation10.dark` and `d3_rs_theme.presentation10.light` variations are also provided if options are required. A helper map is also provided at `d3_rs_theme.presentation10.names` to access the index values of colors by name.

    // Example browser usage
    let siftBlue = d3_rs_theme.presentation10.standard[d3_rs_theme.presentation10.names.blue];
	// siftBlue is the string #73c5eb

### Patterns

![Patterns for charts](https://raw.githubusercontent.com/Redsift/d3-rs-theme/master/readme/patterns.png)

In addition to colors, the theme module has build in generators for SVG patterns that can be combined with the colors. The patterns are packaged using the reusable chart convention and can be applied by injecting them into the parent SVG and referencing them when required.

	// typically use the first pattern, diagonal1
	let pattern = d3_rs_theme.diagonals('optional-name', d3_rs_theme.patterns.diagonal1);
	
	// set the foreground to the standard color
	pattern.foreground(d3_rs_theme.presentation10.standard[d3_rs_theme.presentation10.names.blue]);
	
	// set the background to the light variant
	pattern.background(d3_rs_theme.presentation10.light[d3_rs_theme.presentation10.names.blue]);
	
	// add the pattern to the svg (here svg is from d3-rs-svg)
	d3.select('body').call(svg).call(pattern)
	
	.....
	
	// get the reference for the fill
	.append('rect').attr('fill', pattern.url());
	
### Animations

![Curves for charts](https://raw.githubusercontent.com/Redsift/d3-rs-theme/master/readme/curves.gif)

A custom easing function is provided to animate transitions. This is primarily for motion as opposed to fades or other transitions.

	// set the x value on the rect using the custom duration and easing
	rect.transition().duration(d3_rs_theme.duration).ease(d3_rs_theme.easing()).attr('x', newValue);

### Other tools

You can create a theme shadow for SVG elements using `d3_rs_theme.shadow()` in a manner similar to patterns.

Check text color legibility using the `d3_rs_theme.contrasts.white()` function. It will return false if the color provided will not provide adequate contrast with white text.

	// fill with white or black text depending on the value of color
        let t = d3_rs_theme.contrasts.white(color) ? d3_rs_theme.display.text.white : d3_rs_theme.display.text.black;        
        text.attr('fill', t);

## Acknowledgements

This uses code from https://github.com/MoOx/color-convert under MIT

This uses thinking from http://hci.stanford.edu/~cagatay/projects/pk/perceptual-kernels.pdf
