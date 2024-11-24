import numpy as np
from qutip import *
import matplotlib as mpl
from matplotlib import cm
import imageio

def animate_bloch(states, duration=0.3, save_all=False):
    b = Bloch()
    b.vector_color = ['r', 'b']  # Vetores: qubit controle (vermelho) e qubit alvo (azul)
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
        b.add_states(states[i][0], 'vector')  # Adiciona o vetor do qubit controle
        b.add_states(states[i][1], 'vector')  # Adiciona o vetor do qubit alvo
        b.add_states(states[:i+1], 'point')   # Adiciona o rastro até o estado atual
        if save_all:
            b.save(dirc='tmp')
            filename = "tmp/bloch_%01d.png" % i
        else:
            filename = 'temp_file.png'
            b.save(filename)
        images.append(imageio.imread(filename))
    
    imageio.mimsave('cnot_gate_bloch.gif', images, duration=duration)

# Estado inicial dos qubits
qubit_control = (basis(2, 0) + basis(2, 1)).unit()  # Controle no estado |+>
qubit_target = (basis(2, 0)).unit()  # Alvo no estado |0>

# Criar estados intermediários para a porta CNOT
states = []
steps = 40
for i in range(steps + 1):
    t = i / steps  # Fração do progresso
    
    # Interpolação linear do controle (permanece inalterado)
    intermediate_control = qubit_control
    
    # Interpolação do alvo (NOT aplicado gradualmente se controle for |1>)
    if np.real(qubit_control.full()[1, 0]) > 0.5:  # Controle na base |1⟩
        target_rotation = Qobj([[0, 1], [1, 0]])  # Operador NOT
        intermediate_target = (target_rotation * qubit_target).unit()
    else:
        intermediate_target = qubit_target  # Sem alteração
    
    states.append([intermediate_control, intermediate_target])

# Animação da porta CNOT
animate_bloch(states, duration=0.1, save_all=False)
