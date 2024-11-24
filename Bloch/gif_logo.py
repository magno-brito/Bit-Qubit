#!/usr/bin/env python3

from typing import Any, Dict, List, Optional
import dataclasses
import argparse
import re
import sys
import numpy as np
import drawsvg as draw  # pip install drawsvg
from hyperbolic import euclid3d  # pip install hyperbolic
import hyperbolic.euclid as shapes

@dataclasses.dataclass
class AnimState:
    anim: draw.FrameAnimation
    fps: float = 20
    speed: float = 1
    inner_proj: euclid3d.Projection = euclid3d.identity(3)
    inner_opacity: float = 1
    extra_opacity: float = 0
    label: Optional[str] = None
    axis: Optional[List[float]] = None
    draw_args: Dict[str, Any] = dataclasses.field(default_factory=dict)

    @classmethod
    def _interpolate(cls, x):
        return (np.sin(x * np.pi + -np.pi/2) + 1)/2

    def _smooth(self, duration):
        x = np.linspace(0, 1, int(round(self.fps*duration)))
        y = self._interpolate(x)
        return y

    def _wait(self, duration):
        return range(int(round(self.fps*duration)))

    def _draw_frame(self):
        self.anim.draw_frame(self.inner_proj, label=self.label,
                             inner_opacity=self.inner_opacity,
                             extra_opacity=self.extra_opacity,
                             axis=self.axis,
                             id_prefix='{}-d'.format(len(self.anim.frames)),
                             **self.draw_args)

    def sphere_fade_in(self):
        for t in self._smooth(0.4):
            self.inner_opacity = t
            self._draw_frame()
        self.inner_opacity = 1

    def sphere_fade_out(self):
        for t in self._smooth(0.4):
            self.inner_opacity = 1-t
            self._draw_frame()
        self.inner_opacity = 0

    def fade_in(self, label, axis):
        assert self.extra_opacity == 0, 'Unexpected previous state'
        self.label = label
        self.axis = axis
        for t in self._smooth(0.4):
            self.extra_opacity = t
            self._draw_frame()
        self.extra_opacity = 1

    def fade_out(self):
        assert self.extra_opacity == 1, 'Unexpected previous state'
        for t in self._smooth(0.4):
            self.extra_opacity = 1-t
            self._draw_frame()
        self.extra_opacity = 0

    def rotate(self, rads):
        start = self.inner_proj
        for t in self._smooth(2):
            self.inner_proj = euclid3d.rotation3d(self.axis, rads*t) @ start
            self._draw_frame()
        self.inner_proj = euclid3d.rotation3d(self.axis, rads) @ start

    def wait(self, duration=1):
        for i in self._wait(duration):
            self._draw_frame()

    def i_gate(self):
        self.wait(2.8)

    def do_gate(self, label, axis, radians):
        self.fade_in(label, axis)
        self.rotate(radians)
        self.fade_out()

    def h_gate(self):
        self.do_gate('H Gate:', (1, 0, 1), np.pi)

    def x_gate(self):
        self.do_gate('X Gate:', (1, 0, 0), np.pi)

    def y_gate(self):
        self.do_gate('Y Gate:', (0, 1, 0), np.pi)

    def z_gate(self):
        self.do_gate('Z Gate:', (0, 0, 1), np.pi)

    def sqrt_x_gate(self):
        self.do_gate('√X Gate:', (1, 0, 0), np.pi/2)

    def sqrt_y_gate(self):
        self.do_gate('√Y Gate:', (0, 1, 0), np.pi/2)

    def s_gate(self):
        self.do_gate('S Gate:', (0, 0, 1), np.pi/2)

    def t_gate(self):
        self.do_gate('T Gate:', (0, 0, 1), np.pi/4)

    def inv_h_gate(self):
        self.do_gate('H⁻¹ Gate:', (1, 0, 1), -np.pi)

    def inv_x_gate(self):
        self.do_gate('X⁻¹ Gate:', (1, 0, 0), -np.pi)

    def inv_y_gate(self):
        self.do_gate('Y⁻¹ Gate:', (0, 1, 0), -np.pi)

    def inv_z_gate(self):
        self.do_gate('Z⁻¹ Gate:', (0, 0, 1), -np.pi)

    def inv_sqrt_x_gate(self):
        self.do_gate('√X⁻¹ Gate:', (1, 0, 0), -np.pi/2)

    def inv_sqrt_y_gate(self):
        self.do_gate('√Y⁻¹ Gate:', (0, 1, 0), -np.pi/2)

    def inv_s_gate(self):
        self.do_gate('S⁻¹ Gate:', (0, 0, 1), -np.pi/2)

    def inv_t_gate(self):
        self.do_gate('T⁻¹ Gate:', (0, 0, 1), -np.pi/4)

    def custom_gate(self, x, y, z, r_pi=1, label=None):
        x = float(x)
        y = float(y)
        z = float(z)
        r_pi = float(r_pi)
        if label is None:
            label = f'{r_pi:.3f}π about ({x:.3f}, {y:.3f}, {z:.3f})'
        self.do_gate(label, (x, y, z), np.pi*r_pi)

    def apply_gate_list(self, gates, final_wait=True):
        non_gates = {'wait', 'no_wait'}
        block_gates = {'do'}
        no_wait = False
        for gate in gates:
            if gate.startswith('custom,') or gate.startswith('custom;'):
                try:
                    self.custom_gate(*gate[7:].split(gate[6]))
                except ValueError:
                    print(f'Error: Custom gate arguments contain invalid '
                          f'floats {gate}.')
                    sys.exit(1)
                    return
                continue

            if re.match('r[x,y,z][,;]', gate[:3].lower()):
                try:
                    r_pi = float(gate[3:])
                except ValueError:
                    print('Error: Rx/Ry/Rz gate should have style like '
                          'Rx;{float} or Rx,{float}.')
                    sys.exit(1)
                    return
                gate_name = 'R' + gate[1].lower()  # Display Rx instead of rx
                x = int(gate_name[1] == 'x')
                y = int(gate_name[1] == 'y')
                z = int(gate_name[1] == 'z')
                formated_r_pi = f"{r_pi:.3f}".rstrip('0').rstrip('.')
                label = f"{gate_name}({formated_r_pi}π)"
                self.custom_gate(x, y, z, r_pi, label=label)
                continue

            gate = gate.replace('-', '_')
            if gate in block_gates:
                print(f'Error: Invalid gate name "{gate}".')
                sys.exit(1)
                return
            if gate == 'no_wait':
                no_wait = True
            elif gate in non_gates:
                getattr(self, gate)()
            else:
                method = getattr(self, gate+'_gate', None)
                if method is not None:
                    method()
                else:
                    print(f'Error: Unknown gate name "{gate}".')
                    sys.exit(1)
                    return
        if not no_wait and final_wait:
            self.wait()

def do_or_save_animation(name: str, save=False, fps=20, preview=True,
                         style='sphere'):
    def wrapper(func):
        if save == 'mp4':
            with draw.frame_animate_video(
                    f'{name}.mp4', draw_frame, fps=fps, jupyter=preview
                    ) as anim:
                state = AnimState(anim, fps=fps, draw_args={"style": style})
                func(state)
        elif save == 'gif' or save is True:
            with draw.frame_animate_video(
                    f'{name}.gif', draw_frame, duration=1/fps, jupyter=preview
                    ) as anim:
                state = AnimState(anim, fps=fps, draw_args={"style": style})
                func(state)
        else:
            with draw.frame_animate_jupyter(draw_frame, delay=1/fps) as anim:
                state = AnimState(anim, fps=fps, draw_args={"style": style})
                func(state)
        return func
    return wrapper

def draw_frame(*args, background='white', id_prefix='d', w=624, h=None,
               **kwargs):
    d = draw.Drawing(5, 3, origin='center', id_prefix=id_prefix)
    d.set_render_size(w=w, h=h or w)
    d.append(draw.Circle(0, 0, 1, fill='white'))
    d.append(draw.Rectangle(-0.1, -0.1, 0.2, 0.2, fill='red'))
    return d

# Your animation logic:
@do_or_save_animation('bloch_sphere_animation', save='gif', fps=20)
def animate_bloch_sphere(state: AnimState):
    state.sphere_fade_in()
    state.wait(1)
    state.rotate(np.pi)
    state.wait(1)
    state.sphere_fade_out()

if __name__ == '__main__':
    animate_bloch_sphere(AnimState)
