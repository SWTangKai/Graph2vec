from collections import Counter


def TrasferGraphToSumbersform(sub_graph, node_id_mapper):
    # find group color
    group_c = list(map(lambda n: n['c'],
                       filter(lambda n: n['id'] == sub_graph['group_id'],
                              sub_graph['nodes'])))[0]

    # Get node color mapper
    node_c_mapper = {x['id']: x['c']
                     for x in sub_graph['nodes']}

    # initiate node information
    node_info = {n['id']: {
        'entry_couter': Counter(),
        'color_couter': Counter(),
        'entry_c': {}
    }
        for n in filter(lambda n: n['c'] == group_c, sub_graph['nodes'])}

    # Get inner graph and outer graph
    inner_edge = list(filter(
        lambda s: s['source'] in node_info and s['target'] in node_info, sub_graph['edges']))
    outer_edge = list(filter(lambda s: not(
        s['source'] in node_info and s['target'] in node_info), sub_graph['edges']))

    # Statc
    for i in outer_edge:
        x = 'source'
        o = 'target'
        if i[o] in node_info:
            x, o = o, x
        node_info[i[x]]['color_couter'][node_c_mapper[i[o]]] += 1
        node_info[i[x]]['entry_couter'][node_id_mapper[i[o]]] += 1
        node_info[i[x]]['entry_c'][node_id_mapper[i[o]]] = node_c_mapper[i[o]]


# [{
#     'c': tran['entry_c'][e],
#     'children':[
#         {
#             'id': i[0],
#             'value': tran['entry_couter'][e],
#             'c': i[1]
#         }
#         for i in filter(lambda s:s[1] == 2, tran['entry_c'].items())
#     ]
# } for e in dict((k, dict(v)) for k, v in node_info[k_id].items())['entry_couter']]
    # format
    # node_info = [{
    #     'c': group_c,
    #     'id': k_id,
    #     'children': dict((k, dict(v)) for k, v in node_info[k_id].items())
    # } for k_id in node_info]

    node_info = [{
        'c': group_c,
        'id': k_id,
        'children': [{
            'c': node_info[k_id]['entry_c'][e],
            'children':[
                {
                    'id': i[0],
                    'value': node_info[k_id]['entry_couter'][e],
                    'c': i[1]
                }
                for i in filter(lambda s:s[1] == node_info[k_id]['entry_c'][e], node_info[k_id]['entry_c'].items())
            ]
        } for e in node_info[k_id]['entry_couter']]
    } for k_id in node_info]

    # {
    #  'edges': [{'source': node_id_x, 'target': node_id_y}],
    #  'nodes': [{'id': node_id_x, 'infor': {'color_couter'/*color_dis*/: {5: 2}, 'entry_couter': {'34'/*group_id*/: 2}}}]
    # }
    return {
        'nodes': node_info,
        'edges': inner_edge,
        'group_id': sub_graph['group_id'],
    }
