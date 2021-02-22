let options = {
    layout: {
        randomSeed: 1,
        improvedLayout: true
    },
    edges: {
        arrows: {
            to:{
                enabled: true
            }
        }
    },
    physics: {
        enabled: true,
        barnesHut: {
            avoidOverlap: 1
        }
    }
}

let network;

function build_map_from_dict(link_dict_element, container_id){
    let topo_txt = document.getElementById(link_dict_element).value;
    let lines = topo_txt.split('\n')
    let topo_obj = {}
    let container = document.getElementById(container_id);

    if(lines.length > 150){
        alert("Render performance above 150 nodes may be terrible, and the resulting layouts are strange. Ye be warned.")
        options.layout.improvedLayout = false;
        options.physics.barnesHut.avoidOverlap = 0;
    } else {
        options.layout.improvedLayout = true;
        options.physics.barnesHut.avoidOverlap = 1;
    }

    for(const line in lines) {
        let links = lines[line].split(",")
        let node = links.shift();
        topo_obj[node] = []
        while(links.length > 0) {
            topo_obj[node].push(links.shift())
            topo_obj[node].push(links.shift())
        }
    }

    let node_list = [];
    let edge_list = [];

    for(const node in topo_obj) {
        node_list.push(
            {
                "id": node,
                "label": node,
                "physics": lines.length > 150
            }
        );
        for(const remote in topo_obj[node]) {
            edge_list.push(
                {
                    "from": node,
                    "to": topo_obj[node].shift(),
                    "label": topo_obj[node].shift()
                }
            )
        }
    }
    let edges = new vis.DataSet(edge_list);
    let nodes = new vis.DataSet(node_list);
    let data = {
        nodes: nodes,
        edges: edges
    }

    network = new vis.Network(container, data, options);
}