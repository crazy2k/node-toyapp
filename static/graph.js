window.onload = function() {

var subjectsMap = {
    cbc: { name: 'CBC' },
    ana2: { name: 'Análisis II' },
    alg: { name: 'Álgebra' },
    proba: { name: 'Probabilidades y Estadística (C)' },
    algo1: { name: 'Algoritmos y Estructuras de Datos I' },
    algo2: { name: 'Algoritmos y Estructuras de Datos II' },
    algo3: { name: 'Algoritmos y Estructuras de Datos III' },
    orga1: { name: 'Organización del Computador I' },
    orga2: { name: 'Organización del Computador II' },
    ssoo: { name: 'Sistemas Operativos' },
    met: { name: 'Métodos Numéricos' },
    lyc: { name: 'Lógica y Computabilidad' },
    redes: { name: 'Teoría de las Comunicaciones' },
    ing1: { name: 'Ingeniería de Software I' },
    ing2: { name: 'Ingeniería de Software II' },
    bbdd: { name: 'Bases de Datos' },
    tdl: { name: 'Teoría de Lenguajes' },
    plp: { name: 'Paradigmas de Lenguajes de Programación' }
};

var subjectsList = [];
var code;
for (code in subjectsMap) {
    subjectsList.push(subjectsMap[code]);
}

var subjectsLinks = [
    ['cbc', 'ana2'],
    ['cbc', 'alg'],
    ['ana2', 'proba'],
    ['alg', 'algo1'],
    ['proba', 'met'],
    ['algo1', 'met'],
    ['proba', 'redes'],
    ['algo1', 'orga1'],
    ['algo1', 'algo2'],
    ['algo2', 'ssoo'],
    ['algo2', 'lyc'],
    ['orga1', 'orga2'],
    ['orga2', 'ssoo'],
    ['ssoo', 'redes'],
    ['ssoo', 'bbdd'],
    ['lyc', 'tdl'],
    ['lyc', 'plp'],
    ['ing1', 'bbdd'],
    ['ing1', 'ing2'],
    ['algo2', 'algo3'],
    ['plp', 'ing2'],
    ['ssoo', 'ing2'],
];
var graphLinks = [];
var i;
var pair;
for (i = 0; i < subjectsLinks.length; i += 1) {
    pair = subjectsLinks[i];
    graphLinks.push({
        source: subjectsMap[pair[0]],
        target: subjectsMap[pair[1]]
    });
}
    

var graph = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([960, 500]);
var nodes = graph.nodes(subjectsList);
var links = graph.links(graphLinks);
graph.start();

var color = d3.scale.category20();

var svg = d3.select('#chart').append('svg');

  var link = svg.selectAll("line.link")
      .data(graphLinks)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); })
      .style("stroke", "black");

 var node = svg.selectAll("circle.node")
      .data(subjectsList)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("fill", function(d) { return color(d.group); })
      .call(graph.drag);

  node.append("title")
      .text(function(d) { return d.name; });

  graph.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
alert('Hi!!!');
};
