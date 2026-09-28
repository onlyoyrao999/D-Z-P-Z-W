import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

let genAI: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      genAI = new GoogleGenAI({ apiKey });
    }
  }
  return genAI;
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(
        process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'
      )
    });
  });

  app.post('/api/expand-action', async (req, res) => {
    try {
      const {
        draftText,
        actionCoreName,
        ultimateMoveName,
        spatialAnchors,
        cameraSettings,
        colorGrading,
        isUltimateTriggered,
        directorSettings
      } = req.body;

      const ai = getGenAI();
      if (!ai) {
        return res.status(200).json({
          success: false,
          useLocalFallback: true,
          message: '未配置 GEMINI_API_KEY，切换为本地高燃规则引擎'
        });
      }

      const systemInstruction = `你是由好莱坞动作指导与 AI 视频运镜架构师深度融合打造的【AI 动作导演 (Fight Prompt Director)】。
【主要核心依赖 (Primary Core)】：https://github.com/irenerachel/fight-prompt-director (irenerachel)
【次要支撑模块 (Secondary Modules)】：
1. https://github.com/Vincentwei1021/video-shotcraft (Video-Shotcraft 动作分镜配方库与 Remotion 时间线)
2. 顶级动作高燃武打库 (32条仙侠体术核心库 + 111式终极奥义库 + 四大空间站位记忆点)

你的核心职能：
1. 动作因果律 (Action Causality)：每一个攻击动作必须产生明确的受力反馈、防守变招、反作用力形变与环境破坏，杜绝无受力支撑的凌空虚飘。
2. 角色动作特征谱 (Character Profiles)：对决双方（角色 A vs 角色 B）设定截然不同的武器、发力体术流派与步伐节奏。
3. 空间方位与 180° 轴线铁律 (Spatial Direction & 180° Axis)：严格锁定对峙左右站位与视线方向 (Eye-line Match)，摄影机运动严禁非法越轴。
4. 摄影机职能分工 (Camera Responsibility)：明确摄影机作为主观追击者、客观切线观察者，还是能量核心的冲击见证者。
5. 跨镜头连续性 (Cross-Shot Continuity)：衣衫破损、地面刮痕深槽、血迹与武器战损状态在分镜切光中全局继承。
6. 模型编译适配：根据用户设定的目标模型（Seedance 粗粒度时段流 / MiniMax-H3 精准时码与原生双声道 / 通用电影级）生成对应时码与分镜。
7. 当且仅当出现“终极奥义/绝招/必杀”时，定向调取 111 式终极奥义库，且坚决剔除运镜与面部神态描写，只保留纯粹口型断喝与空间站位。

Strict Output Rules (输出铁律):
1. 不要废话与寒暄：禁止输出“好的”、“这是为您优化的提示词”等任何寒暄、总结或多余说明。
2. 纯 Markdown 格式交付：所有回复必须且只能包裹在单一 Markdown 代码块（\`\`\`markdown ... \`\`\`）内完整呈现。
3. 输出结构固定为两部分：
【第一部分：AI 动作导演分镜工坊（目标模型编译）】
【第二部分：AI视频/生图通用Prompt清单与工坊导出】
包含 Positive Prompt (英文与中文通用提示词，包含 ARRI Alexa 65, 4K, 24fps, 35mm anamorphic lens, IMAX cinematography, realistic film grain, atmospheric dust, natural daylight / physical fuse lighting, physical inertia camera movement, acceleration-based motion blur, hit stop, speed ramp) 和固定的 Negative Prompt:
Negative Prompt (通用负面提示词): (cgi, 3d render, unreal engine, video game graphic:1.4), (worst quality, low quality:1.4), (deformed limbs, extra fingers, missing limbs, bad anatomy:1.3), mechanical camera movement, zero gravity floating, cartoon, anime, over-saturated, plastic skin texture, blurry face, static poses without inertia, jittery camera artifacts, text, watermark.`;

      const promptContent = `用户输入的打斗草稿/素材如下：
${draftText || '两人在暴雨夜破败古刹檐下近身博杀，刀光与闪电交织'}

目标编译引擎：${directorSettings?.targetModel || 'seedance'}
动作烈度：Level ${directorSettings?.intensity || 4}
角色A (攻方)：${directorSettings?.characterA?.name || '角色A'} (${directorSettings?.characterA?.weapon || '重刀'})
角色B (应方)：${directorSettings?.characterB?.name || '角色B'} (${directorSettings?.characterB?.weapon || '软剑'})

指定动作核心：${actionCoreName || '自动根据草稿选择'}
终极奥义触发：${isUltimateTriggered ? `明确触发【${ultimateMoveName || '天霜拳 · 傲雪凌霜'}】` : '未明确触发（如草稿中有奥义字样则按规则自动触发）'}

空间站位记忆点参考：
- 垂直与接触状态：${spatialAnchors?.verticalAnchor || '脚底死扣凹凸青石地表'}
- 环境地貌参照系：${spatialAnchors?.environmentalCoordinates || '背依古刹断壁中轴线'}
- 肢体构图剪影：${spatialAnchors?.geometricSilhouette || '弓步拧腰呈对角线撕裂姿态'}
- 场域空间断层：${spatialAnchors?.spatialDisruptionField || '半径两米真空压降，外围碎石横飞'}

摄影与色彩参考：
- 色彩底色：${colorGrading?.baseDesc || '青灰瓦色 #393B3E'}，高光：${colorGrading?.highlightDesc || '真空风刃白 #E8EEF5'}，极招变色：${colorGrading?.burstDesc || '暴风暗调 #1F2B3E'}

请严格按照动作导演输出铁律，生成完整的单一 Markdown 代码块输出！`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptContent,
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });

      const text = response.text || '';
      return res.json({
        success: true,
        output: text
      });
    } catch (error: any) {
      console.error('Gemini expansion error:', error);
      return res.status(200).json({
        success: false,
        useLocalFallback: true,
        error: error?.message || 'Server error'
      });
    }
  });

  // Setup Vite middleware in dev
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static('dist'));
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
