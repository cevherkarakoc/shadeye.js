uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

varying vec2 frag_uv;
varying vec3 v_uv;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    vec3 color = (v_uv + 0.5) * abs(sin(u_time)) ;

    gl_FragColor=vec4(color ,1.0);
}
