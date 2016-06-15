import { presentation10 as COLORS } from './palettes'; 

const L_TH = 64;

// Start: Adapted from https://github.com/MoOx/color-convert
// MIT : https://github.com/MoOx/color-convert/blob/master/LICENSE
// Copyright (c) 2011 Heather Arthur <fayearthur@gmail.com>

function rgb2xyz(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255;

  // assume sRGB
  r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
  g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
  b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

  var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
  var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
  var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

  return [x * 100, y *100, z * 100];
}

function rgb2lab(rgb) {
  var xyz = rgb2xyz(rgb),
        x = xyz[0],
        y = xyz[1],
        z = xyz[2],
        l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return [l, a, b];
}

function lab2xyz(lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;
	var y2;

	if (l <= 8) {
		y = (l * 100) / 903.3;
		y2 = (7.787 * (y / 100)) + (16 / 116);
	} else {
		y = 100 * Math.pow((l + 16) / 116, 3);
		y2 = Math.pow(y / 100, 1 / 3);
	}

	x = x / 95.047 <= 0.008856
		? x = (95.047 * ((a / 500) + y2 - (16 / 116))) / 7.787
		: 95.047 * Math.pow((a / 500) + y2, 3);
	z = z / 108.883 <= 0.008859
		? z = (108.883 * (y2 - (b / 200) - (16 / 116))) / 7.787
		: 108.883 * Math.pow(y2 - (b / 200), 3);

	return [x, y, z];
}

function xyz2rgb(xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r *= 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g *= 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b *= 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
}

function lab2rgb(lab) {
  return xyz2rgb(lab2xyz(lab)).map((c) => Math.round(c));
}

// End : Adapted from https://github.com/MoOx/color-convert

function rgbToHex(hex) {
  return '#' + hex[0].toString(16) + '' + hex[1].toString(16) + '' + hex[2].toString(16);
}

function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    // console.log('Could not parse color', hex);
    return [0, 0, 0];
  }
  return [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ];
}

function encode(s) {
  if (typeof s === 'string' || s instanceof String) {
    return Math.abs(s.split('').reduce((a,b) => { a=((a<<5)-a)+b.charCodeAt(0); return a&a }, 0));  
  } 
  return null;           
}

function transformLighness(c, v) {
  if (typeof c === 'string' || c instanceof String) {
    c = hexToRgb(c);
  }
  var lab = rgb2lab(c);
  lab[0] = lab[0] * v;
  return lab2rgb(lab);
}

var Transform = {
  lightness: transformLighness,
  light: (c) => rgbToHex(transformLighness(c, 1.6)),
  medium: (c) => rgbToHex(transformLighness(c, 1.3))
};

var Contrasts = {
  // Check the colour supplied can have white text
  // composited on top with the required contrast for reading
  white: function(c) {
    if (typeof c === 'string' || c instanceof String) {
      c = hexToRgb(c);
    }
    var lab = rgb2lab(c);
    return (lab[0] < L_TH);
  }
}

var Sort = {
  lightness: function(colors) {
    var lab = colors.map(function(c) {
      var a = c;
      if (!Array.isArray(c)) {
        a = hexToRgb(c);
      }
      
      return [rgb2lab(a), c];
    });
    
    var sort = lab.sort(function(a, b) {
      if (a[0][0] < b[0][0]) return -1;
      if (a[0][0] > b[0][0]) return -1;
      return 0;
    });
    
    return sort.map(function (a) { return a[1]; });
  }
}

// -------------------- Start exports -------------------------

export { 
  Transform as transform,
  Contrasts as contrasts,
  Sort as sort
}

// Random color from theme, optionally derived from the input 's'
export function random(palette) {
  return function _random(s) {
    var hash = encode(s);
    if (hash == null) {
      hash = Math.floor(Math.random() * palette.length);
    } else {
      hash = hash % palette.length;
    }
    
    return palette[hash];
  }
}



