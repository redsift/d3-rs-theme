// Informed by the Cagatay Demiralp paper, grey is moved around to break
// brown and red in this color scheme

const presentation10dark = [ 
    '#00ce5c', // Green
    '#d800a2', // Pink          
    '#00d9d2', // Aqua     
    '#AF5100', // Brown         
    '#bfbfbf', // Grey   
    '#DE0000', // Red     
    '#F0DE00', // Yellow           
    '#9200ff', // Purple      
    '#ED9200', // Orange     
    '#00aeff' // Blue 
];

const presentation10std = [ 
   
    '#56d58e', // Green
    '#d95cba', // Pink          
    '#63eae4', // Aqua     
    '#C78348', // Brown         
    '#d6d6d6', // Grey 
    '#E06363', // Red     
    '#FFF741', // Yellow           
    '#965ede', // Purple      
    '#FCBB54', // Orange  
    '#73c5eb' // Blue 
];

const presentation10light = [ 
    '#a5e6c3', // Green
    '#eda3da', // Pink          
    '#9af8f4', // Aqua     
    '#EDC19C', // Brown         
    '#e5e5e5', // Grey 
    '#F5AAAA', // Red     
    '#F7EFC3', // Yellow           
    '#c6a8ef', // Purple      
    '#F8D296', // Orange     
    '#addbf0' // Blue 
];

const names10 = {
    green:  0,
    pink:   1,
    aqua:   2,        
    brown:  3,
    grey:   4,
    red:    5,
    yellow: 6,
    purple: 7,
    orange: 8,
    blue:   9
}

export const presentation10 = {
    standard: presentation10std,
    darker: presentation10dark,
    lighter: presentation10light,
    names: names10    
}

const brandstd = [
    '#e11010', // red
    '#0ab93a', // green
    '#1671f4', // blue
    '#cacaca'  // grey
]

const branddark = [
    '#6a0000', // red
    '#087927', // green
    '#0b49a2', // blue
    '#828282'  // grey
]

const namesbrand = {
    red:    0,
    green:  1,
    blue:   2,        
    grey:   3
}

export const brand = { 
    standard: brandstd, 
    darker: branddark,
    names: namesbrand 
} 

export const themes = [ 'light', 'dark' ];   

export const display = { 
    light : {
        background: '#ffffff',
        text: '#262626',
        axis: '#262626',
        grid: '#e0e0e0',
        highlight: 'rgba(127,127,127,0.3)',
        shadow: 'rgba(127,127,127,0.4)',
        fillOpacity: 0.33
    },
    dark : {
        background: '#333333',    
        text: '#ffffff',
        axis: '#ffffff',
        grid: '#6d6d6d',
        highlight: 'rgba(127,127,127,0.5)',
        shadow: 'rgba(255,255,255,0.4)',
        fillOpacity: 0.33      
    }
};
