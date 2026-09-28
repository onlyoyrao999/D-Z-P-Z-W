import { TargetVideoModel, ActionIntensityLevel, CharacterProfile, FightDirectorSettings } from '../types';

export const FIGHT_DIRECTOR_META = {
  primarySkillName: 'AI 动作导演 (Fight Prompt Director)',
  primarySkillRepo: 'https://github.com/irenerachel/fight-prompt-director',
  primaryAuthor: 'irenerachel',
  secondarySkills: [
    {
      name: 'Video-Shotcraft 电影分镜工坊',
      repo: 'https://github.com/Vincentwei1021/video-shotcraft',
      role: '分镜配方卡 (SRC-01~SRC-10) 与 Remotion / 剪映多轨时间线输出'
    },
    {
      name: '顶级动作高燃武打库 (onlyno999)',
      role: '32条高燃武打核心动作库 + 111式终极奥义绝学库 + 四大空间站位记忆点'
    }
  ],
  version: 'v2026.09-director-core-hybrid',
  lastUpdated: '2026-09-28'
};

export const DEFAULT_CHARACTER_A: CharacterProfile = {
  name: '角色 A (主攻/狂客)',
  role: 'initiator',
  weapon: '重型厚背断首刀 / 刚猛霸道体术',
  style: '大开大合，沉肩坠肘，爆发力与破坏力拉满，擅长近身崩山劲与力劈华山',
  physicalTraits: '黑袍猎猎，身姿微弓如蓄力猎豹，步伐沉重踏碎青石'
};

export const DEFAULT_CHARACTER_B: CharacterProfile = {
  name: '角色 B (应招/剑宿)',
  role: 'reactor',
  weapon: '三尺秋水软剑 / 灵动飘逸身法',
  style: '借力打力，侧身卸力，以柔克刚，擅长瞬身刺穴与回旋反刺',
  physicalTraits: '白衣胜雪，足尖点地虚浮半寸，面容冷峻如霜'
};

export const DEFAULT_DIRECTOR_SETTINGS: FightDirectorSettings = {
  targetModel: 'seedance',
  intensity: 4,
  characterA: DEFAULT_CHARACTER_A,
  characterB: DEFAULT_CHARACTER_B,
  actionCausality: true,
  spatialAxisRule: true,
  cameraResponsibility: '以攻防对冲中心点为绝对基准，优先捕捉发力起点与受力形变点',
  crossShotContinuity: true,
  directorVersion: FIGHT_DIRECTOR_META.version
};

export const ACTION_INTENSITY_PRESETS: Record<ActionIntensityLevel, { label: string; desc: string; energy: string }> = {
  1: {
    label: 'Level 1: 对峙暗涌 (Standoff & Tension)',
    desc: '呼吸微滞，剑拔弩张，气场死锁两米真空，仅有衣角微摆与微尘悬浮',
    energy: '低频蓄力 1.0x'
  },
  2: {
    label: 'Level 2: 试探试招 (Probing & Footwork)',
    desc: '滑步试探，单招拆解，贴地滑铲与垫步刺击，地面泥尘微量激荡',
    energy: '匀速机动 1.5x'
  },
  3: {
    label: 'Level 3: 连环交锋 (Intense Weapon Clashes)',
    desc: '十招以内密集攻防，刀剑相击引信火星持续迸发，0.08s 连环微滞',
    energy: '高频加速 2.5x'
  },
  4: {
    label: 'Level 4: 破防击飞 (Breaking Defense & Rupture)',
    desc: '重拳轰碎护体罡气，角色倒飞砸穿石壁，蛛网裂痕蔓延五丈，0.1s 顿挫',
    energy: '超频重击 3.5x'
  },
  5: {
    label: 'Level 5: 终极奥义 (Climax Finisher & Overcast)',
    desc: '全屏闪白 0.15s，天地变色，同心圆冲击波扫开二十丈，碎石反重力倒悬',
    energy: '极核震爆 5.0x'
  }
};

export const MODEL_COMPILER_PRESETS: Record<TargetVideoModel, { name: string; tag: string; description: string; timecodeFormat: string }> = {
  seedance: {
    name: 'ByteDance Seedance 2.5 / 2.0 编译规范',
    tag: 'Seedance 2.5 Continuous Flow',
    description: '采用粗粒度连续时段流 ([00:00 - 00:03])，强化跨动作多主体流体连贯性与长镜头动作因果律',
    timecodeFormat: '[00:00 - 00:03.5]'
  },
  minimax_h3: {
    name: 'MiniMax-H3 / Hailuo 3 编译规范',
    tag: 'MiniMax-H3 Precise Timecodes & Native Audio',
    description: '采用连续精密时码 (00:00.00 - 00:02.50)，注入原生双声道音效卡点与高频微打击顿挫 (Hit-Stops)',
    timecodeFormat: '00:00.00 - 00:02.50'
  },
  universal: {
    name: '通用电影级编译 (Sora / Kling / Runway Gen-3 / Midjourney)',
    tag: 'Universal Photorealistic Cinema',
    description: '采用好莱坞 ARRI Alexa 65 变形镜头全套 Prompt 规范，融合四大空间死锁与负面提示词',
    timecodeFormat: 'Shot 1 (Establishing)'
  }
};
