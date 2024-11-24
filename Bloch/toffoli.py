import numpy as np
from qutip import *
import matplotlib as mpl
from matplotlib import cm
import imageio

def animate_bloch(states, duration=0.3, save_all=False):
    b = Bloch()
    b.vector_color = ['r', 'g', 'b']  # Controle 1: vermelho, Controle 2: verde, Alvo: azul
    b.view = [-40, 30]
    images = []
    try:
        length = len(states)
    except:
        length = 1
        states = [states]
    
    for i in range(length):
        b.clear()
        # Adiciona os três vetores (Controle 1, Controle 2 e Alvo)
        b.add_states(states[i][0], 'vector')  # Controle 1
        b.add_states(states[i][1], 'vector')  # Controle 2
        b.add_states(states[i][2], 'vector')  # Alvo
        # Rastro apenas do alvo
        b.add_states(states[:i+1], 'point')   # Adiciona o rastro do alvo
        if save_all:
            b.save(dirc='tmp')
            filename = "tmp/bloch_%01d.png" % i
        else:
            filename = 'temp_file.png'
            b.save(filename)
        images.append(imageio.imread(filename))
    
    imageio.mimsave('toffoli_gate_bloch.gif', images, duration=duration)

# Estados iniciais dos qubits
control_1 = (basis(2, 0) + basis(2, 1)).unit()  # Controle 1: estado |+>
control_2 = (basis(2, 0) + 0.5 * basis(2, 1)).unit()  # Controle 2: superposição
target = (basis(2, 0)).unit()                  # Alvo: estado |0>

# Criar estados intermediários para a porta Toffoli
states = []
steps = 40
for i in range(steps + 1):
    t = i / steps  # Fração do progresso

    # Controles permanecem fixos
    intermediate_control_1 = control_1
    intermediate_control_2 = control_2
    
    # Determinar se ambos os controles estão no estado |1>
    is_control_1_active = np.real(control_1.full()[1, 0]) > 0.5
    is_control_2_active = np.real(control_2.full()[1, 0]) > 0.5

    if is_control_1_active and is_control_2_active:
        # Aplica NOT (rotação de 180° ao redor do eixo X)
        target_rotation = Qobj([[0, 1], [1, 0]])  # Operador NOT
        intermediate_target = (target_rotation * target).unit()
    else:
        intermediate_target = target  # Sem alteração no alvo
    
    states.append([intermediate_control_1, intermediate_control_2, intermediate_target])

# Animação da porta Toffoli
animate_bloch(states, duration=0.1, save_all=False)
