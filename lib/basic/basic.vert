varying vec2 frag_uv;
varying vec3 v_uv; 


void main() {
    frag_uv = uv;

    v_uv = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
