import React from 'react';
import { Camera, Film, Palette, Sliders, Activity, Zap } from 'lucide-react';
import { CameraSettings, ColorGrading } from '../types';

interface Props {
  camera: CameraSettings;
  colorGrading: ColorGrading;
  onCameraChange: (updated: CameraSettings) => void;
  onColorChange: (updated: ColorGrading) => void;
}

const CAMERA_MOVEMENTS = [
  { id: 'whip_pan', label: '极速甩镜 (Whip Pan)', desc: '追击→跟丢→越过→极速甩镜锁头' },
  { id: 'crash_zoom', label: '快速推镜 (Crash Zoom)', desc: '瞬间拉近至骨节或刀尖特写' },
  { id: 'low_angle_chase', label: '从下方猛烈追击 (Aggressive low-angle chase)', desc: '贴地仰角爆发推进' },
  { id: 'canted_tilt', label: '倾斜摇角 (Dutch angle / Canted tilt)', desc: '打破地平线烘托压迫感' },
  { id: 'momentary_orbit', label: '短暂受控环绕 (Controlled momentary orbit)', desc: '以交击点为圆心半圈环扫' },
  { id: 'wide_sweep', label: '广角运镜 (Wide-angle kinetic sweep)', desc: '展现宏大环境与气浪撕扯' },
  { id: 'impact_close_up', label: '撞击特写 (Impact close-up)', desc: '紧扣拳锋或刀镡相交受力帧' }
];

const COLOR_PRESETS: ColorGrading[] = [
  {
    presetName: '破败雨夜古刹 (冷峻青灰)',
    baseColor: '#393B3E',
    baseDesc: '青灰瓦色与冷暗湿岩',
    highlightColor: '#D9F0FF',
    highlightDesc: '剑阵幽蓝与电光白芒',
    burstColor: '#1F2B3E',
    burstDesc: '暴风暗调逆光剪影'
  },
  {
    presetName: '荒漠残阳死斗 (琥珀金黄)',
    baseColor: '#5A5E65',
    baseDesc: '风蚀石灰与焦灼黄沙',
    highlightColor: '#FF9800',
    highlightDesc: '爆炎烈火与纯金拳芒',
    burstColor: '#1F1A17',
    burstDesc: '晚霞残暮黑炭死界'
  },
  {
    presetName: '雪山绝巅极冻 (万古冰霜)',
    baseColor: '#6E8294',
    baseDesc: '低饱和青空与风雪青岩',
    highlightColor: '#E8EEF5',
    highlightDesc: '真空风刃与剔透玄冰白',
    burstColor: '#0E1724',
    burstDesc: '极寒暴风雪漏斗黑昼'
  },
  {
    presetName: '幽冥黄泉魔境 (煞紫深黑)',
    baseColor: '#2B2B30',
    baseDesc: '焦黑泥炭与阴森死气',
    highlightColor: '#4A0E4E',
    highlightDesc: '极灭煞紫与赤红魔火',
    burstColor: '#0B0910',
    burstDesc: '九幽黑洞万籁俱寂'
  }
];

export const CameraControls: React.FC<Props> = ({
  camera,
  colorGrading,
  onCameraChange,
  onColorChange
}) => {
  const toggleMovement = (label: string) => {
    const exists = camera.selectedMovements.includes(label);
    const updated = exists
      ? camera.selectedMovements.filter((m) => m !== label)
      : [...camera.selectedMovements, label];
    onCameraChange({ ...camera, selectedMovements: updated });
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-1.5">
              好莱坞电影工业摄影与运镜动力学
              <span className="text-[10px] text-red-400 font-semibold px-1.5 py-0.2 bg-red-950/60 border border-red-800/40 rounded">
                ARRI Alexa 65 规格
              </span>
            </h3>
            <p className="text-xs text-zinc-400">
              真实物理惯性运镜 · 冲击四要素 · 双轨色彩调色盘
            </p>
          </div>
        </div>
      </div>

      {/* 视觉强化四要素 (Impact Elements) */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          视觉强化四要素（冲击感与物理反馈铁律）
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <label className="flex items-center gap-2 text-xs p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition">
            <input
              type="checkbox"
              checked={true}
              readOnly
              className="rounded bg-zinc-900 border-zinc-700 text-amber-500 focus:ring-0"
            />
            <div>
              <div className="font-semibold text-zinc-200">0.1s 闪白冲击帧</div>
              <div className="text-[10px] text-zinc-400">全屏瞬间过曝 Flash</div>
            </div>
          </label>

          <label className="flex items-center gap-2 text-xs p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition">
            <input
              type="checkbox"
              checked={camera.screenShake}
              onChange={(e) =>
                onCameraChange({ ...camera, screenShake: e.target.checked })
              }
              className="rounded bg-zinc-900 border-zinc-700 text-amber-500 focus:ring-0"
            />
            <div>
              <div className="font-semibold text-zinc-200">0.3s 镜头震颤</div>
              <div className="text-[10px] text-zinc-400">振幅先强后弱平缓</div>
            </div>
          </label>

          <label className="flex items-center gap-2 text-xs p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition">
            <input
              type="checkbox"
              checked={camera.hitStop}
              onChange={(e) =>
                onCameraChange({ ...camera, hitStop: e.target.checked })
              }
              className="rounded bg-zinc-900 border-zinc-700 text-amber-500 focus:ring-0"
            />
            <div>
              <div className="font-semibold text-zinc-200">0.1s 打击微滞</div>
              <div className="text-[10px] text-zinc-400">Hit Stop / 顿挫节奏</div>
            </div>
          </label>

          <label className="flex items-center gap-2 text-xs p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition">
            <input
              type="checkbox"
              checked={camera.accelerationBlur}
              onChange={(e) =>
                onCameraChange({ ...camera, accelerationBlur: e.target.checked })
              }
              className="rounded bg-zinc-900 border-zinc-700 text-amber-500 focus:ring-0"
            />
            <div>
              <div className="font-semibold text-zinc-200">加速度动态模糊</div>
              <div className="text-[10px] text-zinc-400">仅在峰值与甩镜出现</div>
            </div>
          </label>
        </div>
      </div>

      {/* 摄影机运动动力学 (Movement Sequence) */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5 text-blue-400" />
          空中追踪锁头链路与机位库
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CAMERA_MOVEMENTS.map((item) => {
            const isSelected = camera.selectedMovements.includes(item.label);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleMovement(item.label)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border text-left transition flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500/50 text-amber-300'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
                title={item.desc}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? 'bg-amber-400' : 'bg-zinc-600'
                  }`}
                />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 视觉色彩基调调色盘 */}
      <div className="space-y-2.5 pt-2 border-t border-zinc-800/80">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-purple-400" />
            视效色彩基调配比
          </div>
          <div className="flex items-center gap-1">
            {COLOR_PRESETS.map((cp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onColorChange(cp)}
                className={`text-[11px] px-2 py-0.5 rounded border transition ${
                  colorGrading.presetName === cp.presetName
                    ? 'bg-zinc-800 text-amber-400 border-amber-500/40'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                }`}
              >
                {cp.presetName.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded border border-zinc-700 shrink-0 shadow-inner"
              style={{ backgroundColor: colorGrading.baseColor }}
            />
            <div className="overflow-hidden">
              <div className="text-[11px] text-zinc-400">常态环境底色 (暗调厚重)</div>
              <div className="font-semibold text-zinc-200 truncate">
                {colorGrading.baseDesc}
              </div>
              <div className="text-[10px] text-zinc-500 font-mono">
                {colorGrading.baseColor}
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded border border-zinc-700 shrink-0 shadow-inner"
              style={{ backgroundColor: colorGrading.highlightColor }}
            />
            <div className="overflow-hidden">
              <div className="text-[11px] text-zinc-400">招式能量高光 (强对比)</div>
              <div className="font-semibold text-zinc-200 truncate">
                {colorGrading.highlightDesc}
              </div>
              <div className="text-[10px] text-zinc-500 font-mono">
                {colorGrading.highlightColor}
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded border border-zinc-700 shrink-0 shadow-inner"
              style={{ backgroundColor: colorGrading.burstColor }}
            />
            <div className="overflow-hidden">
              <div className="text-[11px] text-zinc-400">极招天地变色 (压暗剪影)</div>
              <div className="font-semibold text-zinc-200 truncate">
                {colorGrading.burstDesc}
              </div>
              <div className="text-[10px] text-zinc-500 font-mono">
                {colorGrading.burstColor}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
