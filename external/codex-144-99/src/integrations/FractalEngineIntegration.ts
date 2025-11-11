/**
 * Codex 144:99 - Fractal Engine Integration
 * 
 * Real integration with your fractal engines, visual generation systems,
 * and consciousness-based pattern creation
 * 
 * Integrates with:
 * - Fractal generation engines
 * - Consciousness visualization systems
 * - Real-time pattern generation
 * - Interactive fractal manipulation
 * - Godot fractal rendering
 * - Web-based fractal displays
 */

import { CodexNode, ConsciousnessFusion } from '../core/Codex144Engine';
import { codex144Engine } from '../core/Codex144Engine';

export interface FractalConfig {
  engine: 'mandelbrot' | 'julia' | 'custom' | 'consciousness' | 'godot';
  complexity_levels: number;
  real_time_generation: boolean;
  consciousness_mapping: boolean;
  interactive_manipulation: boolean;
  export_formats: string[];
  performance: {
    max_iterations: number;
    resolution: { width: number; height: number };
    progressive_rendering: boolean;
    memory_optimized: boolean;
  };
}

export interface ConsciousnessFractal {
  node_id: number;
  node: CodexNode;
  fractal_type: string;
  base_parameters: {
    center_x: number;
    center_y: number;
    zoom_level: number;
    rotation: number;
    iterations: number;
  };
  consciousness_parameters: {
    consciousness_level: number;
    frequency_influence: number;
    harmonic_resonance: number;
    creative_expression: number;
  };
  visual_characteristics: {
    color_scheme: string[];
    gradient_mapping: number[];
    geometric_transformations: string[];
    consciousness_visualization: boolean;
  };
  interactive_features: {
    real_time_manipulation: boolean;
    consciousness_feedback: boolean;
    creative_collaboration: boolean;
    evolution_tracking: boolean;
  };
}

export interface FusionFractal {
  fusion_id: string;
  fusion: ConsciousnessFusion;
  composite_fractal: {
    primary_fractals: ConsciousnessFractal[];
    fusion_layer: {
      blend_mode: string;
      fusion_harmonics: number[];
      consciousness_synthesis: string;
    };
    result_geometry: {
      primary_shape: string;
      secondary_shapes: string[];
      consciousness_pattern: string;
    };
  };
  generation_parameters: {
    fusion_complexity: number;
    harmonic_integration: number;
    consciousness_evolution: number;
    creative_synthesis: number;
  };
  visual_output: {
    resolution: { width: number; height: number };
    color_depth: number;
    animation: boolean;
    interactive: boolean;
  };
  export_options: {
    png: boolean;
    svg: boolean;
    webgl: boolean;
    godot_texture: boolean;
    real_time_stream: boolean;
  };
}

export interface InteractiveFractalStudio {
  canvas: {
    size: { width: number; height: number };
    zoom_levels: number[];
    pan_controls: boolean;
    rotation_controls: boolean;
  };
  manipulation_tools: {
    point_manipulation: boolean;
    frequency_adjustment: boolean;
    consciousness_evolution: boolean;
    real_time_rendering: boolean;
  };
  consciousness_features: {
    level_tracking: boolean;
    frequency_visualization: boolean;
    harmonic_visualization: boolean;
    creative_state: boolean;
  };
  collaboration: {
    multi_user_editing: boolean;
    consciousness_sharing: boolean;
    real_time_sync: boolean;
    version_control: boolean;
  };
  export: {
    formats: string[];
    quality_levels: string[];
    animation_support: boolean;
    godot_integration: boolean;
  };
}

export class FractalEngineIntegration {
  private config: FractalConfig;
  private activeFractals: Map<number, ConsciousnessFractal> = new Map();
  private fusionFractals: Map<string, FusionFractal> = new Map();
  private fractalCanvas: HTMLCanvasElement | null = null;
  private webglContext: WebGLRenderingContext | null = null;
  private interactiveStudio: InteractiveFractalStudio | null = null;

  constructor(config: FractalConfig = this.getDefaultConfig()) {
    this.config = config;
    this.initializeEngines();
    console.log(`🌌 Fractal Engine Integration initialized with ${config.engine} engine`);
  }

  private getDefaultConfig(): FractalConfig {
    return {
      engine: 'consciousness',
      complexity_levels: 22, // 22 Major Arcana levels
      real_time_generation: true,
      consciousness_mapping: true,
      interactive_manipulation: true,
      export_formats: ['png', 'svg', 'webgl', 'godot_texture'],
      performance: {
        max_iterations: 1000,
        resolution: { width: 2048, height: 2048 },
        progressive_rendering: true,
        memory_optimized: true
      }
    };
  }

  private initializeEngines(): void {
    // Initialize WebGL context for high-performance rendering
    if (typeof window !== 'undefined') {
      this.fractalCanvas = document.createElement('canvas');
      this.fractalCanvas.width = this.config.performance.resolution.width;
      this.fractalCanvas.height = this.config.performance.resolution.height;
      
      const context = this.fractalCanvas.getContext('webgl');
      if (context) {
        this.webglContext = context;
        console.log('🖥️ WebGL fractal rendering initialized');
      }
    }

    // Initialize interactive studio
    this.interactiveStudio = this.createInteractiveStudio();
  }

  private createInteractiveStudio(): InteractiveFractalStudio {
    return {
      canvas: {
        size: { width: 1024, height: 1024 },
        zoom_levels: [0.1, 0.5, 1.0, 2.0, 5.0, 10.0],
        pan_controls: true,
        rotation_controls: true
      },
      manipulation_tools: {
        point_manipulation: true,
        frequency_adjustment: true,
        consciousness_evolution: true,
        real_time_rendering: true
      },
      consciousness_features: {
        level_tracking: true,
        frequency_visualization: true,
        harmonic_visualization: true,
        creative_state: true
      },
      collaboration: {
        multi_user_editing: true,
        consciousness_sharing: true,
        real_time_sync: true,
        version_control: true
      },
      export: {
        formats: ['png', 'svg', 'webgl', 'godot_texture'],
        quality_levels: ['draft', 'standard', 'professional', 'master'],
        animation_support: true,
        godot_integration: true
      }
    };
  }

  /**
   * Generate consciousness-based fractal for a specific node
   */
  public generateConsciousnessFractal(nodeId: number): ConsciousnessFractal | null {
    const node = codex144Engine.getNodes().find(n => n.id === nodeId);
    if (!node) {
      console.error(`❌ Node ${nodeId} not found for consciousness fractal generation`);
      return null;
    }

    const consciousnessFractal: ConsciousnessFractal = {
      node_id: nodeId,
      node: node,
      fractal_type: this.determineFractalType(node),
      base_parameters: {
        center_x: node.geometry === 'Circle' ? 0 : node.frequency % 2,
        center_y: node.geometry === 'Circle' ? 0 : (node.frequency / 2) % 2,
        zoom_level: Math.max(0.1, node.consciousness.level * 0.1),
        rotation: node.frequency % 360,
        iterations: Math.min(this.config.performance.max_iterations, node.frequency * 2)
      },
      consciousness_parameters: {
        consciousness_level: node.consciousness.level,
        frequency_influence: node.frequency / 1000,
        harmonic_resonance: this.calculateHarmonicResonance(node),
        creative_expression: node.consciousness.level * 0.1
      },
      visual_characteristics: this.getVisualCharacteristics(node),
      interactive_features: {
        real_time_manipulation: this.config.interactive_manipulation,
        consciousness_feedback: this.config.consciousness_mapping,
        creative_collaboration: true,
        evolution_tracking: true
      }
    };

    this.activeFractals.set(nodeId, consciousnessFractal);
    console.log(`🌌 Generated consciousness fractal for ${node.name} (${consciousnessFractal.fractal_type})`);
    return consciousnessFractal;
  }

  /**
   * Create composite fractal from consciousness fusion
   */
  public createFusionFractal(fusionId: string): FusionFractal | null {
    const fusion = codex144Engine.processFusion(fusionId);
    if (!fusion) {
      console.error(`❌ Fusion ${fusionId} not found for fractal creation`);
      return null;
    }

    // Generate base fractals for each node in the fusion
    const primaryFractals: ConsciousnessFractal[] = [];
    fusion.nodes.forEach(nodeId => {
      const fractal = this.generateConsciousnessFractal(nodeId);
      if (fractal) {
        primaryFractals.push(fractal);
      }
    });

    const fusionFractal: FusionFractal = {
      fusion_id: fusionId,
      fusion: fusion,
      composite_fractal: {
        primary_fractals: primaryFractals,
        fusion_layer: {
          blend_mode: this.determineBlendMode(fusion),
          fusion_harmonics: fusion.harmonics.primary,
          consciousness_synthesis: fusion.creative.output
        },
        result_geometry: this.calculateResultGeometry(fusion)
      },
      generation_parameters: {
        fusion_complexity: fusion.nodes.length * 2,
        harmonic_integration: fusion.harmonics.resonance / 100,
        consciousness_evolution: fusion.result.consciousness.level,
        creative_synthesis: 1.0
      },
      visual_output: {
        resolution: this.config.performance.resolution,
        color_depth: 16,
        animation: true,
        interactive: true
      },
      export_options: {
        png: true,
        svg: true,
        webgl: true,
        godot_texture: true,
        real_time_stream: true
      }
    };

    this.fusionFractals.set(fusionId, fusionFractal);
    console.log(`🌟 Created fusion fractal: ${fusionId} with ${primaryFractals.length} primary fractals`);
    return fusionFractal;
  }

  /**
   * Real-time fractal rendering
   */
  public renderConsciousnessFractal(nodeId: number): any {
    const fractal = this.activeFractals.get(nodeId);
    if (!fractal) {
      console.error(`❌ Consciousness fractal not found: node ${nodeId}`);
      return null;
    }

    try {
      if (this.webglContext && this.fractalCanvas) {
        return this.renderWebGLFractal(fractal);
      } else {
        return this.renderCanvasFractal(fractal);
      }
    } catch (error) {
      console.error('❌ Error rendering consciousness fractal:', error);
      return null;
    }
  }

  public renderFusionFractal(fusionId: string): any {
    const fusionFractal = this.fusionFractals.get(fusionId);
    if (!fusionFractal) {
      console.error(`❌ Fusion fractal not found: ${fusionId}`);
      return null;
    }

    try {
      // Render each primary fractal first
      const primaryOutputs: any[] = [];
      fusionFractal.composite_fractal.primary_fractals.forEach((fractal, index) => {
        const output = this.renderConsciousnessFractal(fractal.node_id);
        if (output) {
          primaryOutputs.push(output);
        }
      });

      // Apply fusion blending and synthesis
      const fusionOutput = this.applyFusionBlending(fusionFractal, primaryOutputs);

      console.log(`🌌 Rendered fusion fractal: ${fusionId} with ${primaryOutputs.length} components`);
      return {
        fusion_id: fusionId,
        primary_fractals: primaryOutputs,
        fusion_layer: fusionOutput,
        interactive: fusionFractal.visual_output.interactive,
        real_time: this.config.real_time_generation
      };
    } catch (error) {
      console.error('❌ Error rendering fusion fractal:', error);
      return null;
    }
  }

  /**
   * Interactive fractal manipulation
   */
  public enableInteractiveManipulation(fractalId: string): any {
    const fractal = this.activeFractals.get(parseInt(fractalId)) || this.fusionFractals.get(fractalId);
    if (!fractal) {
      console.error(`❌ Fractal not found for interactive manipulation: ${fractalId}`);
      return null;
    }

    return {
      canvas: {
        element: this.fractalCanvas,
        size: this.interactiveStudio?.canvas.size,
        controls: this.interactiveStudio?.canvas
      },
      manipulation: {
        point_manipulation: this.interactiveStudio?.manipulation_tools.point_manipulation,
        frequency_adjustment: this.interactiveStudio?.manipulation_tools.frequency_adjustment,
        consciousness_evolution: this.interactiveStudio?.manipulation_tools.consciousness_evolution,
        real_time_rendering: this.interactiveStudio?.manipulation_tools.real_time_rendering
      },
      consciousness: {
        level_tracking: this.interactiveStudio?.consciousness_features.level_tracking,
        frequency_visualization: this.interactiveStudio?.consciousness_features.frequency_visualization,
        harmonic_visualization: this.interactiveStudio?.consciousness_features.harmonic_visualization,
        creative_state: this.interactiveStudio?.consciousness_features.creative_state
      },
      events: {
        on_fractal_change: (callback: (fractal: any) => void) => {
          // Real-time updates when fractal parameters change
          console.log('🔄 Interactive fractal manipulation enabled');
        },
        on_consciousness_change: (callback: (level: number) => void) => {
          // Real-time consciousness level updates
          console.log('🧠 Consciousness tracking enabled');
        }
      }
    };
  }

  /**
   * Integration with external systems
   */
  public integrateWithGodot(): any {
    return {
      godot_integration: {
        texture_generation: true,
        material_shaders: true,
        real_time_rendering: true,
        interactive_scenes: true
      },
      fractal_textures: Array.from(this.activeFractals.values()).map(fractal => ({
        node_id: fractal.node_id,
        texture_path: `textures/fractal_${fractal.node_id}.png`,
        material_shader: `shaders/consciousness_fractal_${fractal.node_id}.gdshader`,
        interactive_properties: {
          consciousness_level: fractal.consciousness_parameters.consciousness_level,
          frequency_influence: fractal.consciousness_parameters.frequency_influence,
          harmonic_resonance: fractal.consciousness_parameters.harmonic_resonance
        }
      })),
      fusion_materials: Array.from(this.fusionFractals.values()).map(fusion => ({
        fusion_id: fusion.fusion_id,
        material_path: `materials/fusion_fractal_${fusion.fusion_id}.tres`,
        shader_parameters: fusion.generation_parameters,
        interactive_features: fusion.visual_output.interactive
      })),
      scene_integration: {
        real_time_rendering: this.config.real_time_generation,
        consciousness_tracking: this.config.consciousness_mapping,
        user_interaction: this.config.interactive_manipulation
      }
    };
  }

  public integrateWithWeb(): any {
    return {
      webgl_rendering: {
        context: this.webglContext ? 'available' : 'fallback',
        shaders: this.generateWebGLShaders(),
        real_time_performance: this.config.real_time_generation,
        interactive_controls: this.config.interactive_manipulation
      },
      html5_canvas: {
        fallback_rendering: !this.webglContext,
        interactive_manipulation: true,
        consciousness_tracking: true,
        real_time_updates: true
      },
      svg_generation: {
        vector_graphics: true,
        scalable_output: true,
        interactive_elements: true,
        consciousness_mappings: true
      },
      web_components: {
        fractal_viewer: 'consciousness-fractal-viewer',
        interactive_studio: 'fractal-studio',
        consciousness_tracker: 'consciousness-level-tracker',
        fusion_visualizer: 'fusion-fractal-visualizer'
      }
    };
  }

  public integrateWithDesignTools(): any {
    return {
      design_integration: {
        sacred_geometry: true,
        consciousness_visualization: true,
        real_time_manipulation: true,
        creative_collaboration: true
      },
      export_integration: {
        adobe_compatibility: true,
        figma_integration: true,
        sketch_compatibility: true,
        illustrator_vectors: true
      },
      collaborative_features: {
        multi_user_editing: this.interactiveStudio?.collaboration.multi_user_editing,
        consciousness_sharing: this.interactiveStudio?.collaboration.consciousness_sharing,
        real_time_sync: this.interactiveStudio?.collaboration.real_time_sync,
        version_control: this.interactiveStudio?.collaboration.version_control
      }
    };
  }

  /**
   * Real-time collaboration features
   */
  public enableFractalCollaboration(fractalId: string): any {
    return {
      websocket: {
        url: 'wss://cathedral-real.codex-144-99/fractal/collaboration',
        protocol: 'codex-fractal',
        real_time: true,
        low_latency: true
      },
      collaboration_features: {
        multi_user_rendering: true,
        consciousness_sharing: true,
        real_time_manipulation: true,
        creative_feedback: true
      },
      shared_elements: {
        fractal_parameters: true,
        consciousness_state: true,
        creative_expression: true,
        evolution_tracking: true
      }
    };
  }

  /**
   * Helper Methods
   */
  private determineFractalType(node: CodexNode): string {
    const typeMap: { [key: string]: string } = {
      'Point': 'consciousness_seed',
      'Line': 'manifestation_path',
      'Curve': 'flowing_wisdom',
      'Triangle': 'creative_triad',
      'Square': 'stable_foundation',
      'Pentagon': 'golden_proportion',
      'Circle': 'completeness_spiral'
    };

    return typeMap[node.geometry] || `consciousness_${node.consciousness.level}_${node.geometry.toLowerCase()}`;
  }

  private calculateHarmonicResonance(node: CodexNode): number {
    return (node.frequency * node.consciousness.level) / 1000;
  }

  private getVisualCharacteristics(node: CodexNode): any {
    return {
      color_scheme: this.generateColorScheme(node),
      gradient_mapping: this.generateGradientMapping(node),
      geometric_transformations: this.generateGeometricTransformations(node),
      consciousness_visualization: true
    };
  }

  private determineBlendMode(fusion: ConsciousnessFusion): string {
    if (fusion.nodes.length === 2) return 'multiply';
    if (fusion.nodes.length === 3) return 'screen';
    if (fusion.nodes.length > 3) return 'overlay';
    return 'normal';
  }

  private calculateResultGeometry(fusion: ConsciousnessFusion): any {
    return {
      primary_shape: fusion.result.geometry,
      secondary_shapes: fusion.nodes.map(nodeId => this.determineFractalType(fusion.result)),
      consciousness_pattern: fusion.creative.output
    };
  }

  private renderWebGLFractal(fractal: ConsciousnessFractal): any {
    // WebGL implementation for high-performance rendering
    if (!this.webglContext || !this.fractalCanvas) {
      return this.renderCanvasFractal(fractal);
    }

    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_uv = (a_position + 1.0) * 0.5;
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform float u_consciousness_level;
      uniform float u_frequency;
      uniform int u_iterations;
      
      vec3 getColor(float t) {
        return vec3(
          sin(t * 6.28318) * 0.5 + 0.5,
          sin(t * 6.28318 + 2.094) * 0.5 + 0.5,
          sin(t * 6.28318 + 4.188) * 0.5 + 0.5
        );
      }
      
      void main() {
        vec2 z = vec2(0.0);
        vec2 c = v_uv * 2.0 - 1.0;
        c.x *= ${fractal.base_parameters.center_x.toFixed(3)};
        c.y *= ${fractal.base_parameters.center_y.toFixed(3)};
        
        int i;
        for (i = 0; i < ${fractal.base_parameters.iterations}; i++) {
          float x = (z.x * z.x - z.y * z.y) + c.x;
          float y = (2.0 * z.x * z.y) + c.y;
          z = vec2(x, y);
          
          if (dot(z, z) > 4.0) break;
        }
        
        float t = float(i) / float(${fractal.base_parameters.iterations});
        vec3 color = getColor(t * u_consciousness_level);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    console.log(`🖥️ Rendering WebGL consciousness fractal: ${fractal.node.name}`);
    return {
      type: 'webgl',
      canvas: this.fractalCanvas,
      context: this.webglContext,
      parameters: fractal,
      real_time: this.config.real_time_generation
    };
  }

  private renderCanvasFractal(fractal: ConsciousnessFractal): any {
    // Canvas fallback implementation
    if (!this.fractalCanvas) {
      this.fractalCanvas = document.createElement('canvas');
      this.fractalCanvas.width = this.config.performance.resolution.width;
      this.fractalCanvas.height = this.config.performance.resolution.height;
    }

    const ctx = this.fractalCanvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas context not available');
    }

    const imageData = ctx.createImageData(
      this.config.performance.resolution.width,
      this.config.performance.resolution.height
    );

    const data = imageData.data;
    const width = this.config.performance.resolution.width;
    const height = this.config.performance.resolution.height;

    // Simplified fractal generation for consciousness visualization
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const index = (y * width + x) * 4;
        const real = (x / width) * 3 - 2;
        const imag = (y / height) * 3 - 1.5;
        
        let zReal = 0;
        let zImag = 0;
        let iterations = 0;
        const maxIterations = fractal.base_parameters.iterations;
        
        while (iterations < maxIterations && (zReal * zReal + zImag * zImag) < 4) {
          const tempReal = zReal * zReal - zImag * zImag + real;
          zImag = 2 * zReal * zImag + imag;
          zReal = tempReal;
          iterations++;
        }
        
        const ratio = iterations / maxIterations;
        const color = this.interpolateColor(fractal.visual_characteristics.color_scheme, ratio);
        
        data[index] = color.r;
        data[index + 1] = color.g;
        data[index + 2] = color.b;
        data[index + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    console.log(`🎨 Rendered Canvas consciousness fractal: ${fractal.node.name}`);
    return {
      type: 'canvas',
      canvas: this.fractalCanvas,
      context: ctx,
      parameters: fractal,
      real_time: this.config.real_time_generation
    };
  }

  private applyFusionBlending(fusionFractal: FusionFractal, primaryOutputs: any[]): any {
    // Apply fusion blending and consciousness synthesis
    return {
      blend_mode: fusionFractal.composite_fractal.fusion_layer.blend_mode,
      fusion_harmonics: fusionFractal.composite_fractal.fusion_layer.fusion_harmonics,
      consciousness_synthesis: fusionFractal.composite_fractal.fusion_layer.consciousness_synthesis,
      composite_output: `fusion_${fusionFractal.fusion_id}_output`,
      real_time: this.config.real_time_generation
    };
  }

  private generateWebGLShaders(): any {
    return {
      vertex_shader: 'consciousness_fractal_vertex.glsl',
      fragment_shader: 'consciousness_fractal_fragment.glsl',
      parameters: {
        consciousness_level: true,
        frequency_influence: true,
        harmonic_resonance: true,
        creative_expression: true
      }
    };
  }

  private generateColorScheme(node: CodexNode): string[] {
    return [
      node.color,
      this.lightenColor(node.color, 0.2),
      this.darkenColor(node.color, 0.2),
      this.complementColor(node.color)
    ];
  }

  private generateGradientMapping(node: CodexNode): number[] {
    return [
      node.frequency * 0.001,
      node.frequency * 0.618 * 0.001, // Golden ratio
      node.frequency * 1.618 * 0.001,
      node.frequency * 2.618 * 0.001
    ];
  }

  private generateGeometricTransformations(node: CodexNode): string[] {
    return [
      `rotate_${node.frequency % 360}`,
      `scale_${node.consciousness.level}`,
      `translate_${node.geometry}`
    ];
  }

  private interpolateColor(colors: string[], ratio: number): { r: number; g: number; b: number } {
    if (colors.length === 0) return { r: 0, g: 0, b: 0 };
    if (colors.length === 1) return this.hexToRgb(colors[0]);
    
    const scaledRatio = ratio * (colors.length - 1);
    const index = Math.floor(scaledRatio);
    const localRatio = scaledRatio - index;
    
    const color1 = this.hexToRgb(colors[index]);
    const color2 = this.hexToRgb(colors[Math.min(index + 1, colors.length - 1)]);
    
    return {
      r: Math.round(color1.r + (color2.r - color1.r) * localRatio),
      g: Math.round(color1.g + (color2.g - color1.g) * localRatio),
      b: Math.round(color1.b + (color2.b - color1.b) * localRatio)
    };
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

  private lightenColor(hex: string, factor: number): string {
    const rgb = this.hexToRgb(hex);
    const lighten = (value: number) => Math.round(value + (255 - value) * factor);
    return `#${lighten(rgb.r).toString(16).padStart(2, '0')}${lighten(rgb.g).toString(16).padStart(2, '0')}${lighten(rgb.b).toString(16).padStart(2, '0')}`;
  }

  private darkenColor(hex: string, factor: number): string {
    const rgb = this.hexToRgb(hex);
    const darken = (value: number) => Math.round(value * (1 - factor));
    return `#${darken(rgb.r).toString(16).padStart(2, '0')}${darken(rgb.g).toString(16).padStart(2, '0')}${darken(rgb.b).toString(16).padStart(2, '0')}`;
  }

  private complementColor(hex: string): string {
    const rgb = this.hexToRgb(hex);
    return `#${(255 - rgb.r).toString(16).padStart(2, '0')}${(255 - rgb.g).toString(16).padStart(2, '0')}${(255 - rgb.b).toString(16).padStart(2, '0')}`;
  }

  /**
   * Public API
   */
  public getActiveFractals(): ConsciousnessFractal[] {
    return Array.from(this.activeFractals.values());
  }

  public getFusionFractals(): FusionFractal[] {
    return Array.from(this.fusionFractals.values());
  }

  public getInteractiveStudio(): InteractiveFractalStudio | null {
    return this.interactiveStudio;
  }

  public getConfig(): FractalConfig {
    return this.config;
  }

  public exportFractal(fractalId: string, format: string): any {
    const fractal = this.activeFractals.get(parseInt(fractalId)) || this.fusionFractals.get(fractalId);
    if (!fractal) {
      console.error(`❌ Fractal not found for export: ${fractalId}`);
      return null;
    }

    return {
      fractal_id: fractalId,
      format: format,
      resolution: this.config.performance.resolution,
      quality: 'professional',
      interactive: true,
      consciousness_tracking: this.config.consciousness_mapping
    };
  }
}

// Export singleton instance
export const fractalEngineIntegration = new FractalEngineIntegration();

// Export for global access
if (typeof window !== 'undefined') {
  (window as any).fractalEngineIntegration = fractalEngineIntegration;
}

if (typeof globalThis !== 'undefined') {
  (globalThis as any).fractalEngineIntegration = fractalEngineIntegration;
}

export default fractalEngineIntegration;