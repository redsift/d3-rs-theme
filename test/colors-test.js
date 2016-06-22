var tape = require("tape"),
    colors = require("../");

/*
var A = [ 31, 119, 180 ];
var AM = [ 114, 158, 206 ];
var AL = [ 174, 199, 232 ];
console.log(colors);
*/

tape("lightness() generates the same rbg at 1.0", function(t) {
    var A = [ 31, 119, 180 ];
    
    aStar = colors.transform.lightness(A, 1.0);
    t.deepEqual(A, aStar);    
    t.end();    
});   

tape("lightness() generates different rbg at 1.1", function(t) {
    var A = [ 31, 119, 180 ];
    
    aStar = colors.transform.lightness(A, 1.1);
    t.notDeepEqual(A, aStar);    
    t.end();    
});   


tape("random() generates different bg", function(t) {
   var rnd = colors.random(colors.presentation10.standard);
   
    var one = rnd();
    var two = rnd();
    
    t.notEqual(one, two);    
    t.end();    
});   

tape("random() generates same bg", function(t) {
    var rnd = colors.random(colors.presentation10.standard);
    var VAL = 'some long string';
    var one = rnd(VAL);
    var two = rnd(VAL);
    
    t.equal(one, two);    
    t.end();    
}); 

tape("contrasts() correct for the obvious ones", function(t) {
    
    t.equal(true, colors.contrasts.white('#000'));    
    t.equal(false, colors.contrasts.white('#fff'));  
    
    t.end();    
});

tape("random() generates same bg for a number", function(t) {
    var rnd = colors.random(colors.presentation10.standard);
    var VAL = 1;
    var one = rnd(VAL);
    var two = rnd(VAL);
    
    t.equal(one, two);    
    t.end();    
}); 