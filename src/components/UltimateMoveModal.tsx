import React, { useState } from 'react';
import { X, Search, BookOpen, Check, Flame, AlertCircle } from 'lucide-react';
import { ULTIMATE_MOVES } from '../data/ultimateMoves';
import { UltimateMove } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedUltimateId?: string;
  onSelectUltimate: (move: UltimateMove) => void;
  onInsertIntoDraft: (moveName: string) => void;
}

export const UltimateMoveModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedUltimateId,
  onSelectUltimate,
  onInsertIntoDraft
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<string>('all');

  if (!isOpen) return null;

  // Extract distinct series
  const seriesList = Array.from(new Set(ULTIMATE_MOVES.map((m) => m.series)));

  const filtered = ULTIMATE_MOVES.filter((item) => {
    const matchesSearch =
      item.name.includes(searchTerm) ||
      item.series.includes(searchTerm) ||
      item.shouting.includes(searchTerm) ||
      item.tags.some((t) => t.includes(searchTerm));

    if (selectedSeries === 'all') return matchesSearch;
    return matchesSearch && item.series === selectedSeries;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-zinc-950 border border-red-900/60 rounded-2xl flex flex-col shadow-2xl shadow-red-950/40 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-gradient-to-r from-red-950/40 to-zinc-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
                [终极奥义] 专属资料库
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800/80 font-mono">
                  共 {ULTIMATE_MOVES.length} 式绝学
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                触发铁律：段落内坚决剔除镜头运镜与面部表情描写，只保留纯粹口型喊名与绝对空间站位记忆点
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning Banner */}
        <div className="px-4 py-2 bg-red-950/30 border-b border-red-900/40 flex items-center gap-2 text-xs text-red-300">
          <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
          <span>
            系统调用规则：仅当输入中明确出现“终极奥义”、“绝招”、“必杀”、“奥义”时定向调取；选择下列奥义可自动绑定并激发奥义模式！
          </span>
        </div>

        {/* Series Tabs & Search */}
        <div className="p-4 border-b border-zinc-800/80 bg-zinc-900/40 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-thin">
            <button
              onClick={() => setSelectedSeries('all')}
              className={`text-xs px-3 py-1.5 rounded-lg transition font-medium whitespace-nowrap ${
                selectedSeries === 'all'
                  ? 'bg-red-600 text-white font-semibold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              全部系列 ({ULTIMATE_MOVES.length})
            </button>
            {seriesList.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSeries(s)}
                className={`text-xs px-2.5 py-1.5 rounded-lg transition whitespace-nowrap ${
                  selectedSeries === s
                    ? 'bg-red-600 text-white font-semibold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {s.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索奥义招式、喊名、流派..."
              className="w-full text-xs pl-8 pr-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Moves List Grid */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((move) => {
            const isSelected = selectedUltimateId === move.id;
            return (
              <div
                key={move.id}
                className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-red-950/30 border-red-500/70 shadow-lg shadow-red-950/40 ring-1 ring-red-500/40'
                    : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-zinc-100 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      {move.name}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      {move.series.split(' ')[0]}
                    </span>
                  </div>

                  {/* 5-step strict structure preview */}
                  <div className="space-y-1.5 text-xs bg-zinc-950/80 p-3 rounded-lg border border-zinc-850">
                    <div className="text-zinc-300">
                      <span className="text-amber-400 font-semibold">【空间站位记忆点】：</span>
                      {move.spatialAnchor}
                    </div>
                    <div className="text-zinc-300">
                      <span className="text-blue-400 font-semibold">【起手式】：</span>
                      {move.startPose}
                    </div>
                    <div className="text-zinc-300">
                      <span className="text-purple-400 font-semibold">【蓄力中】：</span>
                      {move.charging}
                    </div>
                    <div className="text-amber-300 bg-amber-950/20 px-2 py-1 rounded border border-amber-900/30">
                      <span className="text-amber-400 font-bold">【口型喊名】：</span>
                      {move.shouting}
                    </div>
                    <div className="text-zinc-300">
                      <span className="text-red-400 font-semibold">【轰然出招】：</span>
                      {move.execution}
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {move.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        onInsertIntoDraft(`释放终极奥义：${move.name}`);
                        onClose();
                      }}
                      className="text-xs px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
                      title="插入到打斗草稿输入框"
                    >
                      插入草稿
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectUltimate(move);
                        onClose();
                      }}
                      className={`text-xs px-3 py-1 rounded font-semibold transition flex items-center gap-1 ${
                        isSelected
                          ? 'bg-red-600 text-white'
                          : 'bg-red-700 hover:bg-red-600 text-white'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> 已激活奥义
                        </>
                      ) : (
                        '设为终极奥义'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
