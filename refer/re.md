# Graph

## CITE

```
@InProceedings{ribeiro2017struc2vec,
  title={struc2vec: Learning Node Representations from Structural Identity},
  author={Ribeiro, Leonardo F. R. and Saverese, Pedro H. P. and Figueiredo, Daniel R.},
  booktitle={Proceedings of KDD},
  year={2017}
}

@InProceedings{perozzi2014deepwalk,
  Title                    = {Deepwalk: Online learning of social representations},
  Author                   = {Perozzi, Bryan and Al-Rfou, Rami and Skiena, Steven},
  Booktitle                = {Proceedings of KDD},
  Year                     = {2014},
  Pages                    = {701--710}
}

@InProceedings{grover2016node2vec,
  Title                    = {node2vec: Scalable feature learning for networks},
  Author                   = {Grover, Aditya and Leskovec, Jure},
  Booktitle                = {Proceedings of KDD},
  Year                     = {2016},
  Pages                    = {855--864}
}

@InProceedings{cavallari2017learning,
  title={Learning Community Embedding with Community Detection and Node Embedding on Graphs},
  author={Cavallari, Sandro and Zheng, Vincent W. and Cai, Hongyun and Chang, Kevin ChenChuan and Cambria, Erik},
  booktitle={Proceedings of CIKM},
  year={2017}
}
```

## DeepWalk

### 算法流程图

![算法流程图](http://ou5bxfpku.bkt.clouddn.com/img/deepwalk3.png)

![](http://img.blog.csdn.net/20170724123714819?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMzUyNzQxOQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

![algo](http://img.blog.csdn.net/20161210133345850?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvRGlub3NvZnQ=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

![SGD](http://ou5bxfpku.bkt.clouddn.com/img/deepwalk6.png)

### Random walk seq Mapping

![mapping](http://ou5bxfpku.bkt.clouddn.com/img/deepwalk5.png)

### code

![](https://images0.cnblogs.com/blog2015/482174/201503/091616061365818.png)

## node2vec

### 算法分析

#### Object function

```math
\max \limits_{f} \sum_{u \in V}{\log Pr(N_S(u)|f(u))}
```

*   `$f$`为节点到目标空间的映射函数`$V \rightarrow R^d$`
*   `$d$`为目标空间维度
*   `$N_S(u) \subset V$`是节点`$u$`的网络邻居，通过`$S$`的采样方法得到

##### 假设

条件独立假设:-节点的邻居间访问的概率相互独立

```math
Pr(N_S(u)|f(u))= \prod_{n_i \in N_S(u)}{Pr(n_i|f(u))}
```

空间（节点间）对称假设:-邻居节点和访问节点存在自反律

```math
Pr(n_i|f(u)) = \frac{exp(f(n_i) \cdot f(u))}{\sum_{u\in V}{exp(f(v) \cdot f(u))}}
```

##### 化简得

```math
\max \limits_{f} \sum_{u \in V}[-\log{Z_u} + \sum_{n_i \in N_S(u)}{f(n_i) \cdot f(u)}]
```

##### SGD 优化 Z

```math
Z_u =  \sum_{v \in V}\exp({f(u) \cdot f(v)})
```

![](https://user-gold-cdn.xitu.io/2017/7/4/97b93d467d3d167ebadb21590f6f36b2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

*   p 控制偏向 BFS
*   q 控制偏向 DFS
*   p=q=1.0 是等价于 DeepWalk
*   α 为权重调整参数

---

Embedding network nodes in (Euclidean) space has received much attention over the past decades from different communities.The technique is instrumental for Machine Learning applications that leverage network data, as node embeddings can be directly used in tasks such as classification and clustering.

In Natural Language Processing [2], generating dense embeddings for sparse data has a long history. Recently, Skip-Gram [12,13] was proposed as an effcient technique to learn embeddings for text data (e.g., sentences). Among other properties, the learned language model places semantically similar words near each other in space.

Learning a language model from a network was first proposed by DeepWalk[16]. It uses random walks to generate sequences of nodes from the network, which are then treated as sentences by Skip-Gram. Intuitively, nodes close in the network will tend tohave similar contexts (sequences) and thus have embeddings thatare near one another. This idea was later extended by node2vec[6].By proposing a biased second order random walk model,node2vec provides more exibility when generating the context of a vertex.In particular, the edge weights driving the biased random walkscan be designed in an attempt to capture both vertex homophilyand structural equivalence. However, a fundamental limitation is that structurally similar nodes will never share the same context if their distance (hop count) is larger than the Skip-Gram window.

subgraph2vec[14] is another recent approach for learning embeddings for rooted subgraphs, and unlike the previous techniquesit does not use random walks to generate context. Alternatively, the context of a node is simply defined by its neighbors. Additionally,subgraph2vec captures structural equivalence by embedding nodes with the same local structure to the same point in space. Nonetheless, the notion of structural equivalence is very rigid since it is defined as a binary property dictated by the Weisfeiler-Lehman isomorphism test [21]. Thus, two nodes that are structurally very similar (but fail the test) and have non-overlapping neighbors maynot be close in space.

Similarly to subgraph2vec, considerable effort has recently been made on learning richer representations for network nodes [4,24].However, building representations that explicitly capture structural identity is a relative orthogonal problem that has not received much attention. This is the focus of struc2vec.

A recent approach to explicitly identify the role of nodes using just the network structure is RolX[7]. This unsupervised approachis based on enumerating various structural features for nodes, finding the more suited basis vector for this joint feature space, and then assigning for every node a distribution over the identified roles(basis), allowing for mixed membership across the roles. Without explicitly considering node similarity or node context (in terms of structure),RolX is likely to miss node pairs that are structurally equivalent (to be shown).

As there is an increasing amount of graph data, ranging from social networks to various information networks, an important question arises is how to represent a graph for analytics [11]. Graph embedding is the state-of-the-art graph representation framework, which aims to project a graph into a low-dimensional space for further applications [16,20,26]. In terms of the target to embed, most of the existing graph embedding methods focus on nodes. For example, earlier methods, such as MDS [7], LLE [21], IsoMap [26] and Laplacian eigenmap [2], aim to preserve the first-order proximity extracting the leading eigenvectors of a graph affinity matrices.

<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
      processEscapes: true
    },
    "HTML-CSS": { availableFonts: ["TeX"] }
  });
</script>

<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML'></script>

# Graph Embedding

## Introduce

## Relate Works

### Network Represent Learing

将网络记作$G = (V,E)$, 其中 $V$ 是节点集合, $E$ 是边的集合. 边 $e = (v*i,v_j) \in E$ 表示了节点 $v_i$ 到 $v_j$ 的一条边. 网络的邻接矩阵定义为 $A \in R*{|V|×|V|}$, 其中 $A*{ij} = 1$ 如果 $(vi,vj) \in E$, 否则 $A*{ij} = 0$. 邻接矩阵是网络数据的一种简单直接的表达形式. 邻接矩阵 $A$ 的每一行表示了一个节点和所有其他节点的链接关系, 可以看作是对应节点的一种表示

虽然方便直接, 使用邻接矩阵的网络表示受到计算效率问题的影响. 邻接矩阵 $A$ 占用了 $|V|×|V|$ 的存储空间, 这在 $|V|$ 增长到百万级时通常是不可接受的. 另一方面, 邻接矩阵中绝大多数是 0, 数据十分稀疏. 这种数据稀疏性使得快速有效的统计学习方法的应用变得困难 [1].

因此, 研究者们转而为网络中的节点学习低维稠密的向量表示. 形式化地, 网络表示学习的目标 就是对每个节点 $v \in V$ 学习一个实数向量 $R_v \in R_k$, 其中向量的维度 $k$ 远远小于节点的总个数 $|V|$. 网络表示学习的过程可以是无监督或者半监督的. 通过优化算法自动得到而不需要特征工程的节点表示可以进一步用于后续的网络应用任务, 如节点分类. 这些低维的向量表示使得快速高效的算法设计成为可能, 而不必再去考虑原本的网络结构.

---

图嵌入技术在近十年受到了不同方向的很多关注。这个技术对机器学习利用网络技术有很大的帮助，例如 node embedding 能直接的用于节点的分类，聚类等问题上。

#### Embed using Random Work

在自然语言处理领域，基于稀疏数据生成一个稠密的矩阵表示有很长的历史。Skip-gram 是近年来一个能高效的学习文本数据的稠密表示的方法。该学习后后语言模型能将语义相似的词放置于空间中相近的位置。

##### Deepwork

采用网络数据来训练一个语义模型是由 DeepWalk 算法首次提出.其应用从网络中随机游走产生的游走序列做为句子来训练 Skip-Gram.

DeepWalk 算法 [1] 第一次将深度学习中的技术引入到网络表示学习领域. DeepWalk 算法充分利 用了网络结构中的随机游走序列的信息. 使用随机游走序列而不是邻接矩阵的优势有两点: 首先, 随 机游走序列只依赖于局部信息, 所以可以适用于分布式和在线系统, 而使用邻接矩阵就必须把所有信 息存储于内存中处理, 面临着较高的计算时间和空间消耗. 第二, 对随机游走序列进行建模可以降低建模 0-1 二值邻接矩阵的方差和不确定性.

##### Node2vec

Node2vec [27] 通过改变随机游走序列生成的方式进一步扩展了 DeepWalk 算法. DeepWalk 选取 随机游走序列中下一个节点的方式是均匀随机分布的. 而 node2vec 通过引入两个参数 $p$ 和 $q$, 将宽度 优先搜索和深度优先搜索引入了随机游走序列的生成过程. 宽度优先搜索注重邻近的节点并刻画了相 对局部的一种网络表示, 宽度优先中的节点一般会出现很多次, 从而降低刻画中心节点的邻居节点的 方差; 深度优先搜索反应了更高层面上的节点间的同质性.

特别地, node2vec 中的两个参数 p 和 q 控制随机游走序列的跳转概率, 如图 9 所示, 假设上一步 游走的边为 (t,v), 那么对于节点 v 的不同邻居, node2vec 根据 p 和 q 定义了不同的邻居的跳转概率, p 控制跳向上一个节点的邻居的概率, q 控制跳向上一个节点的非邻居的概率, 具体的未归一的跳转概

#### 基于矩阵分解的方法

GraRep 算法 [17] 考虑了一种特别的关系矩阵. GraRep 通过 SVD 分解对该关系矩阵进行降维从 而得到 k 步网络表示. 形式化地, 假设首先对邻接矩阵 A 进行行归一化处理, 使得矩阵 A 中每行的加 和等于 1. 则 GraRep 算法在计算 k 步网络表示时分解了矩阵 Ak, 该关系矩阵中的每个单元对应着两 个节点间通过 k 步的随机游走抵达的概率. 更进一步, GraRep 尝试了不同的 k 值, 并将不同 k 值对 应的 k 步网络表示拼接起来, 组成维度更高、表达能力也更强的节点表示. 但 GraRep 的主要缺点在 于其在计算关系矩阵 Ak 的时候计算效率很低.

#### Embed using one and two approx

*   Line

基于简单神经网络的另一个代表性的网络表示学习算法就是 LINE 算法 [15]. Tang 等 [15] 提出了 一种可以适用于大规模的有向带权图的网络表示学习算法. 为了对节点间的关系进行建模, LINE 算 法用观察到的节点间连接刻画了第一级相似度关系, 用不直接相连的两个节点的共同邻居刻画了这两 个点之间的第二级相似度关系. 直觉上说, 对直接相连的两个节点间关系的刻画等价于对原始网络的 邻接矩阵的建模. 但是一个网络中的边关系往往是非常稀疏的, 所以有必要进一步刻画第二级相似度 关系来考虑虽然并不直接相连, 但是共同邻居较多的节点对, 从而对第一级相似度的信息予以补充. 具体来说, LINE 算法对所有的第一级相似度和第二级相似度节点对进行了概率建模, 并最小化 该概率分布和经验分布之间的 KL 距离. 参数学习由随机梯度下降算法决定.

#### Embed additional information

##### subgraph2vec

subgraph2vec 是另一种方法

##### Structure2vec

##### Struc2vec

### visualization Graph

### Visualizaion Combine Embed

#### t-SNE

#### largevis

```cite
@InProceedings{ribeiro2017struc2vec,
  title={struc2vec: Learning Node Representations from Structural Identity},
  author={Ribeiro, Leonardo F. R. and Saverese, Pedro H. P. and Figueiredo, Daniel R.},
  booktitle={Proceedings of KDD},
  year={2017}
}

@InProceedings{perozzi2014deepwalk,
  Title                    = {Deepwalk: Online learning of social representations},
  Author                   = {Perozzi, Bryan and Al-Rfou, Rami and Skiena, Steven},
  Booktitle                = {Proceedings of KDD},
  Year                     = {2014},
  Pages                    = {701--710}
}

@InProceedings{grover2016node2vec,
  Title                    = {node2vec: Scalable feature learning for networks},
  Author                   = {Grover, Aditya and Leskovec, Jure},
  Booktitle                = {Proceedings of KDD},
  Year                     = {2016},
  Pages                    = {855--864}
}

@InProceedings{cavallari2017learning,
  title={Learning Community Embedding with Community Detection and Node Embedding on Graphs},
  author={Cavallari, Sandro and Zheng, Vincent W. and Cai, Hongyun and Chang, Kevin ChenChuan and Cambria, Erik},
  booktitle={Proceedings of CIKM},
  year={2017}
}

@inproceedings{tang2016visualizing,
  title={Visualizing Large-scale and High-dimensional Data},
  author={Tang, Jian and Liu, Jingzhou and Zhang, Ming and Mei, Qiaozhu},
  booktitle={Proceedings of the 25th International Conference on World Wide Web},
  pages={287--297},
  year={2016},
  organization={International World Wide Web Conferences Steering Committee}
}


@article{narayanansubgraph2vec,
  title={subgraph2vec: Learning Distributed Representations of Rooted Sub-graphs from Large Graphs},
  author={Narayanan, Annamalai and Chandramohan, Mahinthan and Chen, Lihui and Liu, Yang and Saminathan, Santhoshkumar}
}


@article{dai2016discriminative,
  title={Discriminative Embeddings of Latent Variable Models for Structured Data},
  author={Dai, Hanjun and Dai, Bo and Song, Le},
  journal={arXiv preprint arXiv:1603.05629},
  year={2016}
}
```
