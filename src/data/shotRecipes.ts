import { ShotRecipe } from '../types';

export const SHOT_RECIPES: ShotRecipe[] = [
  // 1. 空间建置与锁定类 (Establishing & Grounding)
  {
    id: 'src_01',
    name: '绝对坐标静置建置卡',
    nameEn: 'Absolute Grounding Lock Recipe',
    category: 'establishing',
    purpose: '死锁人物与环境物理接触点（脚扣青石/坐落梁木），建立重力锚点与地貌参照系，防止首镜漂移。',
    energyLevel: 1,
    durationSec: 2.5,
    framing: '广角中景 (Wide Mid-Shot)，水平视线 (Eye Level) 略微仰角 5°',
    cameraTrajectory: '极慢匀速微推（0.05x Speed Dolly In），带 0.5% 手持真实物理微晃',
    motionRamp: '恒速无跳帧 (Linear 1.0x)，突显环境尘埃飘移与衣角物理重力沉降',
    soundCues: [
      '环境风鸣低频啸叫 [0.0s - 2.5s]',
      '脚踩碎石微弱摩擦重力音 [0.8s]',
      '衣物防风织物微弱拂动 [1.5s]'
    ],
    vfxLayers: [
      '悬浮大气尘土微粒 (Atmospheric Dust 24fps)',
      '自然阴翳漫射天光 (Overcast Soft Skylight)',
      '地面青砖潮湿冷反光 (Wet Stone Specular)'
    ],
    remotionKinematics: 'spring({ frame, fps: 24, config: { damping: 200, mass: 2 } }) + subtlePerlinShake(0.003)'
  },
  {
    id: 'src_02',
    name: '暴风前夕低空迫近卡',
    nameEn: 'Premonition Low Glider Recipe',
    category: 'establishing',
    purpose: '贴地 10cm 极低机位滑行，从兵刃锋刃或靴跟向主体头部上扬，营造极强窒息压迫感。',
    energyLevel: 2,
    durationSec: 3.0,
    framing: '极低角度仰拍 (Extreme Low-Angle Worm View) 贯穿至半身特写',
    cameraTrajectory: '贴地直线平移（Ground Skim）并在到达人物脚跟前 0.5 秒迅速向上仰摇（Tilt Up）',
    motionRamp: '平缓启动 (0.8x) → 接近脚踝时加速 (1.4x) → 锁喉定格 (1.0x)',
    soundCues: [
      '次低音嗡鸣由远及近 (Sub-Bass Drone Buildup) [0.0s - 2.8s]',
      '刀鞘内部簧片微颤低鸣 (Blade Sheath Tension) [2.2s]'
    ],
    vfxLayers: [
      '地表微尘被气场吹散涟漪',
      '冷暖对冲逆光硬轮廓 (Hard Rim Light)'
    ],
    remotionKinematics: 'interpolate(frame, [0, 48, 72], [y: 120, y: 30, y: 0], { extrapolateRight: "clamp" })'
  },

  // 2. 破空追击与身法加速类 (Pursuit & Acceleration)
  {
    id: 'src_03',
    name: '极速空中追击锁头卡',
    nameEn: 'High-Speed Aerial Headlock Pursuit',
    category: 'pursuit',
    purpose: '好莱坞经典空中追击序列：紧贴目标后背 → 速度超频跟丢 → 极速甩镜 (Whip Pan) → 重新锁定正面。',
    energyLevel: 4,
    durationSec: 3.2,
    framing: '四分之三侧后方空中跟拍 (Rear 3/4 Aerial Tracking) → 甩镜后切正面胸部景别',
    cameraTrajectory: '紧贴脊椎破空推进 → 越过肩膀虚化 → 0.2s 极速甩镜 180° → 重新咬合面门',
    motionRamp: '常规 (1.0x) → 爆发加速度 (3.0x + 动态模糊) → 重新锁定瞬间 (0.8x 高清发丝级细节)',
    soundCues: [
      '气流破空刺耳音爆啸叫 (Supersonic Whoosh) [0.4s]',
      '甩镜风压撕裂音 (Whip Air Cut) [1.6s]',
      '瞳孔锁定重低音重击 (Stinger Impact) [2.1s]'
    ],
    vfxLayers: [
      '拉丝状真空风刃流线 (Air Streak Particle Vectors)',
      '甩镜阶段受控运动模糊 (Directional Motion Blur Intensity 0.8)',
      '发丝衣袂高频飘摆模拟 (Fluid Hair Physics)'
    ],
    remotionKinematics: 'whipPanTransition({ durationInFrames: 6, blurAmount: 18, direction: "horizontal" })'
  },
  {
    id: 'src_04',
    name: '贴地滑步穿透跟拍卡',
    nameEn: 'Ground-Level Kinetic Slide Tracking',
    category: 'pursuit',
    purpose: '捕捉下盘重心极速下沉、贴地滑铲或扫堂腿的近地动能，地面碎石如弹幕横扫。',
    energyLevel: 3,
    durationSec: 2.2,
    framing: '侧向水平地平线机位 (Lateral Horizon Level Track)',
    cameraTrajectory: '与滑行速度严格等速平行横移（Lateral Dolly），距离地面仅 15cm',
    motionRamp: '突进瞬间 2.0x → 滑行制动 0.6x → 挑刀起身 1.2x',
    soundCues: [
      '靴底硬擦青石擦出火星撕扯音 (Gravel Slide Friction) [0.2s]',
      '扫堂腿撕裂空气风鸣 (Low Sweep Wind) [1.1s]'
    ],
    vfxLayers: [
      '靴底青石刮擦连续明亮引信火星 (Tinder Sparks)',
      '环状碎石泥尘从两侧向后喷溅 (Ejected Gravel Cloud)'
    ],
    remotionKinematics: 'spring({ frame, config: { velocity: 80, damping: 25, mass: 1 } })'
  },

  // 3. 硬核交锋与对冲博弈 (Clash & Standoff)
  {
    id: 'src_05',
    name: '刀剑切线受控环绕卡',
    nameEn: 'Blade-Tangent 45° Controlled Orbit',
    category: 'clash',
    purpose: '双强兵刃相交火花四溅的刹那，摄影机围绕撞击火花切线进行 90°~120° 受控高速环绕，展现双方紧绷肌肉与冷厉眼神。',
    energyLevel: 4,
    durationSec: 2.8,
    framing: '近景对峙构图 (Close-Up Confrontation Frame)，双人对角线割裂',
    cameraTrajectory: '以兵刃交击点为绝对圆心，进行 0.8 秒 90° 紧凑弧线环绕（Momentary Orbit）',
    motionRamp: '撞击瞬间 0.1s 时空微滞 (Hit Stop 0.1s) → 环绕阶段 1.8x → 分离弹开 2.5x',
    soundCues: [
      '重型金铁撞击刺耳爆鸣 (Heavy Metal Clang with Reverb) [0.1s]',
      '刀锋相互锯齿刮擦高频尖叫 (Blade Friction Shriek) [0.4s - 1.5s]',
      '罡气对抗低频震荡 (Aura Resonance Drone) [1.0s]'
    ],
    vfxLayers: [
      '物理火星连续反弹散落 (Bouncing Physics Sparks)',
      '兵刃切口处空气高温热浪扭曲 (Heatwave Distortion)',
      '冷蓝剑芒与暗红刀气在刃口剧烈泯灭'
    ],
    remotionKinematics: 'orbitCamera({ radius: 1.8, angleDelta: 90, centerAnchor: [0, 1.4, 0] })'
  },
  {
    id: 'src_06',
    name: '连续近身寸劲快切卡',
    nameEn: 'Close-Quarters Staccato Rapid Cuts',
    category: 'clash',
    purpose: '拳掌格挡、错骨反折、膝顶肘击的高频短打，配合快速推拉镜与撞击特写。',
    energyLevel: 4,
    durationSec: 2.6,
    framing: '交替切换：中近景手部格挡 → 极近景膝盖撞击 → 倾斜仰角 (Dutch Angle)',
    cameraTrajectory: '微推（Crash Zoom）结合受控手持颠簸（Handheld Jolt）',
    motionRamp: '打击点 0.08s 停顿 (Micro Hit-Stops) 配合连击阶梯式加速',
    soundCues: [
      '连续短促沉闷拳肉骨骼撞击声 (Bone Crack & Heavy Thuds) [0.2s, 0.6s, 1.1s, 1.7s]',
      '短促断喝呼吸发力音 (Kiai Exhale) [1.6s]'
    ],
    vfxLayers: [
      '每次打击点迸发白色微型气环 (Micro Compression Rings)',
      '衣物受拳风冲击产生的褶皱波纹'
    ],
    remotionKinematics: 'staccatoCameraPunch({ intensity: 1.2, decayFrames: 4 })'
  },

  // 4. 绝招奥义与极招爆发 (Climax & Ultimate Finish)
  {
    id: 'src_07',
    name: '变形极推进顿挫爆发卡',
    nameEn: 'Anamorphic Crash-In & 0.1s Hit Stop Blast',
    category: 'climax_ultimate',
    purpose: '【终极奥义专用核心配方】纯粹口型喊名与空间死锁，极推镜头直捣能量核心，0.1秒时空停滞后全屏闪白震爆！',
    energyLevel: 5,
    durationSec: 4.0,
    framing: '变形镜头极宽画幅 (2.39:1 Anamorphic)，从全身空间锚定直推至能量奇点/招式核心',
    cameraTrajectory: '极速推镜直刺核心（Rapid Crash Push-In）并在爆发瞬间后震回拉（Recoil Snap Back）',
    motionRamp: '起手式匀速 (1.0x) → 蓄力微滞凝固 (0.2x Hit-Stop) → 轰然出招 4.0x 极速释放',
    soundCues: [
      '招式蓄力吸纳周遭声响陷入绝对死寂 (Silence Inversion Vacuum) [1.2s - 1.8s]',
      '口型清晰断喝出招声 (Resonant Voice Cry) [1.8s]',
      '天崩地裂次低音极核炸裂音爆 (Titan Sub-Bass Detonation) [2.0s]',
      '万千碎石冰霜/剑气呼啸撕裂苍穹 (Debris & Energy Roar) [2.2s - 4.0s]'
    ],
    vfxLayers: [
      '爆发刹那 0.15s 全屏过曝闪白 (Overexposure White Flash)',
      '同心圆撕裂气浪冲击波横扫方圆二十丈 (Concentric Shockwave Wavefront)',
      '镜头受冲击产生先强后弱 0.3s 剧烈震颤 (Screen Shake Falloff)',
      '地面网状龟裂与巨石逆向悬浮 (Ground Fissure & Levitation)'
    ],
    remotionKinematics: 'crashZoomWithRecoil({ zoomFactor: 2.8, hitStopFrame: 36, recoilStrength: 1.5, shakeIntensity: 2.4 })'
  },
  {
    id: 'src_08',
    name: '天地变色逆光剪影终结卡',
    nameEn: 'Overcast Inversion Backlit Silhouette Finisher',
    category: 'climax_ultimate',
    purpose: '极招爆发引发天象巨变，环境光瞬间压暗为暴风暗调，主体化为锐利剪影，仅保留招式高亮能量割裂天幕。',
    energyLevel: 5,
    durationSec: 3.8,
    framing: '大远景 (Extreme Long Shot) 与特写双重景深对冲',
    cameraTrajectory: '从高空俯冲后骤停，转为大广角仰拍天幕中轴线',
    motionRamp: '慢动作凝固 (0.3x Slow Motion) 展现能量撕开云层全过程',
    soundCues: [
      '九天雷鸣滚滚合鸣 (Thunderclap Resonance) [0.5s]',
      '纯净能量光柱穿透天际破空声 (Heavenly Laser Pierce) [1.5s]',
      '方圆百丈气压骤降低鸣 [2.5s]'
    ],
    vfxLayers: [
      '背景天穹云海呈环状被排空 (Cloud Clearing Doughnut)',
      '高对比度刺眼纯白/琥珀金/紫黑能量光柱直贯云霄',
      '逆光主体边缘发光轮廓丝 (Edge Ray Tracing)'
    ],
    remotionKinematics: 'skyInversionGlow({ darkDrop: 0.85, beamIntensity: 3.0, rimLightThickness: 2 })'
  },

  // 5. 余波震颤与缓释收势 (Lingering & Aftermath)
  {
    id: 'src_09',
    name: '碎石倒悬缓降收势卡',
    nameEn: 'Debris Suspension & Sheathing Decel',
    category: 'lingering',
    purpose: '爆发结束，悬浮碎石失去气劲支撑如雨点坠落，主体极度克制收刀入鞘或垂手站立，动作恢复绝对稳定。',
    energyLevel: 2,
    durationSec: 3.0,
    framing: '中景 (Medium Shot)，人物背对镜头或侧身立于崩塌中心',
    cameraTrajectory: '极缓升高并缓慢拉远（Slow Pedestal Up & Dolly Out），伴随 0.2% 呼吸感微动',
    motionRamp: '减速缓释 (0.5x Slow-mo) 直至刀鞘合拢瞬间 (1.0x 清脆卡点)',
    soundCues: [
      '残余气流微风呼啸渐隐 [0.0s - 3.0s]',
      '碎石接连掉落砸地清脆声 (Pebble Rain Clatter) [0.8s, 1.4s, 2.1s]',
      '兵刃入鞘最后一寸“咔哒”金属死锁声 (Sheath Click) [2.6s]'
    ],
    vfxLayers: [
      '漫天悬浮微尘与青烟随风弥散 (Drifting Dust & Smoke Dissipation)',
      '地面焦黑深坑向外散发残余热浪蒸汽 (Steam from Impact Crater)',
      '中性自然天光穿透烟雾射入丁达尔光束 (Tyndall Light Beams)'
    ],
    remotionKinematics: 'dollyOutPedestal({ durationInFrames: 72, startScale: 1.15, endScale: 1.0, ease: "easeOutCubic" })'
  },
  {
    id: 'src_10',
    name: '烟尘撕裂逆光凝固卡',
    nameEn: 'Dust Rift Backlight Silhouette Recipe',
    category: 'lingering',
    purpose: '浓烈硝烟与碎石中，狂暴气流破开一道空隙，露出毫发无损的刚性站位与衣角微摆。',
    energyLevel: 1,
    durationSec: 2.5,
    framing: '正面过肩全景 (Over-The-Shoulder Full Shot)',
    cameraTrajectory: '绝对静止机位 (Static Lock-Off)，依靠烟尘流动制造视觉张力',
    motionRamp: '常速 1.0x 真实物理时间',
    soundCues: [
      '沉重粗粝的单次发力呼吸声 (Heavy Controlled Breath) [0.5s]',
      '远方飞鸟惊起拍翅声 [1.8s]'
    ],
    vfxLayers: [
      '厚重烟尘颗粒体积光遮罩 (Volumetric Fog Shadow)',
      '地表熔岩或冰晶渐次冷却凝固纹理'
    ],
    remotionKinematics: 'staticLockWithVolumetric({ fogSpeed: 0.02, beamAngle: 45 })'
  }
];

export const SHOT_RECIPE_MAP: Record<string, ShotRecipe> = Object.fromEntries(
  SHOT_RECIPES.map(r => [r.id, r])
);

// 5-Shot Classic Cinematic Sequence Template
export const DEFAULT_5_SHOT_PIPELINE = [
  { step: 1, name: 'Shot 1: 空间死锁与重力建置', recipeId: 'src_01', defaultPurpose: '锁定人物与地貌绝对坐标，杜绝无重力漂移' },
  { step: 2, name: 'Shot 2: 极速破风与身法切入', recipeId: 'src_03', defaultPurpose: '高速度空中追踪锁头，极速甩镜（Whip Pan）锁定' },
  { step: 3, name: 'Shot 3: 刀剑切线与狂暴对冲', recipeId: 'src_05', defaultPurpose: '火花四溅切线 90° 受控环绕，短打碰撞' },
  { step: 4, name: 'Shot 4: 终极奥义·顿挫极爆', recipeId: 'src_07', defaultPurpose: '极推核心、0.1s时空停滞、全屏闪白与同心圆气浪' },
  { step: 5, name: 'Shot 5: 碎石缓降与收刀余波', recipeId: 'src_09', defaultPurpose: '碎石如雨缓降，兵刃入鞘卡点，烟尘丁达尔光' }
];
