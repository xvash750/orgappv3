let nodes = [];
let idCounter = 1;

function addNode() {
    const name = prompt("Enter node name:");
    const manager = prompt("Enter manager name:");
    
    const newNode = {
        id: idCounter++,
        name: name,
        manager: manager
    };
    
    nodes.push(newNode);
    renderNodes();
}

function editNode(id) {
    const node = nodes.find(n => n.id === id);
    if (node) {
        const newName = prompt("Enter new name:", node.name);
        const newManager = prompt("Enter new manager:", node.manager);
        
        node.name = newName;
        node.manager = newManager;
        renderNodes();
    }
}

function deleteNode(id) {
    nodes = nodes.filter(n => n.id !== id);
    renderNodes();
}

function renderNodes() {
    const container = document.getElementById('nodeContainer');
    container.innerHTML = '';
    
    nodes.forEach(node => {
        const nodeDiv = document.createElement('div');
        nodeDiv.className = 'node';
        nodeDiv.innerHTML = `
            <strong>ID:</strong> ${node.id}<br>
            <strong>Name:</strong> ${node.name}<br>
            <strong>Manager:</strong> ${node.manager}<br>
            <button onclick="editNode(${node.id})">Edit</button>
            <button onclick="deleteNode(${node.id})">Delete</button>
        `;
        container.appendChild(nodeDiv);
    });
}
