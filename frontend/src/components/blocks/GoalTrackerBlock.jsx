import React, { useState } from 'react';

const GoalTrackerBlock = ({ initialGoal = { title: '', current: 0, target: 100, unit: '%' } }) => {
  const [goal, setGoal] = useState(initialGoal);

  const calculateProgress = () => {
    if (goal.target === 0) return 0;
    return Math.min(100, Math.max(0, (goal.current / goal.target) * 100));
  };

  return (
    <div className="w-full font-body bg-academia-paper p-5 border border-academia-leather shadow-sm rounded-sm">
      <div className="flex justify-between items-end mb-3">
        <input
          type="text"
          value={goal.title}
          onChange={(e) => setGoal({ ...goal, title: e.target.value })}
          placeholder="Define your objective..."
          className="font-serif text-lg text-academia-ink font-semibold bg-transparent outline-none placeholder-academia-inkLight/60 w-2/3"
        />
        <div className="flex items-center text-sm text-academia-inkLight space-x-1">
          <input
            type="number"
            value={goal.current}
            onChange={(e) => setGoal({ ...goal, current: Number(e.target.value) })}
            className="w-12 bg-transparent border-b border-academia-leather text-center outline-none text-academia-ink"
          />
          <span>/</span>
          <input
            type="number"
            value={goal.target}
            onChange={(e) => setGoal({ ...goal, target: Number(e.target.value) })}
            className="w-12 bg-transparent border-b border-academia-leather text-center outline-none text-academia-ink"
          />
          <input
            type="text"
            value={goal.unit}
            onChange={(e) => setGoal({ ...goal, unit: e.target.value })}
            className="w-8 bg-transparent text-left outline-none text-academia-inkLight italic"
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-academia-leather/30 rounded-full overflow-hidden border border-academia-leather/50">
        <div 
          className="h-full bg-academia-gold transition-all duration-500 ease-out"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>
    </div>
  );
};

export default GoalTrackerBlock;