# AI 动作导演 · Fight Prompt Director (全新工业级融合版)

- **主要核心驱动 Skill (Primary Core)**：[`https://github.com/irenerachel/fight-prompt-director`](https://github.com/irenerachel/fight-prompt-director) (AI 动作导演 - irenerachel)
- **次要支撑模块 (Secondary Modules)**：
  1. [`https://github.com/Vincentwei1021/video-shotcraft`](https://github.com/Vincentwei1021/video-shotcraft) (Video-Shotcraft 动作电影分镜配方库 & Remotion 时间线)
  2. **顶级动作高燃武打库** (32条仙侠体术核心库 + 111式终极奥义库 + 四大空间站位记忆点法则)
- **标准定义文件**：[`SKILL.md`](./SKILL.md)
- **支持平台**：ByteDance Seedance 2.5/2.0、MiniMax-H3 (海螺3)、Kling (快手可灵)、Runway Gen-3、Sora、豆包 (Doubao) / Codex / GPTs / Claude / Coze

> **好莱坞动作指导与 AI 视频运镜架构师深度融合打造**  
> 专为解决 AI 视频生成（Seedance、MiniMax-H3、Sora、Kling、Runway 等）中“动作无因果律、人物漂浮不贴地、摄影机违规越轴、角色攻防无差异、前后镜头断裂不连续”而生的全新动作导演级工作台。

---

## 📖 一、架构分层与核心功能 (Primary vs Secondary)

```
┌────────────────────────────────────────────────────────────────────────┐
│             主要核心驱动：irenerachel/fight-prompt-director             │
│   • 动作因果律 (Action Causality: 攻防发力、动能传导、反作用力、环境破坏)  │
│   • 角色动作特征谱差异 (Character Profiles: 角色A攻方 vs 角色B应方)     │
│   • 空间方位与 180° 轴线铁律 (Spatial Direction & Eye-Line Match)      │
│   • 摄影机职能分工 (Camera Responsibility: 追击者 / 观察者 / 核心见证者) │
│   • 跨镜头战损与环境连续性 (Cross-Shot Continuity)                      │
│   • 目标视频模型双轨编译 (Seedance 连续时段流 vs MiniMax-H3 精密时码)    │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
    ┌───────────────────────────────┐ ┌───────────────────────────────┐
    │   次要模块 1: Video-Shotcraft  │ │   次要模块 2: 顶级动作武打库  │
    │  • 分镜配方卡 (SRC-01~SRC-10) │ │  • 32 条仙侠体术高燃核心动作   │
    │  • 5-Shot 动作电影能量阶梯    │ │  • 111 式终极奥义绝学资料库    │
    │  • Remotion JSON 动力学工程   │ │  • 四大空间站位绝对坐标记忆点  │
    │  • 剪映/CapCut 多轨分轨草稿   │ │  • 奥义段落剔除运镜与神态铁律  │
    └───────────────────────────────┘ └───────────────────────────────┘
```

---

## 🎯 二、AI 动作导演五大核心杀手锏

### 1. 动作因果律全链路闭环 (Action Causality)
- **发力起点**：下盘沉步蹬踏青石产生反作用力，动能由腰髋传导至双臂兵刃；
- **轨迹与声效**：兵刃撕裂空气产生真空风刃与音爆；
- **格挡/闪避**：受击方根据来势侧身卸力或反手挑格，受力肌肉紧绷；
- **碰撞与顿挫**：交击瞬间产生 0.08~0.1s 时空微滞 (Hit Stop)，引信火花迸溅，地面受力下陷；
- **余波与破坏**：气浪将碎石反向震飞，地面产生龟裂滑痕与热浪蒸汽。

### 2. 角色动作特征谱差异化 (Character Profiles)
- 设定角色 A（发起方 / 刚猛霸道重刃）与角色 B（应招方 / 灵动飘逸软剑）；
- 双方在攻防博弈中拥有鲜明动作反差与体态语言。

### 3. 空间方位与 180° 轴线铁律 (Spatial Direction & 180° Axis)
- 强制锁定对决双方的左/右相对站位，视线方向 (Eye-line Match) 严密对视；
- 摄影机全程保持在轴线同侧机位，严禁产生颠倒观众方位的越轴跳切。

### 4. 目标 AI 视频模型专属编译器 (Model Compilers)
- **ByteDance Seedance 2.5 / 2.0**：采用粗粒度连续时段流 (`[00:00 - 00:03.5]`)，强化多主体动作流体连贯性；
- **MiniMax-H3 / 海螺3**：采用连续精密时码 (`00:00.00 - 00:02.50`)，注入原生立体声双声道 (`[L/R Sound Stems]`) 与高频微打击顿挫；
- **通用电影级 (Sora / Kling / Runway Gen-3)**：ARRI Alexa 65 规格 2.39:1 宽银幕电影质感。

### 5. 跨镜头战损与环境连续性 (Cross-Shot Continuity)
- 前一镜头的衣衫撕裂破损、地面刮痕深槽、血迹与武器战损状态在后序镜头中全部继承。

---

## 🛠️ 三、动作导演更新与同步机制 (Director Sync)

由于 `irenerachel/fight-prompt-director` 会持续迭代更新，本系统内置了：
1. **工作台一键更新按钮**：在主界面“AI 动作导演工作台”右上角，点击 **“更新/同步动作导演Skill”** 即可热同步最新因果律与模型编译规则；
2. **多端导出规范**：导出的 `SKILL.md` 与豆包 System Prompt 均已包含版本标识与自动重载依赖。

---

## 🚀 四、一键安装指南 (豆包 / Codex / GPTs / Coze / Claude)

1. 点击网页右上角 **“导出/安装 Agent Skill”** 或查看本项目 [`SKILL.md`](./SKILL.md)；
2. 复制完整 Markdown 文本，粘贴至豆包的 **“人设与回复逻辑” (System Prompt)** 或 Codex 的 `System Instructions`；
3. 设定模型为高推理长文本模型，保存即可随时调用动作导演进行分镜扩写！
