import numpy as np
from qutip import *
import matplotlib as mpl
from matplotlib import cm
import imageio

def animate_bloch(states, duration=0.3, save_all=False):
    b = Bloch()
    b.vector_color = ['r']
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
        b.add_states(states[i])       # Adiciona o vetor do estado atual
        b.add_states(states[:i+1], 'point')  # Adiciona o rastro até o estado atual
        if save_all:
            b.save(dirc='tmp')
            filename = "tmp/bloch_%01d.png" % i
        else:
            filename = 'temp_file.png'
            b.save(filename)
        images.append(imageio.imread(filename))
    
    imageio.mimsave('bloch_anim.gif', images, duration=duration)

# Estado inicial |0>
initial_state = basis(2, 0)

# Definir a matriz Pauli-X
X = Qobj([[0, 1], [1, 0]])

# Criar estados intermediários aplicando frações da transformação Pauli-X
states = []
steps = 20
for i in range(steps + 1):
    # Calcular o estado intermediário aplicando frações da Pauli-X
    intermediate_state = (initial_state + i/steps * (X * initial_state - initial_state)).unit()
    states.append(intermediate_state)

# Animação da transição de |0> para |1>
animate_bloch(states, duration=0.3, save_all=False)
