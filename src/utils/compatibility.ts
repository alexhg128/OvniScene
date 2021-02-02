//
// Verify if browser is compatible with WebGL
//
const supportsWebGL = () => {
    try { 
        return !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl'); 
    } catch (e) { 
        return false; 
    }
}

export { supportsWebGL }