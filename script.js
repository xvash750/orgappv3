const data = {
    name: "CEO",
    children: [
        { name: "Manager 1", children: [{ name: "Employee 1" }, { name: "Employee 2" }] },
        { name: "Manager 2", children: [{ name: "Employee 3" }, { name: "Employee 4" }] }
    ]
};

const width = 600;
const height = 400;

const svg = d3.select("#orgChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const root = d3.hierarchy(data);
const treeLayout = d3.tree().size([height, width - 200]);

treeLayout(root);

svg.selectAll(".link")
    .data(root.links())
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("x1", d => d.source.y)
    .attr("y1", d => d.source.x)
    .attr("x2", d => d.target.y)
    .attr("y2", d => d.target.x)
    .attr("stroke", "#ccc");

const nodes = svg.selectAll(".node")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.y},${d.x})`);

nodes.append("circle")
    .attr("r", 5)
    .attr("fill", "#007BFF");

nodes.append("text")
    .attr("dy", 3)
    .attr("x", d => d.children ? -8 : 8)
    .style("text-anchor", d => d.children ? "end" : "start")
    .text(d => d.data.name);
