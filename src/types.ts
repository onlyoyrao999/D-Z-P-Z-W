export interface CoreAction {
  id: string;
  number: number;
  name: string;
  module: '仙侠玄幻与高燃漫剧体系' | '硬核体术与兵刃实战体系';
  description: string;
  cameraMovement: string;
  lightingAndVFX: string;
  tags: string[];
}

export interface UltimateMove {
  id: string;
  series: string;
  name: string;
  spatialAnchor: string;
  startPose: string;
  charging: string;
  shouting: string;
  execution: string;
  tags: string[];
}

export interface SpatialAnchorSettings {
  verticalAnchor: string;
  environmentalCoordinates: string;
  geometricSilhouette: string;
  spatialDisruptionField: string;
}

export interface CameraSettings {
  cameraSpecs: string; // e.g. "ARRI Alexa 65, 4K, 24fps, 35mm anamorphic lens, IMAX cinematography"
  selectedMovements: string[];
  lighting: string;
  screenShake: boolean;
  hitStop: boolean;
  accelerationBlur: boolean;
  filmGrain: boolean;
  atmosphericDust: boolean;
}

export interface ColorGrading {
  presetName: string;
  baseColor: string; // hex
  baseDesc: string;
  highlightColor: string; // hex
  highlightDesc: string;
  burstColor: string; // hex
  burstDesc: string;
}

export interface ShotRecipe {
  id: string;
  name: string;
  nameEn: string;
  category: 'establishing' | 'pursuit' | 'clash' | 'climax_ultimate' | 'lingering';
  purpose: string;
  energyLevel: 1 | 2 | 3 | 4 | 5; // 1 (low/atmospheric) to 5 (maximum kinetic burst)
  durationSec: number;
  framing: string;
  cameraTrajectory: string;
  motionRamp: string;
  soundCues: string[];
  vfxLayers: string[];
  remotionKinematics: string;
}

export interface ShotSequenceItem {
  shotNumber: number;
  shotName: string;
  recipe: ShotRecipe;
  storyboard: string;
  spatialAnchor: string;
  cameraSpecs: string;
  soundDesign: string;
  promptEn: string;
  promptZh: string;
}

export interface PromptGenerationRequest {
  draftText: string;
  actionCoreId?: string;
  ultimateMoveId?: string;
  spatialAnchors: SpatialAnchorSettings;
  camera: CameraSettings;
  colorGrading: ColorGrading;
  isUltimateTriggered: boolean;
  useAi: boolean;
  generationMode?: 'single_climax' | 'shotcraft_sequence';
  selectedShotRecipes?: string[];
}

export interface PromptGenerationResponse {
  markdownOutput: string;
  part1Storyboard: string;
  part2Prompt: string;
  positivePromptEn: string;
  positivePromptZh: string;
  negativePrompt: string;
  spatialAnchorsFormatted: string;
  triggeredUltimate?: UltimateMove;
  triggeredCoreAction?: CoreAction;
  generationMode: 'single_climax' | 'shotcraft_sequence';
  shotSequence?: ShotSequenceItem[];
  shotcraftRemotionTimeline?: string;
  shotcraftJianyingDraft?: string;
}
