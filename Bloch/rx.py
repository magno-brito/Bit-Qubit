import numpy as np
from qutip import *
import matplotlib as mpl
from matplotlib import cm
import imageio

def animate_bloch(states, duration=0.3, save_all=False):
    b = Bloch()
    b.vector_color = ['r']
    
    # Ajustando a visualização para 3D com rotação da esfera para mostrar a curvatura
    b.view = [60, 60]  # Ajusta a visualização para dar uma perspectiva 3D boa da esfera
    b.show_axes = True  # Mostra os eixos X, Y, Z
    b.labels = ['X', 'Y', 'Z']  # Rótulos para os eixos
    images = []
    
    try:
        length = len(states)
    except:
        length = 1
        states = [states]
    
    # Normalização de cores para o comprimento dos dados
    nrm = mpl.colors.Normalize(0, length)
    colors = cm.cool(nrm(range(length)))
    
    b.point_color = list(colors)
    b.point_marker = ['o']
    b.point_size = [30]
    
    for i in range(length):
        b.clear()
        state = states[i]
        
        # O vetor sempre terá comprimento 1, sem diminuição
        unit_state = state.unit()  # Normaliza o vetor para garantir comprimento constante
        b.add_states(unit_state)  # Adiciona o vetor com raio fixo
        
        # Adiciona o rastro, mas mantém o vetor constante
        b.add_states(states[:i+1], 'point') 
        
        if save_all:
            b.save(dirc='tmp')
            filename = "tmp/bloch_%01d.png" % i
        else:
            filename = 'temp_file.png'
            b.save(filename)
        
        images.append(imageio.imread(filename))
    
    imageio.mimsave('bloch_anim_rx.gif', images, duration=duration)

# Estado inicial |+> (no eixo X)
initial_state = basis(2, 0).unit()  # Começa no eixo X

# Definir a rotação com a porta R_x(θ)
theta = np.pi / 2  # Definindo o valor de θ, por exemplo, pi/2
R_x = Qobj([[np.cos(theta / 2), -1j * np.sin(theta / 2)], 
            [-1j * np.sin(theta / 2), np.cos(theta / 2)]])  # Matriz da porta R_x(θ)

# Criar estados intermediários aplicando frações da rotação R_x(θ)
states = []
steps = 40
for i in range(steps + 1):
    # Aplica a rotação da porta R_x(θ) em cada passo
    rotation = Qobj([[np.cos(i * theta / (2 * steps)), -1j * np.sin(i * theta / (2 * steps))], 
                     [-1j * np.sin(i * theta / (2 * steps)), np.cos(i * theta / (2 * steps))]])  # R_x incremental
    intermediate_state = (rotation * initial_state).unit()  # Aplica a rotação e normaliza o vetor
    states.append(intermediate_state)

# Animação da rotação completa com a porta R_x(θ)
animate_bloch(states, duration=0.1, save_all=False)
