#%%
import networkx as nx

class Graph:
    def __init__(self, filename):
        self.name = filename
        self.graph = nx.read_edgelist(filename + '.edgelist')
    
    def __degree(self):
        return self.graph.degree()
    
    def __clustering(self):
        return nx.clustering(self.graph.to_undirected(), self.graph.nodes())

    def __degree_centrelity(self):
        return nx.degree_centrality(self.graph)

    def __betweness_centrality(self):
        """ 计算介数中心性0x007"""
        return nx.betweenness_centrality(self.graph, None, True)


    def __closeness_centrality(self):
        """ 计算接近度中心性0x008"""
        return nx.closeness_centrality(self.graph)


    def __eigenvector_centrality(self):
        """ 计算特征向量中心性0x009"""
        return nx.eigenvector_centrality_numpy(self.graph)

    def Graph_info(self):
        KEEP = 3
        degree = self.__degree()
        clustering = self.__clustering()
        degree_centrelity = self.__degree_centrelity()
        betweness_centrality = self.__betweness_centrality()
        closeness_centrality = self.__closeness_centrality()
        eigenvector_centrality = self.__eigenvector_centrality()
        desity = round(nx.density(self.graph), 6)
        return {"ID": self.name, 
                "degree_centrelity": self.AvgGegree(degree_centrelity),
                "clustering": self.AvgGegree(clustering),
                "betweness_centrality": self.AvgGegree(betweness_centrality),
                "degree": self.AvgGegree(degree),
                "closeness_centrality": self.AvgGegree(closeness_centrality),
                "eigenvector_centrality": self.AvgGegree(eigenvector_centrality),
                "density": desity}

    def AvgGegree(self, ds):
        count = 0
        sums = 0
        for i in ds:
            count += 1
            sums += ds[i]
        return round(sums / count, 6)

def main():
    print(Graph('karate-mirrored').Graph_info())

if __name__ == '__main__':
    
    main()
