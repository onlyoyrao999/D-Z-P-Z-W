import React, { useState } from 'react';
import {
  Copy,
  Check,
  Code2,
  Film,
  Layers,
  Sparkles,
  ShieldAlert,
  Flame,
  Zap,
  Camera,
  Volume2,
  Clock,
  Sliders,
  Code,
  Download,
  Activity,
  CheckCircle2,
  Cpu,
  Users
} from 'lucide-react';
import { PromptGenerationResponse } from '../types';

interface Props {
  result: PromptGenerationResponse;
}

export const OutputView: React.FC<Props> = ({ result }) => {
  const [activeTab, setActiveTab] = useState<'director' | 'shotcraft' | 'markdown' | 'prompts' | 'remotion' | 'jianying'>('director');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const downloadFile = (content: string, filename: string, type = 'text/plain') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getEnergyBadge = (level: number) => {
    const colors = [
      '',
      'bg-blue-950 text-blue-400 border-blue-800',
      'bg-cyan-950 text-cyan-400 border-cyan-800',
      'bg-amber-950 text-amber-400 border-amber-800',
      'bg-orange-950 text-orange-400 border-orange-800',
      'bg-red-950 text-red-400 border-red-700 animate-pulse'
    ];
    return (
      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${colors[level] || colors[3]}`}>
        能量 ⚡ {level}/5
      </span>
    );
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl overflow-hidden shadow-xl flex flex-col">
      {/* Top Header & Tab Controls */}
      <div className="p-3 sm:p-4 bg-zinc-950 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 text-white shadow-md shadow-red-950/40">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-zinc-100 flex items-center gap-2">
                AI 动作导演工业级交付物
              </h3>
              {result.triggeredUltimate && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800 flex items-center gap-1">
                  <Flame className="w-3 h-3" /> 已锁定终极奥义
                </span>
              )}
            </div>
            <span className="text-[11px] text-zinc-400">
              主核心: irenerachel/fight-prompt-director × Video-Shotcraft × 顶级动作
            </span>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => copyToClipboard(result.markdownOutput, 'full')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-gradient-to-r from-amber-500 to-red-600 hover:brightness-110 text-zinc-950 rounded-lg transition shadow-md"
          >
            {copiedKey === 'full' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-950" />
                已复制完整交付包
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                一键复制交付包
              </>
            )}
          </button>
        </div>
      </div>

      {/* Secondary Tab Bar */}
      <div className="px-3 py-2 bg-zinc-950/80 border-b border-zinc-800 flex items-center gap-1.5 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('director')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
            activeTab === 'director'
              ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          动作导演分析 (Causality & Axis)
        </button>
        <button
          onClick={() => setActiveTab('shotcraft')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
            activeTab === 'shotcraft'
              ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          分镜配方卡 (Shot Recipes)
        </button>
        <button
          onClick={() => setActiveTab('markdown')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
            activeTab === 'markdown'
              ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          Markdown 规范文本
        </button>
        <button
          onClick={() => setActiveTab('prompts')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
            activeTab === 'prompts'
              ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          AI Video Prompt 提纯
        </button>
        <button
          onClick={() => setActiveTab('remotion')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
            activeTab === 'remotion'
              ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          Remotion 时间线 (JSON)
        </button>
        <button
          onClick={() => setActiveTab('jianying')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
            activeTab === 'jianying'
              ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
          }`}
        >
          <Film className="w-3.5 h-3.5" />
          剪映/CapCut 分轨草稿
        </button>
      </div>

      {/* Tab 0: Director Analysis */}
      {activeTab === 'director' && result.directorAnalysis && (
        <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Target Model Badge */}
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-zinc-200">目标编译引擎:</span>
              <span className="text-amber-400 font-semibold">{result.directorAnalysis.targetModelCompilation}</span>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              因果律已闭环
            </span>
          </div>

          {/* Action Causality Chain */}
          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2.5">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Activity className="w-4 h-4" />
              动作因果律全链路闭环 (Action Causality Chain)
            </div>
            <div className="space-y-1.5">
              {result.directorAnalysis.actionCausalityChain.map((step, idx) => (
                <div key={idx} className="text-xs text-zinc-300 p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 180 Axis & Character Profiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1.5">
              <div className="text-zinc-400 font-semibold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" /> 180° 空间轴线与方位死锁
              </div>
              <p className="text-zinc-300 leading-relaxed font-mono text-[11px]">
                {result.directorAnalysis.spatialAxisCheck}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1.5">
              <div className="text-zinc-400 font-semibold flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-400" /> 角色特征谱差异 (Profiles)
              </div>
              <div className="text-zinc-300 space-y-1 text-[11px]">
                <div>• {result.directorAnalysis.characterAChoreography}</div>
                <div>• {result.directorAnalysis.characterBChoreography}</div>
              </div>
            </div>
          </div>

          {/* Spatial Anchor Pill Bar */}
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-400">全局空间锁基准:</span>
              <span className="text-zinc-300 font-mono text-[11px] truncate max-w-xl">
                {result.spatialAnchorsFormatted}
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(result.spatialAnchorsFormatted, 'spatial')}
              className="px-2.5 py-1 text-[11px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700 transition"
            >
              {copiedKey === 'spatial' ? '已复制' : '复制空间基准'}
            </button>
          </div>
        </div>
      )}

      {/* Tab 1: Shotcraft Visual Cards */}
      {activeTab === 'shotcraft' && (
        <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {result.shotSequence && result.shotSequence.length > 0 ? (
            <div className="space-y-4">
              {result.shotSequence.map((shot) => (
                <div
                  key={shot.shotNumber}
                  className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-amber-500/50 transition-all shadow-md space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded-lg bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 font-mono text-xs">
                        {shot.timecodeBlock}
                      </span>
                      <h4 className="font-bold text-sm sm:text-base text-zinc-100">
                        {shot.shotName}
                      </h4>
                      {getEnergyBadge(shot.recipe.energyLevel)}
                    </div>
                    <button
                      onClick={() => copyToClipboard(shot.promptEn, `shot_${shot.shotNumber}`)}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-zinc-700 rounded-lg transition"
                    >
                      {copiedKey === `shot_${shot.shotNumber}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      复制 Shot {shot.shotNumber} Prompt
                    </button>
                  </div>

                  {/* Storyboard & Framing */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/70">
                      <div className="text-zinc-400 font-semibold mb-1 flex items-center gap-1.5">
                        <Film className="w-3.5 h-3.5 text-amber-400" /> 动作发力与因果律
                      </div>
                      <p className="text-zinc-200 leading-relaxed">{shot.storyboard}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/70">
                      <div className="text-zinc-400 font-semibold mb-1 flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-cyan-400" /> 摄影机职责与运镜
                      </div>
                      <p className="text-zinc-200 leading-relaxed font-mono">{shot.cameraSpecs}</p>
                    </div>
                  </div>

                  {/* Audio & Remotion parameters */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60 flex items-start gap-2">
                      <Volume2 className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-zinc-400">音效设计 (Sound Stems): </span>
                        <span className="text-zinc-300">{shot.soundDesign}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60 flex items-start gap-2">
                      <Code className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-zinc-400">Remotion 动力学: </span>
                        <code className="text-emerald-300 font-mono text-[11px]">{shot.recipe.remotionKinematics}</code>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap font-mono">
              {result.part1Storyboard}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Raw Markdown Code Block */}
      {activeTab === 'markdown' && (
        <div className="p-4 sm:p-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>标准单代码块交付格式 (包裹于单一 ```markdown 代码块中)</span>
            <button
              onClick={() => downloadFile(result.markdownOutput, 'AI动作导演_分镜交付包.md')}
              className="flex items-center gap-1 text-amber-400 hover:underline"
            >
              <Download className="w-3.5 h-3.5" /> 下载 .md 文件
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-black border border-zinc-800 text-xs font-mono text-zinc-200 overflow-x-auto max-h-[70vh] whitespace-pre-wrap leading-relaxed select-all">
            {result.markdownOutput}
          </pre>
        </div>
      )}

      {/* Tab 3: AI Prompts */}
      {activeTab === 'prompts' && (
        <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Positive Prompt EN */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> 英文通用 Prompt (Sora / Kling / Runway Gen-3 / Midjourney)
              </div>
              <button
                onClick={() => copyToClipboard(result.positivePromptEn, 'prompt_en')}
                className="flex items-center gap-1 px-2.5 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded border border-zinc-700 transition"
              >
                {copiedKey === 'prompt_en' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                复制英文 Prompt
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-zinc-900/90 text-xs font-mono text-zinc-200 whitespace-pre-wrap leading-relaxed border border-zinc-800 select-all">
              {result.positivePromptEn}
            </pre>
          </div>

          {/* Positive Prompt ZH */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> 中文通用 Prompt (豆包 / 即梦 / 通义万相)
              </div>
              <button
                onClick={() => copyToClipboard(result.positivePromptZh, 'prompt_zh')}
                className="flex items-center gap-1 px-2.5 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded border border-zinc-700 transition"
              >
                {copiedKey === 'prompt_zh' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                复制中文 Prompt
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-zinc-900/90 text-xs font-mono text-zinc-200 whitespace-pre-wrap leading-relaxed border border-zinc-800 select-all">
              {result.positivePromptZh}
            </pre>
          </div>

          {/* Negative Prompt */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-red-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> 电影级专属 Negative Prompt (固定反向约束)
              </div>
              <button
                onClick={() => copyToClipboard(result.negativePrompt, 'prompt_neg')}
                className="flex items-center gap-1 px-2.5 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded border border-zinc-700 transition"
              >
                {copiedKey === 'prompt_neg' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                复制负面 Prompt
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-zinc-900/90 text-xs font-mono text-red-300/90 whitespace-pre-wrap leading-relaxed border border-zinc-800 select-all">
              {result.negativePrompt}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 4: Remotion Timeline JSON */}
      {activeTab === 'remotion' && (
        <div className="p-4 sm:p-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Video-Shotcraft Remotion 动画工程配置文件 (24fps / 2.39:1 宽银幕)</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(result.shotcraftRemotionTimeline || '', 'remotion_copy')}
                className="flex items-center gap-1 px-2.5 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded border border-zinc-700"
              >
                {copiedKey === 'remotion_copy' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                复制 JSON
              </button>
              <button
                onClick={() => downloadFile(result.shotcraftRemotionTimeline || '', 'remotion_timeline.json', 'application/json')}
                className="flex items-center gap-1 text-amber-400 hover:underline"
              >
                <Download className="w-3.5 h-3.5" /> 下载 JSON
              </button>
            </div>
          </div>
          <pre className="p-4 rounded-xl bg-black border border-zinc-800 text-xs font-mono text-emerald-300 overflow-x-auto max-h-[70vh] whitespace-pre leading-relaxed select-all">
            {result.shotcraftRemotionTimeline}
          </pre>
        </div>
      )}

      {/* Tab 5: JianYing Draft Format */}
      {activeTab === 'jianying' && (
        <div className="p-4 sm:p-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>剪映 / CapCut 动作电影分轨草稿结构 (包含视频主轨、音效打击轨、时码卡点)</span>
            <button
              onClick={() => copyToClipboard(result.shotcraftJianyingDraft || '', 'jianying_copy')}
              className="flex items-center gap-1 px-2.5 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded border border-zinc-700"
            >
              {copiedKey === 'jianying_copy' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              复制分轨描述
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 overflow-x-auto max-h-[70vh] whitespace-pre-wrap leading-relaxed select-all">
            {result.shotcraftJianyingDraft}
          </pre>
        </div>
      )}
    </div>
  );
};
