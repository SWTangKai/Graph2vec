import numpy as np
import matplotlib.pyplot as plt


class Plot(object):
    def __init__(self, vec):
        self.vec = vec

    def scatter(self):
        x = np.array([self.vec[k] for k in self.vec])
        plt.scatter(x[:, 0], x[:, 1])
        plt.show()
        return x

    def normalized(self, a, axis=-1, order=2):
        l2 = np.atleast_1d(np.linalg.norm(a, order, axis))
        l2[l2 == 0] = 1
        return a / np.expand_dims(l2, axis)

    def apply_force(self, c_r):
        disp = {}

        for u in self.vec:
            disp[u] = np.array([0., 0.])

        for u in self.vec:
            for v in self.vec:
                if n != v:
                    d = self.vec[v] - self.vec[n]
                    # Distancia entre ambos vertices.
                    dist = np.linalg.norm()
                    # Calculo de la fuerza de repulsion.
                    fz_r = self.c_r / dist

                    d = self.normalized(d)

                    d *= (fz_r * -1)

                    disp[u] += vec

        for e in edges:


plt.figure()
plt.title('model')
nx.draw(G.G, pos=model.vectors, with_labels=True)
plt.figure()
plt.title('origin')
nx.draw(G.G, with_labels=True)
plt.show()
