import {
  PromptGenerationRequest,
  PromptGenerationResponse,
  UltimateMove,
  CoreAction
} from '../types';
import { CORE_ACTIONS } from '../data/coreActions';
import { ULTIMATE_MOVES } from '../data/ultimateMoves';

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
    isUltimateTriggered
  } = req;

  // Find selected core action or detect from draft
  let coreAction: CoreAction | undefined = CORE_ACTIONS.find(
    (a) => a.id === actionCoreId
  );
  if (!coreAction) {
    // match by draft text keyword
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
      // detect by text
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

  // Build Part 1: Storyboard breakdown
  let part1 = `【第一部分：分镜动作细化（剧本扩写与色彩运镜规划）】\n\n`;
  part1 += `【色彩与光影基调】：\n`;
  part1 += `- 常态环境底色：${colorGrading.baseDesc} (基准值 ${colorGrading.baseColor})\n`;
  part1 += `- 招式能量高光：${colorGrading.highlightDesc} (基准值 ${colorGrading.highlightColor})\n`;
  part1 += `- 极招天地变色：${colorGrading.burstDesc} (基准值 ${colorGrading.burstColor})\n\n`;

  // Shot 1: 站位锚定与起势蓄力
  part1 += `[镜头一：起手式 · 空间站位锁定]\n`;
  part1 += `- 【空间站位记忆点】：\n`;
  part1 += `  · 接触状态：${verticalAnchor}。\n`;
  part1 += `  · 环境坐标：${envCoords}。\n`;
  part1 += `  · 构图剪影：${geoSilhouette}。\n`;
  part1 += `  · 场域断层：${fieldDisruption}。\n`;
  part1 += `- 【发力逻辑】：重心自足跟沿踝关节微旋扣死地面，腰背大筋紧绷如张满之角弓，双肩下沉，内劲自丹田节节贯通贯注至指掌寸关。\n`;
  part1 += `- 【运镜与质感】：ARRI Alexa 65，35mm 变形镜头，前侧四分之三空中跟拍缓缓推进，保持真实物理微晃，悬浮大气微尘在自然天光下清晰可见。\n`;
  part1 += `- 【冲击元素】：0.1秒蓄力微滞 (Hit Stop)，空气受压迫形成细微水波折射。\n\n`;

  // Shot 2: 核心动作博弈
  part1 += `[镜头二：核心动作交锋 · 动作核心：#${coreAction.number} ${coreAction.name}]\n`;
  part1 += `- 【空间站位记忆点】：人物自初始坐标瞬步突进四米，脚掌在青石表面擦出两道焦黑划痕，身体与袭来的兵刃切线呈三十度锐角斜切。\n`;
  part1 += `- 【动作拆解与发力】：${coreAction.description}\n`;
  part1 += `- 【摄影机运动】：${coreAction.cameraMovement} 执行高速度追踪：追击 → 瞬间跟丢 → 越过目标 → 极速甩镜 (Whip Pan) 重新锁头。\n`;
  part1 += `- 【视觉强化四要素】：\n`;
  part1 += `  · 爆发冲击帧：相撞瞬间 0.1 秒全屏闪白高光 (${colorGrading.highlightColor})，迸发环状气浪。\n`;
  part1 += `  · 镜头震颤：机位受气浪对撞剧烈震颤持续 0.3 秒，振幅先强后弱平稳缓释。\n`;
  part1 += `  · 环境物理反馈：${coreAction.lightingAndVFX}，坚硬地面崩裂凹陷，碎石脱离重力浮空三寸。\n`;
  part1 += `  · 顿挫节奏：峰值加速度伴随真实运动模糊 (Motion Blur)，碰撞瞬间 0.1 秒时间停滞顿挫 (Hit Stop)。\n\n`;

  // Shot 3: 终极奥义 or 绝杀收招
  if (ultimateMove) {
    part1 += `[镜头三：终极奥义调用 · ${ultimateMove.name}]\n`;
    part1 += `（注：严格执行奥义铁律，坚决剔除一切摄影机推拉摇移运镜术语与面部表情眼神神态，仅保留纯粹口型喊名与空间站位记忆点）\n\n`;
    part1 += `【空间站位记忆点】：${ultimateMove.spatialAnchor}\n`;
    part1 += `【起手式】：${ultimateMove.startPose}\n`;
    part1 += `【蓄力中】：${ultimateMove.charging}\n`;
    part1 += `【口型喊名】：${ultimateMove.shouting}\n`;
    part1 += `【轰然出招】：${ultimateMove.execution}\n\n`;
  } else {
    part1 += `[镜头三：回马绝杀 · 破势定乾坤]\n`;
    part1 += `- 【空间站位记忆点】：借反冲力倒滑稳立于石阶第七级，单手反背，另一手斜指三尺虚空，周身落叶呈圆环状被震飞五米开外。\n`;
    part1 += `- 【发力逻辑】：腰胯猛然发力拧转，整条脊椎如巨龙甩尾将周身残余动能全数灌注，形成刚猛无俦的阻绝气界。\n`;
    part1 += `- 【运镜动力学】：广角运镜 (Wide-angle kinetic sweep) 伴随受控平缓环绕，收招定格瞬间恢复发丝级超清晰胶片质感。\n`;
    part1 += `- 【环境反馈】：地面裂缝蔓延至断墙边缘，硝烟缓缓散开，气流在周身恢复自然流转。\n\n`;
  }

  // Build Part 2: AI Video/Image Prompts
  let part2 = `【第二部分：AI视频/生图通用Prompt清单】\n\n`;

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

  part2 += `### 1. 英文通用提示词 (Positive Prompt - 适配 Kling / Sora / Runway / Midjourney):\n`;
  part2 += `\`\`\`text\n${positivePromptEn}\n\`\`\`\n\n`;

  part2 += `### 2. 中文通用提示词 (Positive Prompt - 适配 豆包 / 即梦 / 通义万相):\n`;
  part2 += `\`\`\`text\n${positivePromptZh}\n\`\`\`\n\n`;

  part2 += `### 3. 电影级负面提示词 (Negative Prompt - 必须固定输出):\n`;
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
    triggeredCoreAction: coreAction
  };
}
