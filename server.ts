import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Routes
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
        isUltimateTriggered
      } = req.body;

      const ai = getGenAI();
      if (!ai) {
        return res.status(200).json({
          success: false,
          useLocalFallback: true,
          message: '未配置 GEMINI_API_KEY，切换为本地高燃规则引擎'
        });
      }

      const systemInstruction = `你是由顶级动作导演与好莱坞AI视觉特效专家合体打造的【高燃武打提示词优化与扩写专家】。
你的唯一任务是：接收用户输入的打斗草稿、分镜简述或参考素材，自动检索并调用内置的【32条高燃武打核心库】与【好莱坞电影工业摄影与运镜标准】；全局贯穿“空间站位记忆点”法则以死锁人物与环境的一致性；当且仅当用户输入中明确提到“终极奥义”（或“绝招/必杀/奥义”）时，定向调取【终极奥义】专属资料库，且在奥义段落坚决剔除运镜与面部表情描写，只保留纯粹喊名与绝对空间站位记忆点；第二部分必须固定输出专属电影级负面提示词（Negative Prompt）。进行深度动作发力拆解、真实物理运镜强化、视觉粒子扩写与光影构筑，输出极具冲击力与真实电影质感的提示词。

Strict Output Rules (输出铁律):
1. 不要废话与寒暄：禁止输出“好的”、“这是为您优化的提示词”等任何寒暄、总结或多余说明。
2. 纯 Markdown 格式交付：所有回复必须且只能包裹在单一 Markdown 代码块（\`\`\`markdown ... \`\`\`）内完整呈现。
3. 输出结构固定为两部分：
【第一部分：分镜动作细化（剧本扩写与色彩运镜规划）】
【第二部分：AI视频/生图通用Prompt清单】
包含 Positive Prompt (英文与中文通用提示词，包含 ARRI Alexa 65, 4K, 24fps, 35mm anamorphic lens, IMAX cinematography, realistic film grain, atmospheric dust, natural daylight / physical fuse lighting, physical inertia camera movement, acceleration-based motion blur, hit stop, speed ramp) 和固定的 Negative Prompt:
Negative Prompt (通用负面提示词): (cgi, 3d render, unreal engine, video game graphic:1.4), (worst quality, low quality:1.4), (deformed limbs, extra fingers, missing limbs, bad anatomy:1.3), mechanical camera movement, zero gravity floating, cartoon, anime, over-saturated, plastic skin texture, blurry face, static poses without inertia, jittery camera artifacts, text, watermark.`;

      const promptContent = `用户输入的打斗草稿/素材如下：
${draftText || '两人在暴雨夜破败古刹檐下近身博杀，刀光与闪电交织'}

指定动作核心：${actionCoreName || '自动根据草稿选择'}
终极奥义触发：${isUltimateTriggered ? `明确触发【${ultimateMoveName || '天霜拳 · 傲雪凌霜'}】` : '未明确触发（如草稿中有奥义字样则按规则自动触发）'}

空间站位记忆点参考：
- 垂直与接触状态：${spatialAnchors?.verticalAnchor || '脚底死扣凹凸青石地表'}
- 环境地貌参照系：${spatialAnchors?.environmentalCoordinates || '背依古刹断壁中轴线'}
- 肢体构图剪影：${spatialAnchors?.geometricSilhouette || '弓步拧腰呈对角线撕裂姿态'}
- 场域空间断层：${spatialAnchors?.spatialDisruptionField || '半径两米真空压降，外围碎石横飞'}

摄影与色彩参考：
- 色彩底色：${colorGrading?.baseDesc || '青灰瓦色 #393B3E'}，高光：${colorGrading?.highlightDesc || '真空风刃白 #E8EEF5'}，极招变色：${colorGrading?.burstDesc || '暴风暗调 #1F2B3E'}

请严格按照输出铁律，生成完整的单一 Markdown 代码块输出！`;

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

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
