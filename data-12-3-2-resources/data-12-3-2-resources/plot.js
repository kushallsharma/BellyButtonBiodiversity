// d3.json("samples.json").then(function(data){
//     console.log(data);
// });

// d3.json("samples.json").then(function(data){
//     wfreq = data.metadata.map(person =>
// person.wfreq).sort((a,b) => b - a);
//     console.log(wfreq);
// });


d3.json("samples.json").then(function(data){
    // var firstPerson = data.metadata.filter(id => id.id == 940)
    var firstPerson = data.metadata[0]
    console.log(firstPerson)
    console.log(Object.entries(firstPerson));
    
    Object.entries(firstPerson).forEach(([a,b]) => console.log(a +"  "+b));
});