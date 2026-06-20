import React, { useState } from 'react';

const HabitTrackerBlock = ({ initialHabits = [] }) => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const [habits, setHabits] = useState(
    initialHabits.length > 0 ? initialHabits : [{ name: '', log: Array(7).fill(false) }]
  );

  const toggleDay = (habitIndex, dayIndex) => {
    const newHabits = [...habits];
    newHabits[habitIndex].log[dayIndex] = !newHabits[habitIndex].log[dayIndex];
    setHabits(newHabits);
  };

  const updateName = (index, value) => {
    const newHabits = [...habits];
    newHabits[index].name = value;
    setHabits(newHabits);
  };

  const addHabit = () => {
    setHabits([...habits, { name: '', log: Array(7).fill(false) }]);
  };

  return (
    <div className="w-full font-body">
      <h4 className="font-serif text-lg text-academia-ink mb-4 font-semibold">Weekly Habits</h4>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="pb-2 text-academia-inkLight font-normal italic w-1/2">Habit</th>
              {days.map((day, i) => (
                <th key={i} className="pb-2 text-center text-academia-ink font-serif w-8">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {habits.map((habit, hIndex) => (
              <tr key={hIndex} className="border-t border-academia-leather/40 group">
                <td className="py-2 pr-4">
                  <input
                    type="text"
                    value={habit.name}
                    onChange={(e) => updateName(hIndex, e.target.value)}
                    placeholder="E.g., Read 20 pages"
                    className="w-full bg-transparent outline-none text-academia-ink placeholder-academia-inkLight/50"
                  />
                </td>
                {habit.log.map((isDone, dIndex) => (
                  <td key={dIndex} className="py-2 text-center">
                    <button
                      onClick={() => toggleDay(hIndex, dIndex)}
                      className={`w-5 h-5 rounded-full border flex items-center justify-center mx-auto transition-all ${
                        isDone 
                          ? 'bg-academia-ink border-academia-ink text-academia-parchment' 
                          : 'bg-transparent border-academia-leather hover:border-academia-gold'
                      }`}
                    >
                      {isDone && <span className="block w-2 h-2 bg-academia-parchment rounded-full"></span>}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={addHabit} className="mt-4 text-sm text-academia-inkLight hover:text-academia-ink italic">
        + Add habit
      </button>
    </div>
  );
};

export default HabitTrackerBlock;