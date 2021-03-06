const options = {
    layout: {
        hierarchical: {
            sortMethod: "directed",
            blockShifting: false,
            edgeMinimization: false,
            direction: "DU"
        }
    },
    physics: {
        enabled: false
    }
}

function build_map_from_dict(link_dict_element, container_id){
    let topo_dict = document.getElementById(link_dict_element).value;
    let link_json = topo_dict.replaceAll(/\d*\s*:/g, replacer);
    let topo_obj = JSON.parse(link_json);
    let container = document.getElementById(container_id);

    let node_list = [];
    let edge_list = [];

    for(const node in topo_obj) {
        node_list.push(
            {
                "id": node,
                "label": node,
                "physics": false
            }
        );
        for(const remote in topo_obj[node]) {
            edge_list.push(
                {
                    "from": node,
                    "to": topo_obj[node][remote],
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

    new vis.Network(container, data, options)
}

function build_map_from_output(output_id, container_id){
    let output = document.getElementById(output_id).value;
    let container = document.getElementById(container_id);
    let parsedData = vis.network.dotparser.parseDOT(
        output_to_DOT(output)
    )
    for(const node in parsedData.nodes){
        parsedData.nodes[node].physics = false;
        parsedData.nodes[node].label = String(parsedData.nodes[node].id)
    }
    let data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
    }
    new vis.Network(container, data, options);
}

function output_to_DOT(output){
    output = output.toString().replaceAll("-", "--");
    output = output.toString().replaceAll(",", ";");
    output = "dinetwork {" + output + "}";
    return output;
}

function replacer(match){
    return '"' + match.replace(':', '":').split(' ').join('');
}