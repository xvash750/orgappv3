// Sample data for the organizational chart
const data = {
    name: "CEO",
    children: [
        { name: "Manager 1", children: [{ name: "Employee 1" }, { name: "Employee 2" }] },
        { name: "Manager 2", children: [{ name: "Employee 3" }, { name: "Employee 4" }] }
    ]
};

const width = 600;
const height = 400;

// Create the SVG element for the org chart
const svg = d3.select("#orgChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const root = d3.hierarchy(data);
const treeLayout = d3.tree().size([height, width - 200]);

treeLayout(root);

// Function to render the chart
function renderChart() {
    // Draw links
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

    // Draw nodes
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
}

// Function to add a new node
function addNode() {
    const name = prompt("Enter node name:");
    const manager = prompt("Enter manager name (leave empty for root):");

    const newNode = { name: name };

    if (manager) {
        const parent = findNode(root, manager);
        if (parent) {
            if (!parent.children) parent.children = [];
            parent.children.push(newNode);
        } else {
            alert("Manager not found!");
            return;
        }
    } else {
        // If no manager specified, add to the root
        if (!root.children) root.children = [];
        root.children.push(newNode);
    }

    updateChart(); // Call to update the chart after adding a node
}

// Function to find a node by name
function findNode(node, name) {
    if (node.data.name === name) return node;
    if (node.children) {
        for (const child of node.children) {
            const result = findNode(child, name);
            if (result) return result;
        }
    }
    return null;
}

// Function to update the chart
function updateChart() {
    // Clear the existing chart
    svg.selectAll("*").remove();
    treeLayout(root); // Recalculate the layout
    renderChart(); // Render the updated chart
}

// Initial rendering of the chart
renderChart();
