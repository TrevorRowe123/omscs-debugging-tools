const options = {
    layout: {
        randomSeed: 11111
    },
    physics: {
        enabled: false
    }
}

function build_map_from_dict(link_dict_element, container_id){
    let topo_obj = eval(document.getElementById(link_dict_element).value);
    //let topo_obj = JSON.parse(link_dict);
    let container = document.getElementById(container_id);

    let node_list = [];
    let edge_list = [];

    for(const node in topo_obj) {
        node_list.push(
            {
                "id": node,
                "physics": false
            }
        );
        for(const remote in topo_obj[node]) {
            edge_list.push(
                {
                    "from": node,
                    "to": remote,
                    "smooth": {"enabled": false}
                }
            )
        }
        let edges = new vis.DataSet(edge_list);
        let nodes = new vis.DataSet(node_list);
        let data = {
            nodes: nodes,
            edges: edges
        }

        new vis.Network(container, data)

    }
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
    console.log(data);
    new vis.Network(container, data, options);
}

function output_to_DOT(output){
    output = output.toString().replaceAll("-", "--");
    output = output.toString().replaceAll(",", ";");
    output = "dinetwork {" + output + "}";
    console.log(output);
    return output;
}