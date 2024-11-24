import numpy as np
from qutip import *
import matplotlib as mpl
from matplotlib import cm
import imageio

def animate_bloch(states, duration=0.3, save_all=False):
    b = Bloch()
    b.vector_color = ['r', 'b']  # Vetores: qubit A (vermelho) e qubit B (azul)
    b.view = [-40, 30]
    images = []
    try:
        length = len(states)
    except:
        length = 1
        states = [states]
    
    # Normalize colors to the length of data
    nrm = mpl.colors.Normalize(0, length)
    colors = cm.cool(nrm(range(length)))
    
    b.point_color = list(colors)
    b.point_marker = ['o']
    b.point_size = [30]
    
    for i in range(length):
        b.clear()
        b.add_states(states[i][0], 'vector')  # Adiciona o vetor do qubit A
        b.add_states(states[i][1], 'vector')  # Adiciona o vetor do qubit B
        b.add_states(states[:i+1], 'point')   # Adiciona o rastro até o estado atual
        if save_all:
            b.save(dirc='tmp')
            filename = "tmp/bloch_%01d.png" % i
        else:
            filename = 'temp_file.png'
            b.save(filename)
        images.append(imageio.imread(filename))
    
    imageio.mimsave('swap_gate_bloch.gif', images, duration=duration)

# Estado inicial dos qubits
qubit_a = (basis(2, 0) + basis(2, 1)).unit()  # Estado |+>
qubit_b = (basis(2, 0) - basis(2, 1)).unit()  # Estado |->

# Criar estados intermediários para a porta SWAP
states = []
steps = 40
for i in range(steps + 1):
    t = i / steps  # Fração do progresso
    # Interpolação linear entre os estados
    intermediate_a = (1 - t) * qubit_a + t * qubit_b
    intermediate_b = (1 - t) * qubit_b + t * qubit_a
    states.append([intermediate_a.unit(), intermediate_b.unit()])

# Animação da porta SWAP
animate_bloch(states, duration=0.1, save_all=False)
