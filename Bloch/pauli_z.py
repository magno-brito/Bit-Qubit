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

# Estado inicial |+> (no eixo Y)
initial_state = (basis(2, 0) + basis(2, 1)).unit()

# Definir a rotação em torno do eixo Z usando a matriz Pauli-Z
Z = Qobj([[1, 0], [0, -1]])
theta = 2 * np.pi  # Ângulo total de 360 graus

# Criar estados intermediários aplicando frações da rotação Z
states = []
steps = 40
for i in range(steps + 1):
    # Calcula o operador de rotação para o ângulo parcial
    rotation = (1j * Z * (i * theta / steps / 2)).expm()
    # Aplica a rotação ao estado inicial
    intermediate_state = (rotation * initial_state).unit()
    states.append(intermediate_state)

# Animação da rotação completa ao redor do eixo Z
animate_bloch(states, duration=0.1, save_all=False)
