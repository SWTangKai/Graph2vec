from nelib.graph import Graph
from nelib.node2vec import Node2vec
from nelib.forceatlas2 import ForceAtlas2
import networkx as nx
import matplotlib.pyplot as plt

GRAPH_PATH = './data/cora/cora_edgelist.txt'

G = Graph()
G.read_edgelist(GRAPH_PATH)

model1 = Node2vec(G, 10, 10, 2, p=1.0, q=1.0)
# model2 = Node2vec(G, 10, 10, 2, p=1.0, q=3.0)
# model3 = Node2vec(G, 10, 10, 2, p=3.0, q=1.0)

# plt.figure()
# plt.title('model1')
# nx.draw(G.G, pos=model1.vectors, with_labels=True)
# plt.figure()
# plt.title('model2')
# nx.draw(G.G, pos=model2.vectors, with_labels=True)
# plt.figure()
# plt.title('model3')
# nx.draw(G.G, pos=model3.vectors, with_labels=True)
# plt.figure()
plt.title('origin')
nx.draw(G.G, with_labels=True)
plt.show()

# vec = model1.vectors
# x = np.array([vec[k] for k in vec])
# plt.scatter(x[:, 0], x[:, 1])
# plt.show()
# G = nx.karate_club_graph()

forceatlas2 = ForceAtlas2(
    # Behavior alternatives
    outboundAttractionDistribution=False,  # Dissuade hubs
    linLogMode=False,  # NOT IMPLEMENTED
    # Prevent overlap (NOT IMPLEMENTED)
    adjustSizes=False,
    edgeWeightInfluence=1.0,

    # Performance
    jitterTolerance=1.0,  # Tolerance
    barnesHutOptimize=True,
    barnesHutTheta=1.2,
    multiThreaded=False,  # NOT IMPLEMENTED

    # Tuning
                          scalingRatio=2.0,
                          strongGravityMode=False,
                          gravity=1.0,

                          # Log
                          verbose=False)

# positions = forceatlas2.forceatlas2_networkx_layout(
#     G, pos=None, iterations=2000)
# nx.draw_networkx(G, positions, cmap=plt.get_cmap(
#     'jet'), node_size=50, with_labels=True)
# plt.show()

# from matplotlib import animation

# fig = plt.figure(figsize=(10, 10))


# def init():
#     model1 = Node2vec(G, 10, 10, 2, p=1.0, q=1.0)
#     global pos
#     pos = model1.vectors
#     nx.draw(G.G, pos=pos, with_labels=True)
#     return pos


# def animate(i):
#     global pos
#     fig = plt.figure(figsize=(10, 10))
#     pos = forceatlas2.forceatlas2_networkx_layout(
#         G.G, pos=model1.vectors, iterations=1)
#     nx.draw(G.G, pos=pos, with_labels=True)
#     return fig


# ani = animation.FuncAnimation(
#     fig=fig, func=animate, frames=100, init_func=init, interval=20, repeat=False, blit=True)


# #!/usr/bin/env python
# import random
# import pylab
# from matplotlib.pyplot import pause
# import networkx as nx
# pylab.ion()

# # graph = nx.Graph()
# # node_number = 0
# # graph.add_node(node_number, Position=(random.randrange(0, 100), random.randrange(0, 100)))


# def get_fig():
#     global pos
#     # node_number += 1
#     # graph.add_node(node_number, Position=(random.randrange(0, 100), random.randrange(0, 100)))
#     # graph.add_edge(node_number, random.choice(graph.nodes()))
#     # nx.draw(graph, pos=nx.get_node_attributes(graph,'Position'))
#     pos = forceatlas2.forceatlas2_networkx_layout(
#         G.G, pos=pos, iterations=1)
#     nx.draw(G.G, pos=pos, with_labels=True)


# pos = model1.vectors
# num_plots = 50
# pylab.show()

# for i in range(num_plots):
#     # plt.clf()
#     get_fig()
#     pylab.draw()
#     pause(0.1)
#     print(i)
