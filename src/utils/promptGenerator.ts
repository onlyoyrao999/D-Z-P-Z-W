import {
  PromptGenerationRequest,
  PromptGenerationResponse,
  UltimateMove,
  CoreAction,
  ShotSequenceItem,
  TargetVideoModel
} from '../types';
import { CORE_ACTIONS } from '../data/coreActions';
import { ULTIMATE_MOVES } from '../data/ultimateMoves';
import { SHOT_RECIPES, SHOT_RECIPE_MAP } from '../data/shotRecipes';
import {
  FIGHT_DIRECTOR_META,
  DEFAULT_DIRECTOR_SETTINGS,
  ACTION_INTENSITY_PRESETS,
  MODEL_COMPILER_PRESETS
} from '../data/fightDirectorData';

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
    generationMode = 'shotcraft_sequence',
    directorSettings = DEFAULT_DIRECTOR_SETTINGS
  } = req;

  const targetModel: TargetVideoModel = directorSettings.targetModel || 'seedance';
  const intensity = directorSettings.intensity || 4;
  const charA = directorSettings.characterA || DEFAULT_DIRECTOR_SETTINGS.characterA;
  const charB = directorSettings.characterB || DEFAULT_DIRECTOR_SETTINGS.characterB;

  // Find selected core action or detect from draft
  let coreAction: CoreAction | undefined = CORE_ACTIONS.find(
    (a) => a.id === actionCoreId
  );
  if (!coreAction) {
    coreAction = CORE_ACTIONS.find(
      (a) => draftText.includes(a.name) || a.tags.some((t) => draftText.includes(t))
    ) || CORE_ACTIONS[7]; // #8 拔刀破空瞬斩
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
      ultimateMove = ULTIMATE_MOVES[6]; // 天霜拳 · 傲雪凌霜
    }
  }

  // Spatial anchor coordinates
  const verticalAnchor =
    spatialAnchors.verticalAnchor.trim() || '双足死扣凹凸青石地表，下陷三寸，受力点扎实稳固';
  const envCoords =
    spatialAnchors.environmentalCoordinates.trim() ||
    '背依残破古刹断壁中轴线，距离中央香炉基座三步之遥';
  const geoSilhouette =
    spatialAnchors.geometricSilhouette.trim() ||
    '弓步拧腰呈对角线撕裂姿态，兵刃中轴笔挺，构成强识别几何对冲角';
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
    'action causality dynamics',
    'acceleration-based motion blur during peak combat strikes',
    'hit stop timing',
    'speed ramp impact',
    'hyper-detailed fluid cloth physics',
    'realistic hair simulation',
    'rigid body debris dynamics'
  ].join(', ');

  // 1. Build Shot Sequence (Combining fight-prompt-director with Shotcraft & Core actions)
  const shotSequence: ShotSequenceItem[] = [];
  const recipe1 = SHOT_RECIPE_MAP['src_01'];
  const recipe2 = SHOT_RECIPE_MAP['src_03'];
  const recipe3 = SHOT_RECIPE_MAP['src_05'];
  const recipe4 = ultimateMove ? SHOT_RECIPE_MAP['src_07'] : SHOT_RECIPE_MAP['src_06'];
  const recipe5 = SHOT_RECIPE_MAP['src_09'];

  // Timecode generator based on target model
  const getTimecode = (shotIdx: number, startSec: number, endSec: number) => {
    if (targetModel === 'minimax_h3') {
      const formatSec = (s: number) => {
        const mins = Math.floor(s / 60).toString().padStart(2, '0');
        const secs = (s % 60).toFixed(2).padStart(5, '0');
        return `${mins}:${secs}`;
      };
      return `${formatSec(startSec)} - ${formatSec(endSec)}`;
    }
    if (targetModel === 'seedance') {
      const formatSec = (s: number) => {
        const mins = Math.floor(s / 60).toString().padStart(2, '0');
        const secs = Math.floor(s % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
      };
      return `[${formatSec(startSec)} - ${formatSec(endSec)}]`;
    }
    return `Shot ${shotIdx}`;
  };

  // Shot 1
  shotSequence.push({
    shotNumber: 1,
    shotName: '起势锁定 · 空间绝对坐标与对峙暗涌 (Grounding Lock & Standoff)',
    recipe: recipe1,
    timecodeBlock: getTimecode(1, 0, 2.5),
    storyboard: `【动作因果律】：${charA.name}（位于画面左侧）与 ${charB.name}（位于画面右侧）沿中轴线隔空三丈对峙。双方周身气压骤降，形成半径两米真空场域。微风卷动尘土，但二人衣角受内力镇压呈现刚性静止。`,
    spatialAnchor: `${verticalAnchor}，以${envCoords}为绝对基线，180°摄影机轴线严格置于正面侧角。`,
    cameraSpecs: `${recipe1.framing} | ${recipe1.cameraTrajectory}`,
    soundDesign: targetModel === 'minimax_h3'
      ? '[L-Channel: 左侧风啸沙砾摩擦] + [R-Channel: 右侧衣袂暗劲微鸣] + [Center: 0.8s 重力下陷低频音]'
      : recipe1.soundCues.join('；'),
    promptEn: `${cinemaKeywords}, wide shot establishing grounding, two martial artists in tense standoff, Character A on screen left (${charA.weapon}), Character B on screen right (${charB.weapon}), spatial coordinates locked at (${verticalAnchor}), environmental landmark (${envCoords}), geometric silhouette (${geoSilhouette}), natural overcast daylight (${colorGrading.baseColor}), atmospheric dust suspended, photorealistic action choreography, 8k.`,
    promptZh: `【Shot 1】起势建置：ARRI Alexa 65广角中景，动作导演空间方位死锁：左侧${charA.name}与右侧${charB.name}，参照系：${envCoords}，重力锚定：${verticalAnchor}，风沙悬浮，真实物理惯性。`
  });

  // Shot 2
  shotSequence.push({
    shotNumber: 2,
    shotName: '破风身法 · 极速空中追击与超频变向 (Pursuit & Motion Shift)',
    recipe: recipe2,
    timecodeBlock: getTimecode(2, 2.5, 5.7),
    storyboard: `【动作因果律】：${charA.name}率先发难，沉步踏碎青石产生强烈地面反作用力，化为残影破空疾驰；${charB.name}感应气流突变，侧身挑步后撤步法飘逸。摄影机贴背空中跟拍，在越肩瞬间 0.2s 极速甩镜（Whip Pan）重新咬死正面。`,
    spatialAnchor: `沿古刹中轴线向前方石阶疾驰，脚踏碎石飞溅，剪影呈低伏对角撕裂线。`,
    cameraSpecs: `${recipe2.framing} | ${recipe2.cameraTrajectory}`,
    soundDesign: targetModel === 'minimax_h3'
      ? '[Center: 0.3s 踏石破空音爆] -> [Pan L-to-R: 1.6s 甩镜风压撕裂] -> [Center: 2.1s 锁喉重音击]'
      : recipe2.soundCues.join('；'),
    promptEn: `${cinemaKeywords}, aggressive rear 3/4 aerial tracking shot following Character A dashing forward, Character B reacting with agile retreat, supersonic air streak vectors, rapid 0.2s whip pan camera transition to front chest framing, motion blur during peak acceleration, ultra-sharp facial focus, 8k.`,
    promptZh: `【Shot 2】身法破风：空中后侧45度高速跟拍，动作因果律：A发起突进B变招闪避，气流拉丝，极速甩镜180度重新锁定面门，加速度动态模糊转高清发丝细节。`
  });

  // Shot 3
  shotSequence.push({
    shotNumber: 3,
    shotName: `硬核交锋 · #${coreAction.number} ${coreAction.name} (Kinetic Clash & Orbit)`,
    recipe: recipe3,
    timecodeBlock: getTimecode(3, 5.7, 8.5),
    storyboard: `【动作因果律】：${charA.name}与${charB.name}兵刃正面狂暴相撞！${coreAction.description} 兵刃撞击点迸发刺目引信火花，反作用力迫使双臂肌肉剧烈紧绷，脚掌在青石板滑出焦黑深槽。摄影机以火花切线为轴心 90° 受控高速环绕。`,
    spatialAnchor: `双人交击点位于断壁中央三步处，脚掌硬撑地面擦出焦痕。`,
    cameraSpecs: `${recipe3.framing} | ${recipe3.cameraTrajectory}`,
    soundDesign: targetModel === 'minimax_h3'
      ? '[Center: 0.1s 重型金属相撞爆鸣] -> [Stereo: 0.4s-1.5s 刃口摩擦尖叫] -> [Sub-Bass: 1.0s 罡气震荡]'
      : recipe3.soundCues.join('；'),
    promptEn: `${cinemaKeywords}, intense close-quarters martial arts weapon clash between Character A and Character B, sparks flying from blade contact, 90-degree controlled momentary orbit around weapon contact point, 0.1s hit stop impact, heatwave distortion, high contrast highlight (${colorGrading.highlightColor}), photorealistic kinetic combat, 8k.`,
    promptZh: `【Shot 3】硬核碰撞：${coreAction.name}，兵刃相击火花四射，受控环绕运镜，0.1秒时空微滞与肌肉紧绷受力形变，地面划痕冒烟。`
  });

  // Shot 4
  shotSequence.push({
    shotNumber: 4,
    shotName: ultimateMove
      ? `终极奥义 · ${ultimateMove.name} (Hit-Stop Crash-In Blast)`
      : `决胜一击 · 震天破岳 (Climax Slam)`,
    recipe: recipe4,
    timecodeBlock: getTimecode(4, 8.5, 12.5),
    storyboard: ultimateMove
      ? `【动作因果律 & 终极奥义铁律】：严格剔除运镜与面部神态！【空间站位】：${ultimateMove.spatialAnchor}。【起手式】：${ultimateMove.startPose}。【蓄力中】：${ultimateMove.charging}。【口型喊名】：${ultimateMove.shouting}。【轰然出招】：${ultimateMove.execution}。狂暴冲击波将对手击飞震穿石壁，全屏闪白 0.15s。`
      : `【动作因果律】：倾注全身气劲打出决胜重击，对手受力形变倒飞五丈，地面崩裂，同心圆气浪席卷全场。`,
    spatialAnchor: ultimateMove ? ultimateMove.spatialAnchor : `立于深坑边缘，双臂大张呈十字刚性构图。`,
    cameraSpecs: `${recipe4.framing} | ${recipe4.cameraTrajectory}`,
    soundDesign: targetModel === 'minimax_h3'
      ? '[Center: 1.2s 蓄力吸音真空倒吸] -> [Voice: 1.8s 口型断喝] -> [Titan Sub-Bass: 2.0s 极核音爆] -> [Stereo: 2.2s 碎石呼啸]'
      : recipe4.soundCues.join('；'),
    promptEn: ultimateMove
      ? `${cinemaKeywords}, 2.39:1 anamorphic extreme crash zoom into ultimate energy core, character shouting "${ultimateMove.name}" with exact mouth movement, strictly static facial composition, explosive shockwave (${colorGrading.burstColor}), 0.15s overexposure flash, 0.3s camera shake decay, shattered floating boulders, 8k.`
      : `${cinemaKeywords}, massive kinetic impact blast, shockwave tearing through ancient ruins, ground fracture, flash overexposure, screen shake, photorealistic movie climax, 8k.`,
    promptZh: ultimateMove
      ? `【Shot 4】终极奥义：【${ultimateMove.name}】，口型断喝招式名，极推进能量奇点，0.15秒全屏闪白与0.3秒气浪剧震，碎石悬浮，对手倒飞穿石。`
      : `【Shot 4】极招爆发：全屏闪白高光，同心圆冲击波扫开二十丈，镜头剧烈震颤。`
  });

  // Shot 5
  shotSequence.push({
    shotNumber: 5,
    shotName: '缓释收势 · 碎石坠落与战损收刀 (Aftermath Deceleration & Continuity)',
    recipe: recipe5,
    timecodeBlock: getTimecode(5, 12.5, 15.5),
    storyboard: `【跨镜头连续性】：狂暴能量渐歇，悬浮的碎石如骤雨缓落。地面焦黑深坑冒出滚滚余热白烟。胜者背对镜头从容收刀入鞘，兵刃最后一寸发出清脆金属卡点声；败者扶壁站立，衣襟破损血迹保持连贯。丁达尔光束穿透硝烟。`,
    spatialAnchor: `伫立于崩塌石坑中心，背对镜头，衣袂随残风自然拂动。`,
    cameraSpecs: `${recipe5.framing} | ${recipe5.cameraTrajectory}`,
    soundDesign: targetModel === 'minimax_h3'
      ? '[Center: 0.0s-3.0s 残余气流微风] -> [Stereo: 0.8s, 1.4s 碎石砸地雨] -> [Center Click: 2.6s 兵刃入鞘金属死锁卡点]'
      : recipe5.soundCues.join('；'),
    promptEn: `${cinemaKeywords}, slow pedestal up and dolly out, floating stone debris falling like rain, martial artist sheathing sword with precise metal click, battle damage continuity, smoke and dust dissipating in tyndall sunlight beams, cinematic aftermath serenity, 8k.`,
    promptZh: `【Shot 5】余波收势：缓慢拉远升镜，悬浮碎石如雨缓落，兵刃入鞘卡点，战损与破损衣物连续性保持，烟尘在自然天光中散开，厚重电影余韵。`
  });

  // Remotion Timeline JSON & Jianying format
  const remotionTimelineJson = JSON.stringify(
    {
      directorFramework: 'FightPromptDirector_VideoShotcraft_Hybrid',
      primarySkill: FIGHT_DIRECTOR_META.primarySkillName,
      primaryRepo: FIGHT_DIRECTOR_META.primarySkillRepo,
      targetModel: MODEL_COMPILER_PRESETS[targetModel].name,
      intensityLevel: intensity,
      fps: 24,
      aspectRatio: '2.39:1',
      totalDurationSeconds: 15.5,
      totalFrames: 372,
      characterProfiles: {
        characterA: charA,
        characterB: charB
      },
      shots: shotSequence.map((s, idx) => ({
        shotIndex: idx + 1,
        timecode: s.timecodeBlock,
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

  const jianyingDraftText = `【剪映 / CapCut 动作导演分轨工程】
🎬 导演规范: ${FIGHT_DIRECTOR_META.primarySkillName} (irenerachel) × Video-Shotcraft
🎯 目标模型: ${MODEL_COMPILER_PRESETS[targetModel].name} | 烈度: 🔥 Level ${intensity}
⏱️ 总时长: 15.5s (24 fps) | 画幅: 2.39:1 电影宽银幕
📹 视频主轨 (Video Track):
  - [00:00 - 02:12] Shot 1: 起势锁定 (SRC-01) -> 空间坐标死锁 + 180°轴线建立
  - [02:12 - 05:16] Shot 2: 破风身法 (SRC-03) -> 0.2s 甩镜转场 (Whip Pan) + 超频跟拍
  - [05:16 - 08:08] Shot 3: 硬核交锋 (SRC-05) -> 0.1s 时空微滞 (Hit Stop) + 切线环绕
  - [08:08 - 12:08] Shot 4: 终极奥义 (SRC-07) -> 0.15s 闪白转场 + 0.3s 画面剧震
  - [12:08 - 15:12] Shot 5: 缓释收势 (SRC-09) -> 丁达尔体积光 + 战损连续性

🔊 双声道音频分轨 (Stereo Sound Stems):
  - Track 1 (环境/风压): 00:00 - 15:12 (低频自然风啸 + 空谷回音)
  - Track 2 (打击/音效):
    * 03:00 气流音爆破空
    * 05:20 重金铁相撞刺耳爆鸣 (Heavy Metal Clang)
    * 09:12 终极奥义吸音真空倒吸 -> 09:20 钛合金次低音极核音爆
    * 14:04 兵刃入鞘清脆金属死锁“咔哒”声`;

  // Build Part 1: Action Director Storyboard Breakdown
  let part1 = `【第一部分：AI 动作导演分镜工坊（${MODEL_COMPILER_PRESETS[targetModel].name}）】\n\n`;
  part1 += `> **主要底层驱动**：${FIGHT_DIRECTOR_META.primarySkillName} (${FIGHT_DIRECTOR_META.primarySkillRepo})\n`;
  part1 += `> **次要支撑模块**：Video-Shotcraft 分镜配方库 + 顶级动作 32 式/111 式终极奥义库\n`;
  part1 += `> **动作烈度评级**：${ACTION_INTENSITY_PRESETS[intensity].label} (${ACTION_INTENSITY_PRESETS[intensity].desc})\n\n`;

  part1 += `### 🎬 动作导演四大核心铁律校验：\n`;
  part1 += `1. **动作因果律 (Action Causality)**：已注入全链路攻防发力、受力形变、动能传递与环境破坏反馈。\n`;
  part1 += `2. **角色特征谱差异 (Character Profiles)**：\n`;
  part1 += `   - **${charA.name}**：${charA.weapon} | 风格：${charA.style} | 特征：${charA.physicalTraits}\n`;
  part1 += `   - **${charB.name}**：${charB.weapon} | 风格：${charB.style} | 特征：${charB.physicalTraits}\n`;
  part1 += `3. **空间方位与 180° 轴线 (Spatial Direction & Axis)**：左侧 A 对峙右侧 B，摄影机始终保持同侧机位，严禁越轴跳切。\n`;
  part1 += `4. **跨镜头连续性 (Cross-Shot Continuity)**：衣衫撕裂、地面深槽焦痕、血迹与武器受损状态全局继承。\n\n`;

  part1 += `【色彩与光影基调】：\n`;
  part1 += `- 常态底色：${colorGrading.baseDesc} (${colorGrading.baseColor})\n`;
  part1 += `- 招式高光：${colorGrading.highlightDesc} (${colorGrading.highlightColor})\n`;
  part1 += `- 极招变色：${colorGrading.burstDesc} (${colorGrading.burstColor})\n\n`;

  // Append each shot in part 1
  shotSequence.forEach((item) => {
    part1 += `### ${item.timecodeBlock} ${item.shotName}\n`;
    part1 += `- **【分镜配方】**：${item.recipe.name} (${item.recipe.nameEn}) | 能量：🔥 ${item.recipe.energyLevel}/5 | 时长：${item.recipe.durationSec}s\n`;
    part1 += `- **【空间站位记忆点】**：${item.spatialAnchor}\n`;
    part1 += `- **【动作发力与因果律】**：${item.storyboard}\n`;
    part1 += `- **【摄影机职责与运镜】**：${item.cameraSpecs}\n`;
    part1 += `- **【音效与卡点 (Sound Cues)】**：${item.soundDesign}\n`;
    part1 += `- **【Remotion 动效参数】**：\`${item.recipe.remotionKinematics}\`\n\n`;
  });

  // Build Part 2: AI Video/Image Prompts
  let part2 = `【第二部分：AI视频 / 生图通用Prompt清单与工坊导出】\n\n`;

  const spatialPromptEn = `spatial anchoring coordinates locked: character firmly anchored at (${verticalAnchor}), interacting with landmark (${envCoords}), geometric dynamic silhouette forming ${geoSilhouette}, surrounded by spatial disruption vacuum field (${fieldDisruption})`;

  const ultimatePromptEn = ultimateMove
    ? `Ultimate Move triggered: [${ultimateMove.name}], exact mouth shouting shape articulating "${ultimateMove.name}", strictly static facial framing without camera pans, intense energy surge: ${ultimateMove.charging}, explosive burst: ${ultimateMove.execution}`
    : `kinetic action choreography: ${coreAction.name}, high-speed close-quarters martial arts combat, crisp impact, ground fracture`;

  const positivePromptEn = `${cinemaKeywords}, ${spatialPromptEn}, dynamic martial arts cinematic action sequence, Character A (${charA.weapon}) battling Character B (${charB.weapon}), strict action causality and physical impact, ${ultimatePromptEn}, color palette with muted base tones (${colorGrading.baseColor}), explosive high-contrast energy highlights (${colorGrading.highlightColor}), 0.1s overexposure flash frame, 0.3s screen shake decay, photorealistic Hollywood blockbuster aesthetics, 8k resolution.`;

  const positivePromptZh = `好莱坞顶级动作电影质感，ARRI Alexa 65工业级摄影机，4K分辨率，24fps，35mm变形镜头，IMAX画幅，胶质颗粒感与悬浮灰尘微粒，自然日光与真实引信照明，真实物理惯性运镜与受控微晃，严格动作因果律与受力形变。空间死锁：${verticalAnchor}，参照系：${envCoords}，剪影呈${geoSilhouette}，周身${fieldDisruption}。左侧${charA.name}对决右侧${charB.name}。${
    ultimateMove
      ? `终极奥义释放【${ultimateMove.name}】，口型清晰断喝招式名，无杂余运镜面部特写，${ultimateMove.charging}，${ultimateMove.execution}`
      : `核心动作：【${coreAction.name}】，${coreAction.description}`
  }，环境强力破碎反馈，地表崩裂，碎石浮空，0.1秒全屏闪白与0.3秒气浪震颤，高燃超写实电影画面。`;

  part2 += `### 1. 全局英文提示词 (Positive Prompt - 适配 Kling / Sora / Runway Gen-3 / Midjourney):\n`;
  part2 += `\`\`\`text\n${positivePromptEn}\n\`\`\`\n\n`;

  part2 += `### 2. 全局中文提示词 (Positive Prompt - 适配 豆包 / 即梦 / 通义万相):\n`;
  part2 += `\`\`\`text\n${positivePromptZh}\n\`\`\`\n\n`;

  part2 += `### 3. ${MODEL_COMPILER_PRESETS[targetModel].name} 专属多镜头 Prompt 序列:\n`;
  shotSequence.forEach((s) => {
    part2 += `#### ${s.timecodeBlock} ${s.shotName}\n`;
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
    shotcraftJianyingDraft: jianyingDraftText,
    directorAnalysis: {
      primarySkill: FIGHT_DIRECTOR_META.primarySkillName,
      secondarySkills: [
        'Video-Shotcraft 电影分镜工坊 (Vincentwei1021/video-shotcraft)',
        '顶级动作 32式动作库 & 111式终极奥义库 (onlyno999)'
      ],
      actionCausalityChain: [
        `1. 动作发起：${charA.name} 踏石起步，动能经由沉腰转髋传导至 ${charA.weapon}`,
        `2. 防守变招：${charB.name} 预判剑路，侧身卸力，兵刃在 0.08s 内完成格挡变线`,
        `3. 动能对冲：兵刃交击点爆发出引信火花，反作用力迫使双方脚下青石龟裂下陷`,
        `4. 极招释放：${ultimateMove ? `触发终极奥义【${ultimateMove.name}】，0.15s闪白气浪排开` : '打出重击产生同心圆冲击波'}`
      ],
      spatialAxisCheck: '摄影机全程保持在 180° 对峙线正前方 35° 夹角内，角色 A 始终居左，角色 B 始终居右，严格无越轴跳切。',
      targetModelCompilation: MODEL_COMPILER_PRESETS[targetModel].name,
      characterAChoreography: `${charA.name} (${charA.weapon}): ${charA.style}`,
      characterBChoreography: `${charB.name} (${charB.weapon}): ${charB.style}`
    }
  };
}
