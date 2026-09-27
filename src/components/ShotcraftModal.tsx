import React, { useState } from 'react';
import { X, Film, Zap, Clock, Volume2, Sparkles, Sliders, Play, Code } from 'lucide-react';
import { SHOT_RECIPES } from '../data/shotRecipes';
import { ShotRecipe } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecipe?: (recipe: ShotRecipe) => void;
}

export const ShotcraftModal: React.FC<Props> = ({ isOpen, onClose, onSelectRecipe }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeRecipe, setActiveRecipe] = useState<ShotRecipe>(SHOT_RECIPES[0]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: '全部配方卡 (All Cards)' },
    { id: 'establishing', label: '空间死锁建置 (Establishing)' },
    { id: 'pursuit', label: '身法破风追击 (Pursuit)' },
    { id: 'clash', label: '兵刃硬核交锋 (Clash)' },
    { id: 'climax_ultimate', label: '终极奥义爆发 (Climax)' },
    { id: 'lingering', label: '碎石缓降收势 (Lingering)' }
  ];

  const filtered = selectedCategory === 'all'
    ? SHOT_RECIPES
    : SHOT_RECIPES.filter((r) => r.category === selectedCategory);

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
      <span className={`px-2 py-0.5 text-[11px] font-bold rounded-full border ${colors[level] || colors[3]}`}>
        能量 ⚡ {level}/5
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-zinc-950 border border-amber-600/50 rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-gradient-to-r from-amber-950/40 via-red-950/20 to-zinc-950">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 text-white shadow-lg shadow-red-950/50">
              <Film className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-zinc-100">
                  Video-Shotcraft 动作电影分镜配方库 (Shot Recipe Cards)
                </h2>
                <span className="px-2 py-0.5 text-[11px] font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                  Remotion & AI 视频双引擎
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                融合 Vincentwei1021/video-shotcraft 的电影配方卡规范与好莱坞动作导演摄影动力学
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800 flex items-center gap-2 overflow-x-auto text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Content: Left List, Right Detail */}
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Left Cards List */}
          <div className="md:col-span-5 border-r border-zinc-800 p-3 overflow-y-auto space-y-2.5 bg-zinc-950/50">
            {filtered.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => setActiveRecipe(recipe)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                  activeRecipe.id === recipe.id
                    ? 'bg-gradient-to-r from-amber-950/50 to-zinc-900 border-amber-500/80 shadow-lg shadow-amber-950/30 ring-1 ring-amber-500/50'
                    : 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-900 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-bold text-sm text-zinc-100 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    {recipe.name}
                  </span>
                  {getEnergyBadge(recipe.energyLevel)}
                </div>
                <div className="text-[11px] text-amber-300/80 font-mono mb-1">
                  {recipe.nameEn}
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {recipe.purpose}
                </p>
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-zinc-500 border-t border-zinc-800/60 pt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-400" /> 时长: {recipe.durationSec}s
                  </span>
                  <span className="text-zinc-400 font-mono text-[10px]">
                    ID: {recipe.id.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Detailed Recipe View */}
          <div className="md:col-span-7 p-4 sm:p-6 overflow-y-auto bg-zinc-900/30 space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-zinc-800 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-zinc-100">{activeRecipe.name}</h3>
                  {getEnergyBadge(activeRecipe.energyLevel)}
                </div>
                <p className="text-xs text-amber-400 font-mono">{activeRecipe.nameEn}</p>
              </div>
              {onSelectRecipe && (
                <button
                  onClick={() => onSelectRecipe(activeRecipe)}
                  className="px-3.5 py-1.5 text-xs font-semibold bg-gradient-to-r from-amber-500 to-red-600 text-zinc-950 rounded-lg hover:brightness-110 transition shadow-md"
                >
                  应用此配方卡
                </button>
              )}
            </div>

            {/* Purpose */}
            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40">
              <div className="text-xs font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> 核心功能与镜头目的 (Shot Purpose)
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed">{activeRecipe.purpose}</p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-[11px] font-semibold text-zinc-400 mb-1">景别构图 (Framing)</div>
                <div className="text-xs text-zinc-200 font-medium">{activeRecipe.framing}</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-[11px] font-semibold text-zinc-400 mb-1">运动变速 (Motion Ramp)</div>
                <div className="text-xs text-amber-300 font-mono">{activeRecipe.motionRamp}</div>
              </div>
            </div>

            {/* Camera Trajectory */}
            <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <div className="text-xs font-bold text-zinc-300 mb-1 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" /> 摄影机物理轨迹 (Camera Trajectory & Kinematics)
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-mono">{activeRecipe.cameraTrajectory}</p>
            </div>

            {/* Sound Cues */}
            <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <div className="text-xs font-bold text-zinc-300 mb-2 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-red-400" /> 音效设计与节奏卡点 (Sound Stems & Beat Sync)
              </div>
              <div className="space-y-1.5">
                {activeRecipe.soundCues.map((cue, i) => (
                  <div key={i} className="text-xs text-zinc-300 flex items-center gap-2 bg-zinc-950/60 p-1.5 rounded-lg border border-zinc-800/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                    <span>{cue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Remotion Code Snippet */}
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
              <div className="text-xs font-bold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-emerald-400" /> Remotion 物理动效函数 (Remotion Code)
              </div>
              <pre className="p-2.5 rounded-lg bg-black text-[11px] font-mono text-emerald-300 overflow-x-auto border border-zinc-800">
                <code>{activeRecipe.remotionKinematics}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between text-xs text-zinc-400">
          <span>共收录 10+ 动作电影专用 Shot Recipe Cards</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition font-medium"
          >
            完成浏览
          </button>
        </div>
      </div>
    </div>
  );
};
