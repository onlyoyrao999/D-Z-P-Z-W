import {
  PromptGenerationRequest,
  PromptGenerationResponse,
  UltimateMove,
  CoreAction,
  ShotSequenceItem
} from '../types';
import { CORE_ACTIONS } from '../data/coreActions';
import { ULTIMATE_MOVES } from '../data/ultimateMoves';
import { SHOT_RECIPES, SHOT_RECIPE_MAP, DEFAULT_5_SHOT_PIPELINE } from '../data/shotRecipes';

export const DEFAULT_NEGATIVE_PROMPT =
  '(cgi, 3d render, unreal engine, video game graphic:1.4), (worst quality, low quality:1.4), (deformed limbs, extra fingers, missing limbs, bad anatomy:1.3), mechanical camera movement, zero gravity floating, cartoon, anime, over-saturated, plastic skin texture, blurry face, static poses without inertia, jittery camera artifacts, text, watermark.';

export function generateMartialArtsPrompt(
  req: PromptGenerationRequest
): PromptGenerationResponse {
  const {
    draftText,
    actionCoreId,
    ultimateMoveId,
    spatialAnchors,
    camera,
    colorGrading,
    isUltimateTriggered,
    generationMode = 'shotcraft_sequence'
  } = req;

  // Find selected core action or detect from draft
  let coreAction: CoreAction | undefined = CORE_ACTIONS.find(
    (a) => a.id === actionCoreId
  );
  if (!coreAction) {
    coreAction = CORE_ACTIONS.find(
      (a) => draftText.includes(a.name) || a.tags.some((t) => draftText.includes(t))
    ) || CORE_ACTIONS[0];
  }

  // Check if ultimate move is triggered
  const triggerKeywords = ['终极奥义', '奥义', '绝招', '必杀'];
  const hasTriggerWord =
    isUltimateTriggered ||
    triggerKeywords.some((kw) => draftText.includes(kw)) ||
    Boolean(ultimateMoveId);

  let ultimateMove: UltimateMove | undefined;
  if (hasTriggerWord) {
    if (ultimateMoveId) {
      ultimateMove = ULTIMATE_MOVES.find((m) => m.id === ultimateMoveId);
    }
    if (!ultimateMove) {
      ultimateMove = ULTIMATE_MOVES.find(
        (m) =>
          draftText.includes(m.name) ||
          draftText.includes(m.series) ||
          m.tags.some((t) => draftText.includes(t))
      );
    }
    if (!ultimateMove && hasTriggerWord) {
      ultimateMove = ULTIMATE_MOVES[0]; // fallback to 天霜拳 · 风霜扑面
    }
  }

  // Formatting spatial anchors
  const verticalAnchor =
    spatialAnchors.verticalAnchor.trim() || '双足死扣凹凸青石地表，下陷三寸，受力点扎实稳固';
  const envCoords =
    spatialAnchors.environmentalCoordinates.trim() ||
    '背依残破古刹断壁中轴线，距离中央香炉基座三步之遥';
  const geoSilhouette =
    spatialAnchors.geometricSilhouette.trim() ||
    '弓步拧腰呈对角线撕裂姿态，兵刃中轴笔挺，构成强识别几何三角构图';
  const fieldDisruption =
    spatialAnchors.spatialDisruptionField.trim() ||
    '半径两米内气流骤然沉降形成绝对真空区，外围尘土漫卷，内层衣袂刚性凝固';

  // Common Cinema Keywords
  const cinemaKeywords = [
    'ARRI Alexa 65',
    '4K',
    '24fps',
    '35mm anamorphic lens',
    'IMAX cinematography',
    'realistic film grain',
    'atmospheric dust micro-particles',
    'natural cinematic daylight',
    'physical fuse lighting',
    'physical inertia camera movement with organic handheld micro-shake',
    'acceleration-based motion blur during peak combat strikes',
    'hit stop timing',
    'speed ramp impact',
    'hyper-detailed fluid cloth physics',
    'realistic hair simulation',
    'rigid body debris dynamics'
  ].join(', ');

  // 1. Build Shotcraft Multi-Shot Sequence if in Shotcraft mode
  let shotSequence: ShotSequenceItem[] = [];
  let remotionTimelineJson = '';
  let jianyingDraftText = '';

  const recipe1 = SHOT_RECIPE_MAP['src_01'];
  const recipe2 = SHOT_RECIPE_MAP['src_03'];
  const recipe3 = SHOT_RECIPE_MAP['src_05'];
  const recipe4 = ultimateMove ? SHOT_RECIPE_MAP['src_07'] : SHOT_RECIPE_MAP['src_06'];
  const recipe5 = SHOT_RECIPE_MAP['src_09'];

  // Shot 1
  shotSequence.push({
    shotNumber: 1,
    shotName: '起势锚定 · 空间绝对坐标死锁 (Establishing Lock)',
    recipe: recipe1,
    storyboard: `人物静态伫立，足底与地面刚性结合。风沙吹拂衣袂，周身两米真空压降，死锁人物与古建筑空间坐标。`,
    spatialAnchor: `${verticalAnchor}，以${envCoords}为绝对基准。`,
    cameraSpecs: `${recipe1.framing} | ${recipe1.cameraTrajectory}`,
    soundDesign: recipe1.soundCues.join('；'),
    promptEn: `${cinemaKeywords}, wide shot establishing grounding, character firmly anchored at (${verticalAnchor}), environment coordinate (${envCoords}), geometric silhouette (${geoSilhouette}), natural overcast daylight (${colorGrading.baseColor}), atmospheric dust suspended in air, hyper-realistic physics, 8k.`,
    promptZh: `【Shot 1】起势建置：ARRI Alexa 65广角中景，绝对空间坐标死锁：${verticalAnchor}，参照系：${envCoords}，真实物理重力沉降，胶质颗粒感。`
  });

  // Shot 2
  shotSequence.push({
    shotNumber: 2,
    shotName: '身法破风 · 极速空中追击甩镜 (Aerial Pursuit & Whip Pan)',
    recipe: recipe2,
    storyboard: `身形骤然爆发启动，破空极速突进。摄影机贴背空中跟拍，并在超越瞬间0.2秒极速甩镜（Whip Pan）重新锁定正面。`,
    spatialAnchor: `沿古刹中轴线向前方石阶疾驰，脚踏碎石飞溅，剪影呈低伏对角撕裂线。`,
    cameraSpecs: `${recipe2.framing} | ${recipe2.cameraTrajectory}`,
    soundDesign: recipe2.soundCues.join('；'),
    promptEn: `${cinemaKeywords}, aggressive rear 3/4 aerial tracking shot following martial artist dashing forward, supersonic air streak vectors, rapid 0.2s whip pan camera transition to front chest framing, motion blur during peak acceleration, ultra-sharp facial focus, 8k.`,
    promptZh: `【Shot 2】破风追击：空中后侧45度高速跟拍，气流拉丝，极速甩镜180度重新锁定面门，加速度动态模糊转高清发丝细节。`
  });

  // Shot 3
  shotSequence.push({
    shotNumber: 3,
    shotName: `狂暴交锋 · #${coreAction.number} ${coreAction.name} (Kinetic Clash & Orbit)`,
    recipe: recipe3,
    storyboard: `${coreAction.description} 兵刃撞击瞬间迸发出刺眼引信火花，机位以火花切线为轴心进行90度高速受控环绕。`,
    spatialAnchor: `双人交击点位于断壁中央三步处，脚掌硬撑地面擦出焦痕。`,
    cameraSpecs: `${recipe3.framing} | ${recipe3.cameraTrajectory}`,
    soundDesign: recipe3.soundCues.join('；'),
    promptEn: `${cinemaKeywords}, intense close-quarters martial arts weapon clash, sparks flying from blade contact, 90-degree controlled momentary orbit around weapon contact point, 0.1s hit stop impact, heatwave distortion, high contrast highlight (${colorGrading.highlightColor}), 8k.`,
    promptZh: `【Shot 3】硬核碰撞：${coreAction.name}，兵刃相击火花四射，受控环绕运镜，0.1秒时空微滞与肌肉紧绷特写。`
  });

  // Shot 4
  shotSequence.push({
    shotNumber: 4,
    shotName: ultimateMove
      ? `终极奥义 · ${ultimateMove.name} (Hit-Stop Crash-In Blast)`
      : `决胜一击 · 震天破岳 (Climax Slam)`,
    recipe: recipe4,
    storyboard: ultimateMove
      ? `严格剔除运镜神态！【空间站位】：${ultimateMove.spatialAnchor}。【起手式】：${ultimateMove.startPose}。【蓄力中】：${ultimateMove.charging}。【口型喊名】：${ultimateMove.shouting}。【轰然出招】：${ultimateMove.execution}。`
      : `倾注全身气劲打出决胜重击，地面崩裂五丈，同心圆气浪席卷全场。`,
    spatialAnchor: ultimateMove ? ultimateMove.spatialAnchor : `立于深坑边缘，双臂大张呈十字刚性构图。`,
    cameraSpecs: `${recipe4.framing} | ${recipe4.cameraTrajectory}`,
    soundDesign: recipe4.soundCues.join('；'),
    promptEn: ultimateMove
      ? `${cinemaKeywords}, 2.39:1 anamorphic extreme crash zoom into ultimate energy core, character shouting "${ultimateMove.name}" with exact mouth movement, strictly static facial composition, explosive shockwave (${colorGrading.burstColor}), 0.15s overexposure flash, 0.3s camera shake decay, shattered floating boulders, 8k.`
      : `${cinemaKeywords}, massive kinetic impact blast, shockwave tearing through ancient ruins, ground fracture, flash overexposure, screen shake, photorealistic movie climax, 8k.`,
    promptZh: ultimateMove
      ? `【Shot 4】终极奥义：【${ultimateMove.name}】，口型断喝招式名，极推进能量奇点，0.15秒全屏闪白与0.3秒气浪剧震，碎石悬浮。`
      : `【Shot 4】极招爆发：全屏闪白高光，同心圆冲击波扫开二十丈，镜头剧烈震颤。`
  });

  // Shot 5
  shotSequence.push({
    shotNumber: 5,
    shotName: '缓释收势 · 碎石坠落与收刀余波 (Aftermath Deceleration)',
    recipe: recipe5,
    storyboard: `狂暴能量渐歇，悬浮的万千碎石如骤雨般缓落，人物从容收刀入鞘，最后一寸发出清脆金属卡点声，硝烟中透出丁达尔光束。`,
    spatialAnchor: `伫立于崩塌石坑中心，背对镜头，衣袂随残风自然拂动。`,
    cameraSpecs: `${recipe5.framing} | ${recipe5.cameraTrajectory}`,
    soundDesign: recipe5.soundCues.join('；'),
    promptEn: `${cinemaKeywords}, slow pedestal up and dolly out, floating stone debris falling like rain, martial artist sheathing sword with precise metal click, smoke and dust dissipating in tyndall sunlight beams, cinematic aftermath serenity, 8k.`,
    promptZh: `【Shot 5】余波收势：缓慢拉远升镜，悬浮碎石如雨缓落，兵刃入鞘卡点，烟尘在自然天光中散开，厚重电影余韵。`
  });

  // Remotion Timeline JSON & Jianying format
  remotionTimelineJson = JSON.stringify(
    {
      project: 'VideoShotcraft_HighOctane_Action_Sequence',
      fps: 24,
      aspectRatio: '2.39:1',
      totalDurationSeconds: 15.5,
      totalFrames: 372,
      shots: shotSequence.map((s, idx) => ({
        shotIndex: idx + 1,
        recipeId: s.recipe.id,
        recipeName: s.recipe.name,
        energyLevel: s.recipe.energyLevel,
        durationInFrames: Math.round(s.recipe.durationSec * 24),
        motionKinematics: s.recipe.remotionKinematics,
        audioCues: s.recipe.soundCues,
        vfxLayers: s.recipe.vfxLayers
      }))
    },
    null,
    2
  );

  jianyingDraftText = `【剪映 / CapCut 动作分轨草稿结构】
⏱️ 总时长: 15.5s (24 fps) | 画幅: 2.39:1 电影宽银幕
📹 视频主轨 (Video Track):
  - [00:00 - 02:12] Shot 1: 绝对坐标静置建置 (SRC-01) -> 广角低速微推
  - [02:12 - 05:16] Shot 2: 极速空中追击锁头 (SRC-03) -> 0.2s 甩镜转场 (Whip Pan)
  - [05:16 - 08:08] Shot 3: 刀剑切线受控环绕 (SRC-05) -> 0.1s 时空微滞 (Hit Stop)
  - [08:08 - 12:08] Shot 4: 终极奥义极推顿挫 (SRC-07) -> 0.15s 闪白转场 + 0.3s 画面震颤
  - [12:08 - 15:12] Shot 5: 碎石倒悬缓降收刀 (SRC-09) -> 丁达尔体积光渐隐

🔊 音效轨 (Sound FX Tracks):
  - Track A (环境/风鸣): 00:00 - 15:12 (低频自然风啸 + 残破古刹空谷回音)
  - Track B (动效打击):
    * 03:00 气流音爆破空
    * 05:20 重金铁相撞刺耳爆鸣 (Heavy Metal Clang)
    * 09:12 终极奥义吸音真空倒吸 -> 09:20 钛合金次低音极核音爆
    * 14:04 兵刃入鞘清脆金属死锁“咔哒”声`;

  // Build Part 1: Storyboard breakdown
  let part1 = `【第一部分：Video-Shotcraft 动作电影分镜工坊（5-Shot 工业级配方拆解）】\n\n`;
  part1 += `【色彩与光影基调】：\n`;
  part1 += `- 常态环境底色：${colorGrading.baseDesc} (基准值 ${colorGrading.baseColor})\n`;
  part1 += `- 招式能量高光：${colorGrading.highlightDesc} (基准值 ${colorGrading.highlightColor})\n`;
  part1 += `- 极招天地变色：${colorGrading.burstDesc} (基准值 ${colorGrading.burstColor})\n\n`;

  // Append each shot in part 1
  shotSequence.forEach((item) => {
    part1 += `### [${item.shotName}]\n`;
    part1 += `- **【分镜配方 (Shot Recipe)】**：${item.recipe.name} (${item.recipe.nameEn}) | 能量等级：🔥 ${item.recipe.energyLevel}/5 | 建议时长：${item.recipe.durationSec}s\n`;
    part1 += `- **【空间站位记忆点】**：${item.spatialAnchor}\n`;
    part1 += `- **【分镜动作发力】**：${item.storyboard}\n`;
    part1 += `- **【运镜动力学】**：${item.cameraSpecs}\n`;
    part1 += `- **【音效与卡点 (Sound Cues)】**：${item.soundDesign}\n`;
    part1 += `- **【Remotion 动效参数】**：\`${item.recipe.remotionKinematics}\`\n\n`;
  });

  // Build Part 2: AI Video/Image Prompts
  let part2 = `【第二部分：AI视频 / 生图通用Prompt清单与工坊导出】\n\n`;

  const spatialPromptEn = `spatial anchoring coordinates locked: character firmly anchored at (${verticalAnchor}), interacting with landmark (${envCoords}), geometric dynamic silhouette forming ${geoSilhouette}, surrounded by spatial disruption vacuum field (${fieldDisruption})`;

  const ultimatePromptEn = ultimateMove
    ? `Ultimate Move triggered: [${ultimateMove.name}], exact mouth shouting shape articulating "${ultimateMove.name}", strictly static facial framing without camera pans, intense energy surge: ${ultimateMove.charging}, explosive burst: ${ultimateMove.execution}`
    : `kinetic action choreography: ${coreAction.name}, high-speed close-quarters martial arts combat, crisp impact, ground fracture`;

  const positivePromptEn = `${cinemaKeywords}, ${spatialPromptEn}, dynamic martial arts cinematic action sequence, ${ultimatePromptEn}, color palette with muted base tones (${colorGrading.baseColor}), explosive high-contrast energy highlights (${colorGrading.highlightColor}), 0.1s overexposure flash frame, 0.3s screen shake decay, photorealistic Hollywood blockbuster aesthetics, 8k resolution.`;

  const positivePromptZh = `好莱坞顶级动作电影质感，ARRI Alexa 65工业级摄影机，4K分辨率，24fps，35mm变形镜头，IMAX画幅，胶质颗粒感与悬浮灰尘微粒，自然日光与真实引信照明，真实物理惯性运镜与受控微晃，加速度动态模糊，打击微滞与时间顿挫。全局空间站位记忆点锁定：${verticalAnchor}，以${envCoords}为参照系，肢体剪影呈${geoSilhouette}，周身形成${fieldDisruption}。${
    ultimateMove
      ? `终极奥义释放【${ultimateMove.name}】，口型清晰断喝招式名，无杂余运镜面部特写，${ultimateMove.charging}，${ultimateMove.execution}`
      : `核心动作：【${coreAction.name}】，${coreAction.description}`
  }，环境强力破碎反馈，地表崩裂，碎石浮空，0.1秒全屏闪白与0.3秒气浪震颤，高燃超写实电影画面。`;

  part2 += `### 1. 全局英文提示词 (Positive Prompt - 适配 Kling / Sora / Runway Gen-3 / Midjourney):\n`;
  part2 += `\`\`\`text\n${positivePromptEn}\n\`\`\`\n\n`;

  part2 += `### 2. 全局中文提示词 (Positive Prompt - 适配 豆包 / 即梦 / 通义万相):\n`;
  part2 += `\`\`\`text\n${positivePromptZh}\n\`\`\`\n\n`;

  part2 += `### 3. 多镜头分镜单独 Prompt 序列 (Multi-Shot Prompts):\n`;
  shotSequence.forEach((s) => {
    part2 += `#### Shot ${s.shotNumber}: ${s.shotName}\n`;
    part2 += `\`\`\`text\n${s.promptEn}\n\`\`\`\n\n`;
  });

  part2 += `### 4. Video-Shotcraft Remotion 时间线配置 (JSON):\n`;
  part2 += `\`\`\`json\n${remotionTimelineJson}\n\`\`\`\n\n`;

  part2 += `### 5. 电影级负面提示词 (Negative Prompt - 必须固定输出):\n`;
  part2 += `\`\`\`text\n${DEFAULT_NEGATIVE_PROMPT}\n\`\`\`\n`;

  const fullMarkdown = `\`\`\`markdown\n${part1}${part2}\`\`\``;

  return {
    markdownOutput: fullMarkdown,
    part1Storyboard: part1,
    part2Prompt: part2,
    positivePromptEn,
    positivePromptZh,
    negativePrompt: DEFAULT_NEGATIVE_PROMPT,
    spatialAnchorsFormatted: `${verticalAnchor} | ${envCoords} | ${geoSilhouette} | ${fieldDisruption}`,
    triggeredUltimate: ultimateMove,
    triggeredCoreAction: coreAction,
    generationMode,
    shotSequence,
    shotcraftRemotionTimeline: remotionTimelineJson,
    shotcraftJianyingDraft: jianyingDraftText
  };
}
