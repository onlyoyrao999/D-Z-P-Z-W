import React from 'react';
import { Sparkles, Download, Film, Shield, Zap, BookOpen } from 'lucide-react';

interface HeaderProps {
  onOpenDoubaoModal: () => void;
  onOpenUltimateModal: () => void;
  onOpenCoreModal: () => void;
  onLoadExample: (type: 'duel' | 'ultimate' | 'chase') => void;
  isAiAvailable?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDoubaoModal,
  onOpenUltimateModal,
  onOpenCoreModal,
  onLoadExample,
  isAiAvailable
}) => {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-4">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-red-600 to-zinc-900 flex items-center justify-center shadow-lg shadow-red-950/40 border border-amber-500/30">
            <Film className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-zinc-100 tracking-wide">
                高燃武打提示词扩写专家
              </h1>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-red-950/80 text-red-400 border border-red-800/60 flex items-center gap-1">
                <Shield className="w-3 h-3" /> 好莱坞电影工业级
              </span>
              {isAiAvailable && (
                <span className="hidden sm:inline-flex px-1.5 py-0.5 text-[11px] font-medium rounded bg-emerald-950/70 text-emerald-400 border border-emerald-800/60">
                  Gemini API 联机
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400">
              32条动作核心库 · 终极奥义资料库 · 空间站位记忆点死锁 · 电影工业摄影动力学
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Quick preset selector */}
          <div className="hidden md:flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1 text-xs text-zinc-300">
            <span className="px-2 text-zinc-500 font-medium">预设案例:</span>
            <button
              onClick={() => onLoadExample('ultimate')}
              className="px-2.5 py-1 rounded hover:bg-zinc-800 hover:text-amber-400 transition"
            >
              终极奥义·傲雪凌霜
            </button>
            <button
              onClick={() => onLoadExample('duel')}
              className="px-2.5 py-1 rounded hover:bg-zinc-800 hover:text-amber-400 transition"
            >
              古刹刀剑近身对峙
            </button>
            <button
              onClick={() => onLoadExample('chase')}
              className="px-2.5 py-1 rounded hover:bg-zinc-800 hover:text-amber-400 transition"
            >
              竹林八音裂魂
            </button>
          </div>

          <button
            onClick={onOpenCoreModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 rounded-lg transition shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            32条动作库
          </button>

          <button
            onClick={onOpenUltimateModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-950/50 hover:bg-red-900/60 text-red-200 border border-red-700/50 rounded-lg transition shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-red-400" />
            终极奥义库 (50+)
          </button>

          <button
            onClick={onOpenDoubaoModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white rounded-lg transition shadow-md shadow-red-950/50"
          >
            <Download className="w-3.5 h-3.5" />
            安装到豆包/Codex
          </button>
        </div>
      </div>
    </header>
  );
};
