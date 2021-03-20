
var sortedCities = cityGrowths.sort((a,b) => a.Increase_from_2016-b.Increase_from_2016).reverse();

var top5Cities = sortedCities.slice(0,5);

var top5CityNames = top5Cities.map(city => city.City);
var top5CityGrowths = top5Cities.map(city => parseInt(city.Increase_from_2016));

var trace = {
    x: top5CityNames,
    y: top5CityGrowths,
    type: 'bar'
};

var layout = {
    title: 'Most rapidly growing cities',
    x: {title: 'city'},
    y: {title: 'Population growth: 2016-17'}
};

var data = [trace];

Plotly.newPlot('bar-plot',data,layout,{responsive:true});
