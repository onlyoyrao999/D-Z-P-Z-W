import React from 'react';
import { Compass, MoveVertical, Mountain, Crosshair, Sparkles } from 'lucide-react';
import { SpatialAnchorSettings } from '../types';

interface Props {
  anchors: SpatialAnchorSettings;
  onChange: (updated: SpatialAnchorSettings) => void;
}

const VERTICAL_PRESETS = [
  '脚掌死扣凹凸青石地表，下陷三寸，重力扎实稳固',
  '离地三尺悬空平坐，周身微浮，绝无无重力漂浮轻佻感',
  '单足尖借力三指枯木横梁，重心下坠微弯，韧性十足',
  '单膝重重跪砸冻土深处，冻冰如蛛网向外龟裂扩散',
  '双足如铁桩死死钉入大地，泥土齐脚踝凹陷形成深坑'
];

const ENV_PRESETS = [
  '背依残破古刹断壁中轴线，距离中央香炉基座三步之遥',
  '处于荒漠环形石阵圆心，正对残阳落山正西方射光',
  '枯木古树主枝头三丈高处，下方为激流深渊悬崖',
  '瀑布正下方水潭中央突起青岩，周遭水花激荡漫卷',
  '竹林幽径中央石道第七块石板，两侧合抱巨竹齐肩对立'
];

const GEOMETRIC_PRESETS = [
  '弓步拧腰呈对角线撕裂姿态，兵刃中轴笔挺，构成强识别几何对冲角',
  '横置古琴平放双膝构成等腰三角形剪影，双肘外展形成稳固底座',
  '反手提刀呈垂直九十度中轴线，身形微侧呈刀锋剪影直角',
  '双刀胸前交叉成正X型反击绞架，头颅微埋于双腕之后',
  '身体伏地成三十度倾角流线刺杀剪影，枪尖直锁前方丈许虚空'
];

const FIELD_PRESETS = [
  '半径两米内气流骤然沉降形成绝对真空区，外围尘土漫卷，内层衣袂刚性凝固',
  '周身三米重力加倍，飞扬碎石骤然急速下坠夯实入土',
  '极寒气场扩散五步，地面积水瞬间结晶为厚重硬冰，空气浮游冰渣',
  '烈焰气劲环形排斥，周遭五米热浪翻涌扭曲，杂物瞬间自燃发黑',
  '气流狂暴自转形成漏斗风眼，风眼内部绝对平稳死寂，外部飞沙走石'
];

export const SpatialAnchoringPanel: React.FC<Props> = ({ anchors, onChange }) => {
  const updateField = (key: keyof SpatialAnchorSettings, value: string) => {
    onChange({
      ...anchors,
      [key]: value
    });
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-1.5">
              全局空间站位记忆点法则
              <span className="text-[10px] text-amber-400 font-semibold px-1.5 py-0.2 bg-amber-950/60 border border-amber-800/40 rounded">
                防漂移变形铁律
              </span>
            </h3>
            <p className="text-xs text-zinc-400">
              死锁人物与环境相对坐标，杜绝 AI 画面中人物无重力漂浮、肢体失真
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. 绝对高度与接触状态 */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <MoveVertical className="w-3.5 h-3.5 text-blue-400" />
              1. 绝对高度与接触状态 (Vertical Anchor)
            </span>
          </label>
          <input
            type="text"
            value={anchors.verticalAnchor}
            onChange={(e) => updateField('verticalAnchor', e.target.value)}
            placeholder="如：脚掌死扣凹凸青石地表，下陷三寸"
            className="w-full text-xs px-3 py-2 bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50"
          />
          <div className="flex flex-wrap gap-1 pt-1">
            {VERTICAL_PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => updateField('verticalAnchor', p)}
                className="text-[11px] px-2 py-0.5 rounded bg-zinc-800/70 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-750 transition truncate max-w-full text-left"
              >
                {p.slice(0, 15)}...
              </button>
            ))}
          </div>
        </div>

        {/* 2. 环境地貌参照系 */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Mountain className="w-3.5 h-3.5 text-emerald-400" />
              2. 环境地貌参照系 (Environmental Coordinates)
            </span>
          </label>
          <input
            type="text"
            value={anchors.environmentalCoordinates}
            onChange={(e) => updateField('environmentalCoordinates', e.target.value)}
            placeholder="如：背依古刹断壁中轴线，离香炉三步"
            className="w-full text-xs px-3 py-2 bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50"
          />
          <div className="flex flex-wrap gap-1 pt-1">
            {ENV_PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => updateField('environmentalCoordinates', p)}
                className="text-[11px] px-2 py-0.5 rounded bg-zinc-800/70 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-750 transition truncate max-w-full text-left"
              >
                {p.slice(0, 15)}...
              </button>
            ))}
          </div>
        </div>

        {/* 3. 肢体与兵刃几何构图 */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5 text-amber-400" />
              3. 肢体构图剪影 (Geometric Silhouette)
            </span>
          </label>
          <input
            type="text"
            value={anchors.geometricSilhouette}
            onChange={(e) => updateField('geometricSilhouette', e.target.value)}
            placeholder="如：弓步拧腰呈对角线撕裂姿态，横琴呈等腰三角"
            className="w-full text-xs px-3 py-2 bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50"
          />
          <div className="flex flex-wrap gap-1 pt-1">
            {GEOMETRIC_PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => updateField('geometricSilhouette', p)}
                className="text-[11px] px-2 py-0.5 rounded bg-zinc-800/70 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-750 transition truncate max-w-full text-left"
              >
                {p.slice(0, 15)}...
              </button>
            ))}
          </div>
        </div>

        {/* 4. 场域空间断层 */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              4. 场域空间断层 (Spatial Disruption Field)
            </span>
          </label>
          <input
            type="text"
            value={anchors.spatialDisruptionField}
            onChange={(e) => updateField('spatialDisruptionField', e.target.value)}
            placeholder="如：半径两米内气流沉降压出绝对真空，外围碎石横飞"
            className="w-full text-xs px-3 py-2 bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50"
          />
          <div className="flex flex-wrap gap-1 pt-1">
            {FIELD_PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => updateField('spatialDisruptionField', p)}
                className="text-[11px] px-2 py-0.5 rounded bg-zinc-800/70 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-750 transition truncate max-w-full text-left"
              >
                {p.slice(0, 15)}...
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
