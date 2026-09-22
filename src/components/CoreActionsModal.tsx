import React, { useState } from 'react';
import { X, Search, Zap, Check, ArrowRight } from 'lucide-react';
import { CORE_ACTIONS } from '../data/coreActions';
import { CoreAction } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedActionId?: string;
  onSelectAction: (action: CoreAction) => void;
  onInsertIntoDraft: (actionName: string) => void;
}

export const CoreActionsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedActionId,
  onSelectAction,
  onInsertIntoDraft
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModule, setActiveModule] = useState<'all' | 'xianxia' | 'hardcore'>('all');

  if (!isOpen) return null;

  const filtered = CORE_ACTIONS.filter((item) => {
    const matchesSearch =
      item.name.includes(searchTerm) ||
      item.description.includes(searchTerm) ||
      item.tags.some((t) => t.includes(searchTerm));

    if (activeModule === 'xianxia') {
      return matchesSearch && item.module === '仙侠玄幻与高燃漫剧体系';
    }
    if (activeModule === 'hardcore') {
      return matchesSearch && item.module === '硬核体术与兵刃实战体系';
    }
    return matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
                32条高燃武打核心库 (Internal Knowledge Base)
                <span className="text-xs font-normal text-zinc-400">
                  (已收录 32 式)
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                涵盖仙侠高燃漫剧体系与硬核冷兵刃体术体系，点击可绑定动作或快速插入草稿
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

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-zinc-800/80 bg-zinc-900/30 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setActiveModule('all')}
              className={`text-xs px-3 py-1.5 rounded-lg transition font-medium ${
                activeModule === 'all'
                  ? 'bg-amber-500 text-black font-semibold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              全部 (32)
            </button>
            <button
              onClick={() => setActiveModule('xianxia')}
              className={`text-xs px-3 py-1.5 rounded-lg transition font-medium ${
                activeModule === 'xianxia'
                  ? 'bg-amber-500 text-black font-semibold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              模块一：仙侠玄幻 (#1-#20)
            </button>
            <button
              onClick={() => setActiveModule('hardcore')}
              className={`text-xs px-3 py-1.5 rounded-lg transition font-medium ${
                activeModule === 'hardcore'
                  ? 'bg-amber-500 text-black font-semibold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              模块二：硬核实战 (#21-#32)
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索动作名称、兵器、特性..."
              className="w-full text-xs pl-8 pr-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Action List Grid */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filtered.map((action) => {
            const isSelected = selectedActionId === action.id;
            return (
              <div
                key={action.id}
                className={`p-3.5 rounded-xl border transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/60 shadow-md shadow-amber-950/30'
                    : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-amber-400 font-bold border border-zinc-750">
                        #{action.number}
                      </span>
                      <h4 className="text-sm font-bold text-zinc-100">
                        {action.name}
                      </h4>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800/90 text-zinc-400">
                      {action.module.split('与')[0]}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed mb-2.5">
                    {action.description}
                  </p>

                  <div className="space-y-1 text-[11px] text-zinc-400 bg-zinc-950/70 p-2.5 rounded-lg border border-zinc-850">
                    <div>
                      <span className="text-blue-400 font-medium">运镜动力学：</span>
                      {action.cameraMovement}
                    </div>
                    <div>
                      <span className="text-amber-400 font-medium">视效光影：</span>
                      {action.lightingAndVFX}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {action.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        onInsertIntoDraft(action.name);
                        onClose();
                      }}
                      className="text-xs px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
                      title="插入到草稿输入框"
                    >
                      插入草稿
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectAction(action);
                        onClose();
                      }}
                      className={`text-xs px-3 py-1 rounded font-semibold transition flex items-center gap-1 ${
                        isSelected
                          ? 'bg-amber-500 text-black'
                          : 'bg-amber-600 hover:bg-amber-500 text-black'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> 已选定
                        </>
                      ) : (
                        '绑定为此招'
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
