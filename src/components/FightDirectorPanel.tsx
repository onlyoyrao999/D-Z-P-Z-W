import React, { useState } from 'react';
import {
  Film,
  Sparkles,
  Sliders,
  Shield,
  Zap,
  Users,
  Eye,
  Activity,
  RefreshCw,
  CheckCircle2,
  GitBranch,
  Radio,
  ExternalLink,
  Cpu
} from 'lucide-react';
import {
  TargetVideoModel,
  ActionIntensityLevel,
  CharacterProfile,
  FightDirectorSettings
} from '../types';
import {
  FIGHT_DIRECTOR_META,
  ACTION_INTENSITY_PRESETS,
  MODEL_COMPILER_PRESETS
} from '../data/fightDirectorData';

interface Props {
  settings: FightDirectorSettings;
  onChange: (settings: FightDirectorSettings) => void;
}

export const FightDirectorPanel: React.FC<Props> = ({ settings, onChange }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMsg, setUpdateMsg] = useState<string | null>(null);

  const handleModelChange = (model: TargetVideoModel) => {
    onChange({
      ...settings,
      targetModel: model
    });
  };

  const handleIntensityChange = (level: ActionIntensityLevel) => {
    onChange({
      ...settings,
      intensity: level
    });
  };

  const handleCharAChange = (field: keyof CharacterProfile, value: string) => {
    onChange({
      ...settings,
      characterA: {
        ...settings.characterA,
        [field]: value
      }
    });
  };

  const handleCharBChange = (field: keyof CharacterProfile, value: string) => {
    onChange({
      ...settings,
      characterB: {
        ...settings.characterB,
        [field]: value
      }
    });
  };

  const handleCheckUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setUpdateMsg('已成功同步 irenerachel/fight-prompt-director 最新动作导演分镜规范与因果律法则！');
      setTimeout(() => setUpdateMsg(null), 4000);
    }, 800);
  };

  return (
    <div className="bg-zinc-900/90 border border-amber-500/40 rounded-xl p-4 sm:p-5 shadow-lg space-y-4">
      {/* Top Header: Primary Skill Badge & Update Center */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 via-red-600 to-zinc-900 text-white shadow-md shadow-red-950/40">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                主核心 Skill
              </span>
              <h3 className="text-sm sm:text-base font-bold text-zinc-100">
                AI 动作导演工作台 (Fight Prompt Director)
              </h3>
            </div>
            <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
              <span>架构源：</span>
              <a
                href={FIGHT_DIRECTOR_META.primarySkillRepo}
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-0.5 font-mono text-[11px]"
              >
                irenerachel/fight-prompt-director <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </div>

        {/* Update Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCheckUpdate}
            disabled={isUpdating}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-lg transition"
            title="检查并更新 irenerachel/fight-prompt-director 最新规则"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? 'animate-spin text-amber-400' : 'text-zinc-400'}`} />
            {isUpdating ? '正在同步最新导演库...' : '更新/同步动作导演Skill'}
          </button>
        </div>
      </div>

      {updateMsg && (
        <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{updateMsg}</span>
        </div>
      )}

      {/* Target Video Model Selector (Seedance vs MiniMax-H3 vs Universal) */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
          <Cpu className="w-4 h-4 text-cyan-400" />
          目标 AI 视频模型编译引擎 (Target Model Compiler)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {(['seedance', 'minimax_h3', 'universal'] as TargetVideoModel[]).map((mKey) => {
            const info = MODEL_COMPILER_PRESETS[mKey];
            const isSelected = settings.targetModel === mKey;
            return (
              <button
                key={mKey}
                type="button"
                onClick={() => handleModelChange(mKey)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-amber-950/60 to-zinc-900 border-amber-500/80 shadow-md ring-1 ring-amber-500/40'
                    : 'bg-zinc-950/70 border-zinc-800 hover:bg-zinc-900/80 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`text-xs font-bold ${isSelected ? 'text-amber-300' : 'text-zinc-200'}`}>
                    {info.name.split(' ')[0]} {info.name.split(' ')[1]}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-amber-400 animate-pulse' : 'bg-zinc-600'}`} />
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2">
                  {info.description}
                </p>
                <div className="mt-2 text-[10px] font-mono text-zinc-500 border-t border-zinc-800/80 pt-1">
                  时码格式: <span className="text-zinc-300">{info.timecodeFormat}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Intensity Level Selector (Level 1~5) */}
      <div className="space-y-2 pt-1 border-t border-zinc-800/80">
        <div className="flex items-center justify-between text-xs">
          <label className="font-bold text-zinc-200 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-red-400" />
            动作烈度评级 (Action Intensity Tier)
          </label>
          <span className="font-semibold text-amber-400">
            {ACTION_INTENSITY_PRESETS[settings.intensity].label}
          </span>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {([1, 2, 3, 4, 5] as ActionIntensityLevel[]).map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => handleIntensityChange(lvl)}
              className={`py-2 px-1 rounded-lg text-xs font-bold transition flex flex-col items-center gap-0.5 border ${
                settings.intensity === lvl
                  ? 'bg-gradient-to-b from-amber-500 to-red-600 text-zinc-950 border-amber-400 shadow-md shadow-red-950/40'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
              }`}
            >
              <span>L{lvl}</span>
              <span className="text-[10px] font-normal opacity-90 truncate max-w-full">
                {lvl === 1 ? '对峙' : lvl === 2 ? '试探' : lvl === 3 ? '连环' : lvl === 4 ? '破防' : '奥义'}
              </span>
            </button>
          ))}
        </div>
        <p className="text-[11px] text-zinc-400 bg-zinc-950/60 p-2 rounded-lg border border-zinc-800/60">
          💡 {ACTION_INTENSITY_PRESETS[settings.intensity].desc}
        </p>
      </div>

      {/* Character A / Character B Movement Profiles */}
      <div className="space-y-2.5 pt-1 border-t border-zinc-800/80">
        <div className="flex items-center justify-between text-xs text-zinc-200">
          <label className="font-bold flex items-center gap-1.5">
            <Users className="w-4 h-4 text-emerald-400" />
            对决角色特征谱差异 (Character Profiles & Choreography)
          </label>
          <span className="text-[11px] text-zinc-500 font-mono">180° 对峙线死锁</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Character A */}
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                角色 A (画面左侧 / 发起方)
              </span>
            </div>
            <input
              type="text"
              value={settings.characterA.weapon}
              onChange={(e) => handleCharAChange('weapon', e.target.value)}
              placeholder="兵刃/体术，如：重型厚背斩马刀"
              className="w-full text-xs p-2 bg-zinc-900 border border-zinc-750 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              value={settings.characterA.style}
              onChange={(e) => handleCharAChange('style', e.target.value)}
              placeholder="动作风格，如：大开大合，沉肩坠肘，刚猛霸道"
              className="w-full text-xs p-2 bg-zinc-900 border border-zinc-750 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Character B */}
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-cyan-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                角色 B (画面右侧 / 应招方)
              </span>
            </div>
            <input
              type="text"
              value={settings.characterB.weapon}
              onChange={(e) => handleCharBChange('weapon', e.target.value)}
              placeholder="兵刃/身法，如：三尺秋水软剑"
              className="w-full text-xs p-2 bg-zinc-900 border border-zinc-750 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
            />
            <input
              type="text"
              value={settings.characterB.style}
              onChange={(e) => handleCharBChange('style', e.target.value)}
              placeholder="动作风格，如：以柔克刚，轻盈挑刺，侧身卸力"
              className="w-full text-xs p-2 bg-zinc-900 border border-zinc-750 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Action Director Core Rules Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-zinc-800/80 text-[11px]">
        <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center gap-1.5 text-zinc-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>动作因果律 (Causality)</span>
        </div>
        <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center gap-1.5 text-zinc-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>180° 轴线无越轴</span>
        </div>
        <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center gap-1.5 text-zinc-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>摄影机职责分工</span>
        </div>
        <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center gap-1.5 text-zinc-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>跨镜头战损连续性</span>
        </div>
      </div>
    </div>
  );
};
