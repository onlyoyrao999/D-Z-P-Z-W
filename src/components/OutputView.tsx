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
  Camera
} from 'lucide-react';
import { PromptGenerationResponse } from '../types';

interface Props {
  result: PromptGenerationResponse;
}

export const OutputView: React.FC<Props> = ({ result }) => {
  const [activeTab, setActiveTab] = useState<'markdown' | 'director' | 'prompts'>('markdown');
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

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
      {/* Top Header & Tab Controls */}
      <div className="p-3 sm:p-4 bg-zinc-950 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              好莱坞动作导演交付物
              {result.triggeredUltimate && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800 flex items-center gap-1">
                  <Flame className="w-3 h-3" /> 已锁定终极奥义
                </span>
              )}
            </h3>
            <span className="text-[11px] text-zinc-400">
              严格按照工业级 Markdown 代码块交付标准呈现
            </span>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800 text-xs">
          <button
            onClick={() => setActiveTab('markdown')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition ${
              activeTab === 'markdown'
                ? 'bg-amber-500 text-black font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Markdown 交付包 (规范原格式)
          </button>
          <button
            onClick={() => setActiveTab('director')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition ${
              activeTab === 'director'
                ? 'bg-amber-500 text-black font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            分镜导演视界 (卡片解析)
          </button>
          <button
            onClick={() => setActiveTab('prompts')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition ${
              activeTab === 'prompts'
                ? 'bg-amber-500 text-black font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Prompt 提纯速取
          </button>
        </div>

        {/* Quick Global Copy */}
        <button
          onClick={() => copyToClipboard(result.markdownOutput, 'full')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-zinc-700 rounded-lg transition"
        >
          {copiedKey === 'full' ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              已全量复制！
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              一键复制 Markdown
            </>
          )}
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="p-4 sm:p-5 flex-1 min-h-[420px] max-h-[680px] overflow-y-auto">
        {/* TAB 1: Raw Markdown format */}
        {activeTab === 'markdown' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400 pb-1">
              <span>遵照输出铁律：纯 Markdown 格式交付，无多余寒暄，包含分镜动作细化与通用 Prompt</span>
              <button
                onClick={() => copyToClipboard(result.markdownOutput, 'raw')}
                className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
              >
                {copiedKey === 'raw' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                复制纯文本
              </button>
            </div>
            <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-200 leading-relaxed overflow-x-auto select-all">
              <pre className="whitespace-pre-wrap">{result.markdownOutput}</pre>
            </div>
          </div>
        )}

        {/* TAB 2: Director Cards Visual View */}
        {activeTab === 'director' && (
          <div className="space-y-4">
            {/* Part 1 Header info */}
            <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-amber-400">第一部分：分镜动作细化</span>
                <span className="text-zinc-500">|</span>
                <span className="text-zinc-300">
                  调用动作：#{result.triggeredCoreAction?.number} {result.triggeredCoreAction?.name}
                </span>
                {result.triggeredUltimate && (
                  <>
                    <span className="text-zinc-500">|</span>
                    <span className="text-red-400 font-semibold">
                      奥义：{result.triggeredUltimate.name}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Part 1 Storyboard Shots */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400">
                    [镜头一：起手式 · 空间站位锁定]
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                    垂直锚定 & 几何对角
                  </span>
                </div>
                <div className="text-xs text-zinc-300 space-y-1">
                  <p>
                    <span className="text-amber-400 font-semibold">空间站位记忆点：</span>
                    {result.spatialAnchorsFormatted}
                  </p>
                  <p>
                    <span className="text-blue-300 font-semibold">发力逻辑：</span>
                    重心自足跟沿踝关节微旋扣死地面，腰背大筋紧绷如张满之角弓，丹田内劲贯通至寸关。
                  </p>
                  <p>
                    <span className="text-purple-300 font-semibold">运镜与质感：</span>
                    ARRI Alexa 65，35mm 变形镜头，前侧四分之三空中跟拍缓缓推进，保持真实物理微晃。
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">
                    [镜头二：核心动作交锋 · 动作核心：#{result.triggeredCoreAction?.number}{' '}
                    {result.triggeredCoreAction?.name}]
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/60 text-amber-400 border border-amber-800/40">
                    高速追踪锁头链路
                  </span>
                </div>
                <div className="text-xs text-zinc-300 space-y-1.5">
                  <p>{result.triggeredCoreAction?.description}</p>
                  <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400 space-y-1">
                    <div>
                      <span className="text-amber-300 font-semibold">摄影机运动序列：</span>
                      追击 → 瞬间跟丢 → 越过目标 → 极速甩镜 (Whip Pan) → 重新锁定
                    </div>
                    <div>
                      <span className="text-emerald-300 font-semibold">冲击四要素：</span>
                      0.1s 闪白冲击帧 (Flash) | 0.3s 镜头震颤 (Screen Shake) | 0.1s 打击微滞 (Hit Stop) | 峰值加速度运动模糊
                    </div>
                  </div>
                </div>
              </div>

              {result.triggeredUltimate ? (
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/60 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                      <Flame className="w-4 h-4" />
                      [镜头三：终极奥义调用 · {result.triggeredUltimate.name}]
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">
                      坚决剔除镜头运镜与面部神态
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-zinc-200 bg-zinc-950/80 p-3 rounded-lg border border-red-900/40">
                    <p>
                      <span className="text-amber-400 font-semibold">【空间站位记忆点】：</span>
                      {result.triggeredUltimate.spatialAnchor}
                    </p>
                    <p>
                      <span className="text-blue-400 font-semibold">【起手式】：</span>
                      {result.triggeredUltimate.startPose}
                    </p>
                    <p>
                      <span className="text-purple-400 font-semibold">【蓄力中】：</span>
                      {result.triggeredUltimate.charging}
                    </p>
                    <p className="p-2 bg-amber-950/30 rounded border border-amber-900/40 text-amber-300 font-bold">
                      【口型喊名】：{result.triggeredUltimate.shouting}
                    </p>
                    <p>
                      <span className="text-red-400 font-semibold">【轰然出招】：</span>
                      {result.triggeredUltimate.execution}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-300">
                      [镜头三：回马绝杀 · 破势定乾坤]
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300">
                    借反冲力倒滑稳立于石阶第七级，单手反背，另一手斜指三尺虚空，周身落叶呈圆环状被震飞五米开外，广角运镜伴随受控平缓环绕收招。
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: Prompt Extraction */}
        {activeTab === 'prompts' && (
          <div className="space-y-4">
            {/* 1. English Positive Prompt */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-blue-400" />
                  英文通用提示词 (Positive Prompt - 适配 Sora / Kling / Runway / Midjourney)
                </span>
                <button
                  onClick={() => copyToClipboard(result.positivePromptEn, 'pos_en')}
                  className="text-xs px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition flex items-center gap-1 font-medium"
                >
                  {copiedKey === 'pos_en' ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  复制英文 Prompt
                </button>
              </div>
              <div className="p-3 bg-zinc-900/80 rounded-lg border border-zinc-800 font-mono text-xs text-zinc-300 leading-relaxed select-all">
                {result.positivePromptEn}
              </div>
            </div>

            {/* 2. Chinese Positive Prompt */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  中文通用提示词 (Positive Prompt - 适配 豆包 / 即梦 / 通义万相)
                </span>
                <button
                  onClick={() => copyToClipboard(result.positivePromptZh, 'pos_zh')}
                  className="text-xs px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition flex items-center gap-1 font-medium"
                >
                  {copiedKey === 'pos_zh' ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  复制中文 Prompt
                </button>
              </div>
              <div className="p-3 bg-zinc-900/80 rounded-lg border border-zinc-800 text-xs text-zinc-300 leading-relaxed select-all">
                {result.positivePromptZh}
              </div>
            </div>

            {/* 3. Negative Prompt */}
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/60 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  电影级负面提示词 (Negative Prompt - 必须固定输出)
                </span>
                <button
                  onClick={() => copyToClipboard(result.negativePrompt, 'neg')}
                  className="text-xs px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition flex items-center gap-1 font-medium"
                >
                  {copiedKey === 'neg' ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  复制负向词
                </button>
              </div>
              <div className="p-3 bg-zinc-900/80 rounded-lg border border-red-900/40 font-mono text-xs text-zinc-300 select-all">
                {result.negativePrompt}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
