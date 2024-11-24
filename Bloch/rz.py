import numpy as np
from qutip import *
import matplotlib as mpl
from matplotlib import cm
import imageio

def animate_bloch(states, duration=0.3, save_all=False):
    b = Bloch()
    b.vector_color = ['r']
    b.view = [0, 90]  # Ajustando para visualização 2D no plano XY
    b.xyplane = True   # Garante que apenas o plano XY será visível
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
    
    imageio.mimsave('bloch_anim.gif', images, duration=duration)

# Estado inicial |+> (no eixo Y)
initial_state = (basis(2, 0) + basis(2, 1)).unit()

# Definir a rotação com a porta R_z(θ)
theta = np.pi / 2  # Definindo o valor de θ, por exemplo, pi/2
R_z = Qobj([[np.exp(-1j*theta/2), 0], [0, np.exp(1j*theta/2)]])  # Matriz da porta R_z(θ)

# Criar estados intermediários aplicando frações da rotação R_z(θ)
states = []
steps = 40
for i in range(steps + 1):
    # Aplica a rotação da porta R_z(θ) em cada passo
    rotation = Qobj([[np.exp(-1j * (i * theta / steps) / 2), 0], 
                     [0, np.exp(1j * (i * theta / steps) / 2)]])  # R_z(θ) incremental
    intermediate_state = (rotation * initial_state).unit()  # Aplica a rotação e normaliza o vetor
    states.append(intermediate_state)

# Animação da rotação completa com a porta R_z(θ)
animate_bloch(states, duration=0.1, save_all=False)
