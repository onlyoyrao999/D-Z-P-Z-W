import React, { useState } from 'react';
import { X, Copy, Check, Download, Sparkles, ExternalLink } from 'lucide-react';
import { DOUBAO_CODEX_SKILL_MD } from '../data/skillTemplate';

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
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([DOUBAO_CODEX_SKILL_MD], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '动作武打戏自动填充-Skill-工业级.md';
    link.click();
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
                安装到 豆包 (Doubao) / Codex / GPTs / Claude
              </h2>
              <p className="text-xs text-zinc-400">
                支持直接将【顶级动作onlyno999】（作者：onlyno999）完整工业级 Skill 注入任何 AI 智能体
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
              <div className="font-semibold text-zinc-200">复制下方 Skill 指令</div>
              <div className="text-[11px] text-zinc-400">
                包含完整角色定义、32核心库与终极奥义法则
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
              2
            </span>
            <div>
              <div className="font-semibold text-zinc-200">粘贴至豆包/智能体设定</div>
              <div className="text-[11px] text-zinc-400">
                进入豆包“创建智能体”或 Codex 的“Prompt/System Instructions”
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
              3
            </span>
            <div>
              <div className="font-semibold text-zinc-200">随时输入草稿即可自动扩写</div>
              <div className="text-[11px] text-zinc-400">
                支持纯文字草稿或图片参考，严格按工业级格式交付
              </div>
            </div>
          </div>
        </div>

        {/* Markdown Content Area */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 bg-zinc-950/90 font-mono text-xs text-zinc-300 leading-relaxed">
          <pre className="whitespace-pre-wrap select-all">{DOUBAO_CODEX_SKILL_MD}</pre>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
          <span className="text-xs text-zinc-400 hidden sm:inline">
            共收录 32 式动作核心、50+ 终极奥义、四大空间锚定法则与 Hollywood 运镜标准
          </span>

          <div className="flex items-center gap-2.5 ml-auto">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition"
            >
              <Download className="w-3.5 h-3.5" />
              下载 .md 文件
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-400 hover:to-red-400 text-black rounded-lg transition shadow-md shadow-amber-950/40"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> 已复制到剪贴板！
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> 一键全选复制 Skill
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
