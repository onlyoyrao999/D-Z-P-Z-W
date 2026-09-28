import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Terminal, FileText, Download, CheckCircle2, ExternalLink } from 'lucide-react';
import { DOUBAO_CODEX_SKILL_MD } from '../data/skillTemplate';
import { FIGHT_DIRECTOR_META } from '../data/fightDirectorData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const DoubaoInstallModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(DOUBAO_CODEX_SKILL_MD);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([DOUBAO_CODEX_SKILL_MD], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AI动作导演_FightPromptDirector_Skill.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-zinc-950 border border-amber-600/50 rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-gradient-to-r from-amber-950/40 via-red-950/20 to-zinc-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
                导出 / 安装 AI 动作导演 Skill
              </h2>
              <p className="text-xs text-zinc-400">
                主核心：{FIGHT_DIRECTOR_META.primarySkillName} (irenerachel) × Video-Shotcraft × 顶级动作
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

        {/* Step Guide */}
        <div className="p-4 bg-zinc-900/60 border-b border-zinc-800 text-xs text-zinc-300 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
              1
            </span>
            <div>
              <div className="font-semibold text-zinc-200">复制下方 Skill 完整指令</div>
              <div className="text-[11px] text-zinc-400">
                包含动作因果律、180°轴线、Shotcraft配方与111式奥义
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
              2
            </span>
            <div>
              <div className="font-semibold text-zinc-200">粘贴至智能体 System Prompt</div>
              <div className="text-[11px] text-zinc-400">
                进入豆包“创建智能体”、Coze、Dify 或 Codex 的 System Instructions
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
              3
            </span>
            <div>
              <div className="font-semibold text-zinc-200">直接对话生成导演级分镜</div>
              <div className="text-[11px] text-zinc-400">
                输入任何打斗草稿，自动编译为 Seedance/MiniMax/Sora 交付包
              </div>
            </div>
          </div>
        </div>

        {/* Code Preview Box */}
        <div className="flex-1 p-4 overflow-y-auto bg-zinc-950/80">
          <div className="relative">
            <pre className="p-4 rounded-xl bg-black border border-zinc-800 text-xs font-mono text-zinc-300 overflow-x-auto whitespace-pre leading-relaxed select-all">
              {DOUBAO_CODEX_SKILL_MD}
            </pre>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-zinc-500 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>兼容 豆包 / Codex / GPTs / Claude / Coze / Dify</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-xl transition"
            >
              <Download className="w-4 h-4" />
              下载 SKILL.md
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold bg-gradient-to-r from-amber-500 via-amber-600 to-red-600 hover:from-amber-400 hover:to-red-500 text-black rounded-xl transition shadow-lg shadow-amber-950/40"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-black" />
                  已复制到剪贴板！
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  一键复制完整 Agent Skill
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
