import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Flame,
  Zap,
  RotateCcw,
  BookOpen,
  Film,
  Send,
  Loader2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Camera
} from 'lucide-react';
import { Header } from './components/Header';
import { SpatialAnchoringPanel } from './components/SpatialAnchoringPanel';
import { CameraControls } from './components/CameraControls';
import { CoreActionsModal } from './components/CoreActionsModal';
import { UltimateMoveModal } from './components/UltimateMoveModal';
import { DoubaoInstallModal } from './components/DoubaoInstallModal';
import { OutputView } from './components/OutputView';
import { CORE_ACTIONS } from './data/coreActions';
import { ULTIMATE_MOVES } from './data/ultimateMoves';
import { generateMartialArtsPrompt } from './utils/promptGenerator';
import {
  CoreAction,
  UltimateMove,
  SpatialAnchorSettings,
  CameraSettings,
  ColorGrading,
  PromptGenerationResponse
} from './types';

export default function App() {
  // Input state
  const [draftText, setDraftText] = useState<string>(
    '两人在雨夜破败古刹中展开生死博杀，一人反手拔刀斩破水帘，另一人纵身凌空下砸，双方在古刹断壁中央释放终极奥义·傲雪凌霜！'
  );
  const [selectedCoreAction, setSelectedCoreAction] = useState<CoreAction>(CORE_ACTIONS[7]); // #8 拔刀破空瞬斩
  const [selectedUltimate, setSelectedUltimate] = useState<UltimateMove | undefined>(
    ULTIMATE_MOVES[6] // 天霜拳 · 傲雪凌霜
  );
  const [isUltimateForced, setIsUltimateForced] = useState<boolean>(true);

  // Spatial Anchors
  const [spatialAnchors, setSpatialAnchors] = useState<SpatialAnchorSettings>({
    verticalAnchor: '脚掌死扣凹凸青石地表，下陷三寸，受力点扎实稳固',
    environmentalCoordinates: '背依残破古刹断壁中轴线，距离中央香炉基座三步之遥',
    geometricSilhouette: '弓步拧腰呈对角线撕裂姿态，兵刃中轴笔挺，构成强识别几何对冲角',
    spatialDisruptionField: '半径两米内气流骤然沉降形成绝对真空区，外围尘土漫卷，内层衣袂刚性凝固'
  });

  // Camera Settings
  const [camera, setCamera] = useState<CameraSettings>({
    cameraSpecs: 'ARRI Alexa 65, 4K, 24fps, 35mm anamorphic lens, IMAX cinematography',
    selectedMovements: [
      '极速甩镜 (Whip Pan)',
      '快速推镜 (Crash Zoom)',
      '从下方猛烈追击 (Aggressive low-angle chase)',
      '撞击特写 (Impact close-up)'
    ],
    lighting: '自然天光与冷色闪电物理引信',
    screenShake: true,
    hitStop: true,
    accelerationBlur: true,
    filmGrain: true,
    atmosphericDust: true
  });

  // Color Grading
  const [colorGrading, setColorGrading] = useState<ColorGrading>({
    presetName: '破败雨夜古刹 (冷峻青灰)',
    baseColor: '#393B3E',
    baseDesc: '青灰瓦色与冷暗湿岩',
    highlightColor: '#D9F0FF',
    highlightDesc: '剑阵幽蓝与电光白芒',
    burstColor: '#1F2B3E',
    burstDesc: '暴风暗调逆光剪影'
  });

  // UI Modals
  const [isCoreModalOpen, setIsCoreModalOpen] = useState(false);
  const [isUltimateModalOpen, setIsUltimateModalOpen] = useState(false);
  const [isDoubaoModalOpen, setIsDoubaoModalOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(true);

  // Loading & Output
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGemini, setHasGemini] = useState(false);
  const [result, setResult] = useState<PromptGenerationResponse>(() => {
    return generateMartialArtsPrompt({
      draftText:
        '两人在雨夜破败古刹中展开生死博杀，一人反手拔刀斩破水帘，另一人纵身凌空下砸，双方在古刹断壁中央释放终极奥义·傲雪凌霜！',
      actionCoreId: CORE_ACTIONS[7].id,
      ultimateMoveId: ULTIMATE_MOVES[6].id,
      spatialAnchors: {
        verticalAnchor: '脚掌死扣凹凸青石地表，下陷三寸，受力点扎实稳固',
        environmentalCoordinates: '背依残破古刹断壁中轴线，距离中央香炉基座三步之遥',
        geometricSilhouette: '弓步拧腰呈对角线撕裂姿态，兵刃中轴笔挺，构成强识别几何对冲角',
        spatialDisruptionField: '半径两米内气流骤然沉降形成绝对真空区，外围尘土漫卷，内层衣袂刚性凝固'
      },
      camera: {
        cameraSpecs: 'ARRI Alexa 65, 4K, 24fps, 35mm anamorphic lens, IMAX cinematography',
        selectedMovements: [
          '极速甩镜 (Whip Pan)',
          '快速推镜 (Crash Zoom)',
          '从下方猛烈追击 (Aggressive low-angle chase)',
          '撞击特写 (Impact close-up)'
        ],
        lighting: '自然天光与冷色闪电物理引信',
        screenShake: true,
        hitStop: true,
        accelerationBlur: true,
        filmGrain: true,
        atmosphericDust: true
      },
      colorGrading: {
        presetName: '破败雨夜古刹 (冷峻青灰)',
        baseColor: '#393B3E',
        baseDesc: '青灰瓦色与冷暗湿岩',
        highlightColor: '#D9F0FF',
        highlightDesc: '剑阵幽蓝与电光白芒',
        burstColor: '#1F2B3E',
        burstDesc: '暴风暗调逆光剪影'
      },
      isUltimateTriggered: true,
      useAi: false
    });
  });

  // Check health and Gemini key
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.hasGeminiKey) {
          setHasGemini(true);
        }
      })
      .catch(() => {});
  }, []);

  // Preset loaders
  const loadExample = (type: 'duel' | 'ultimate' | 'chase') => {
    if (type === 'ultimate') {
      setDraftText(
        '白衣绝顶拳宿立于雪山孤殿之巅，单手背负，迎风狂啸，施展终极奥义·傲雪凌霜，整座暴风雪漏斗云向战场平推下压！'
      );
      setSelectedCoreAction(CORE_ACTIONS[2]); // #3 凌空飞踢绝杀
      setSelectedUltimate(ULTIMATE_MOVES[6]); // 傲雪凌霜
      setIsUltimateForced(true);
      setSpatialAnchors({
        verticalAnchor: '单足尖轻借枯树残枝最高点，高度离地丈二，白袍垂直下垂',
        environmentalCoordinates: '背负雪山孤殿八角飞檐，正对暴风雪漏斗云下陷中轴',
        geometricSilhouette: '单拳平举齐眉呈直线射雕构图，后背笔直如孤松',
        spatialDisruptionField: '方圆百丈飞雪被拳势强行吸附形成旋转低压气涡，内部衣袂如铁板凝固'
      });
      setColorGrading({
        presetName: '雪山绝巅极冻 (万古冰霜)',
        baseColor: '#6E8294',
        baseDesc: '低饱和青空与风雪青岩',
        highlightColor: '#E8EEF5',
        highlightDesc: '真空风刃与剔透玄冰白',
        burstColor: '#0E1724',
        burstDesc: '极寒暴风雪漏斗黑昼'
      });
    } else if (type === 'duel') {
      setDraftText(
        '雨夜青石巷中，两名顶级刀客贴身疾进，一记拔刀破空瞬斩撕裂水帘，刀锋交错迸发刺目光火，脚底在青石板滑出两道焦黑长槽！'
      );
      setSelectedCoreAction(CORE_ACTIONS[7]); // #8 拔刀破空瞬斩
      setSelectedUltimate(undefined);
      setIsUltimateForced(false);
      setSpatialAnchors({
        verticalAnchor: '双足死扣凹凸青石地表，下陷三寸，受力点扎实稳固',
        environmentalCoordinates: '背依残破古刹断壁中轴线，距离中央香炉基座三步之遥',
        geometricSilhouette: '弓步拧腰呈对角线撕裂姿态，兵刃中轴笔挺，构成强识别几何对冲角',
        spatialDisruptionField: '半径两米内气流骤然沉降形成绝对真空区，外围尘土漫卷，内层衣袂刚性凝固'
      });
    } else if (type === 'chase') {
      setDraftText(
        '月下幽深竹林，青衫琴客虚坐半空三尺，膝横黑檀古琴，指尖按弦狂抹，触发终极奥义·八音裂魂，八道真空音刃无声横切齐腰巨竹！'
      );
      setSelectedCoreAction(CORE_ACTIONS[1]); // #2 飞剑破空突袭
      setSelectedUltimate(
        ULTIMATE_MOVES.find((m) => m.name.includes('八音裂魂')) || ULTIMATE_MOVES[0]
      );
      setIsUltimateForced(true);
      setSpatialAnchors({
        verticalAnchor: '盘膝悬空虚坐离地三尺，黑檀古琴平放双膝构成等腰三角形剪影',
        environmentalCoordinates: '竹林中央青石主道圆心，正对幽月斜射角度',
        geometricSilhouette: '横琴呈等腰三角稳固基底，十指微悬如展翅苍鹰',
        spatialDisruptionField: '琴身周围两米内气压剧降形成同心圆音波层，竹叶悬浮于真空界限之外'
      });
    }
  };

  // Perform Generation
  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      // 1. Try Gemini API first if configured
      if (hasGemini) {
        const response = await fetch('/api/expand-action', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            draftText,
            actionCoreName: selectedCoreAction.name,
            ultimateMoveName: selectedUltimate?.name,
            spatialAnchors,
            cameraSettings: camera,
            colorGrading,
            isUltimateTriggered: isUltimateForced || Boolean(selectedUltimate)
          })
        });

        const data = await response.json();
        if (data.success && data.output) {
          // If Gemini succeeded, wrap and parse
          const raw = data.output.trim();
          setResult({
            markdownOutput: raw.startsWith('```markdown') ? raw : `\`\`\`markdown\n${raw}\n\`\`\``,
            part1Storyboard: '（由 Gemini 3.8 Flash 电影工业级智能扩写生成）',
            part2Prompt: '（通用 Prompt 已注入 Markdown 交付包）',
            positivePromptEn:
              'ARRI Alexa 65, 4K, 24fps, 35mm anamorphic lens, IMAX cinematography, martial arts action cinematography',
            positivePromptZh: '好莱坞顶级动作电影质感，ARRI Alexa 65，全局空间站位记忆点锁定',
            negativePrompt:
              '(cgi, 3d render, unreal engine, video game graphic:1.4), (worst quality, low quality:1.4), deformed limbs, extra fingers, missing limbs, bad anatomy:1.3',
            spatialAnchorsFormatted: `${spatialAnchors.verticalAnchor} | ${spatialAnchors.environmentalCoordinates}`,
            triggeredUltimate: selectedUltimate,
            triggeredCoreAction: selectedCoreAction
          });
          setIsGenerating(false);
          return;
        }
      }

      // 2. High-speed local industrial engine fallback
      setTimeout(() => {
        const generated = generateMartialArtsPrompt({
          draftText,
          actionCoreId: selectedCoreAction.id,
          ultimateMoveId: selectedUltimate?.id,
          spatialAnchors,
          camera,
          colorGrading,
          isUltimateTriggered: isUltimateForced || Boolean(selectedUltimate),
          useAi: false
        });
        setResult(generated);
        setIsGenerating(false);
      }, 400);
    } catch (e) {
      console.error(e);
      // Fallback
      const generated = generateMartialArtsPrompt({
        draftText,
        actionCoreId: selectedCoreAction.id,
        ultimateMoveId: selectedUltimate?.id,
        spatialAnchors,
        camera,
        colorGrading,
        isUltimateTriggered: isUltimateForced || Boolean(selectedUltimate),
        useAi: false
      });
      setResult(generated);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Navigation */}
      <Header
        onOpenDoubaoModal={() => setIsDoubaoModalOpen(true)}
        onOpenUltimateModal={() => setIsUltimateModalOpen(true)}
        onOpenCoreModal={() => setIsCoreModalOpen(true)}
        onLoadExample={loadExample}
        isAiAvailable={hasGemini}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Control Bar: Draft & Action Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Draft Input & Fast Binding (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                  <Film className="w-4 h-4 text-amber-400" />
                  打斗草稿 / 分镜简述输入
                  <span className="text-xs font-normal text-zinc-400">
                    (支持文字速写、分镜描述或招式名)
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => setDraftText('')}
                  className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition"
                >
                  <RotateCcw className="w-3 h-3" /> 清空
                </button>
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  rows={4}
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  placeholder="在此输入您的动作打斗草稿，如：两人在暴雨夜古刹中拔刀对决，刀光撕裂水帘，随后释放终极奥义..."
                  className="w-full text-xs sm:text-sm p-3 bg-zinc-950 border border-zinc-750 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 leading-relaxed resize-none"
                />
              </div>

              {/* Quick Tags Injection */}
              <div className="space-y-2 pt-1 border-t border-zinc-800/80">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    快捷动作注入：
                  </span>
                  <button
                    onClick={() => setIsCoreModalOpen(true)}
                    className="text-amber-400 hover:underline text-[11px]"
                  >
                    浏览完整32式库 &rarr;
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {CORE_ACTIONS.slice(0, 8).map((act) => (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => {
                        setSelectedCoreAction(act);
                        setDraftText((prev) => `${prev} [动作核心：#${act.number} ${act.name}]`);
                      }}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-750 text-zinc-300 hover:text-zinc-100 border border-zinc-700/60 transition flex items-center gap-1"
                    >
                      <span>#{act.number}</span>
                      {act.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Binding & Ultimate Trigger Bar */}
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                {/* Core Action Chip */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400 font-medium">当前绑定核心：</span>
                  <button
                    type="button"
                    onClick={() => setIsCoreModalOpen(true)}
                    className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-500/15 text-amber-300 border border-amber-500/40 hover:bg-amber-500/25 transition flex items-center gap-1"
                  >
                    #{selectedCoreAction.number} {selectedCoreAction.name}
                    <span className="text-[10px] text-zinc-400 ml-1">更换</span>
                  </button>
                </div>

                {/* Ultimate trigger toggle */}
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs">
                    <input
                      type="checkbox"
                      checked={isUltimateForced}
                      onChange={(e) => setIsUltimateForced(e.target.checked)}
                      className="rounded bg-zinc-900 border-zinc-700 text-red-600 focus:ring-0 w-3.5 h-3.5"
                    />
                    <span className="font-semibold text-red-400 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" /> 触发终极奥义模式
                    </span>
                  </label>

                  {isUltimateForced && (
                    <button
                      type="button"
                      onClick={() => setIsUltimateModalOpen(true)}
                      className="text-xs font-semibold px-2.5 py-1 rounded bg-red-950/80 text-red-300 border border-red-800/80 hover:bg-red-900/90 transition flex items-center gap-1"
                    >
                      {selectedUltimate ? selectedUltimate.name : `选择奥义 (${ULTIMATE_MOVES.length})`}
                      <span className="text-[10px] text-zinc-400 ml-1">切换</span>
                    </button>
                  )}
                </div>
              </div>

              {isUltimateForced && (
                <div className="text-[11px] text-amber-300/90 bg-amber-950/20 border border-amber-900/30 p-2.5 rounded-lg flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>终极奥义铁律已生效：</strong>
                    在奥义段落将严格剔除摄影运镜推拉摇移与面部表情眼神神态，仅保留空间站位记忆点、起手式、蓄力中、口型断喝与轰然出招。
                  </span>
                </div>
              )}
            </div>

            {/* Spatial Anchoring Laws */}
            <SpatialAnchoringPanel anchors={spatialAnchors} onChange={setSpatialAnchors} />

            {/* Hollywood Cinematics */}
            <CameraControls
              camera={camera}
              colorGrading={colorGrading}
              onCameraChange={setCamera}
              onColorChange={setColorGrading}
            />

            {/* Primary Action Button */}
            <button
              type="button"
              disabled={isGenerating}
              onClick={handleGenerate}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base text-black bg-gradient-to-r from-amber-400 via-amber-500 to-red-500 hover:from-amber-300 hover:to-red-400 active:scale-[0.99] transition shadow-xl shadow-amber-950/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  好莱坞导演正在进行高燃动作拆解与镜头扩写...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  一键扩写生成 · 好莱坞电影级提示词 (交付 Markdown 代码块)
                </>
              )}
            </button>
          </div>

          {/* Right Column: Industrial Output Delivery (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <OutputView result={result} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-4 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>高燃武打提示词优化与扩写专家 · 顶级动作导演与好莱坞AI视觉特效合体打造</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDoubaoModalOpen(true)}
              className="text-amber-400 hover:underline"
            >
              安装到豆包/Codex
            </button>
            <span>&bull;</span>
            <button
              onClick={() => setIsCoreModalOpen(true)}
              className="text-zinc-400 hover:underline"
            >
              32条动作核心库
            </button>
            <span>&bull;</span>
            <button
              onClick={() => setIsUltimateModalOpen(true)}
              className="text-red-400 hover:underline"
            >
              终极奥义资料库
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CoreActionsModal
        isOpen={isCoreModalOpen}
        onClose={() => setIsCoreModalOpen(false)}
        selectedActionId={selectedCoreAction.id}
        onSelectAction={(action) => setSelectedCoreAction(action)}
        onInsertIntoDraft={(name) => setDraftText((prev) => `${prev} [动作核心：${name}]`)}
      />

      <UltimateMoveModal
        isOpen={isUltimateModalOpen}
        onClose={() => setIsUltimateModalOpen(false)}
        selectedUltimateId={selectedUltimate?.id}
        onSelectUltimate={(move) => {
          setSelectedUltimate(move);
          setIsUltimateForced(true);
        }}
        onInsertIntoDraft={(text) => setDraftText((prev) => `${prev} ${text}`)}
      />

      <DoubaoInstallModal
        isOpen={isDoubaoModalOpen}
        onClose={() => setIsDoubaoModalOpen(false)}
      />
    </div>
  );
}
