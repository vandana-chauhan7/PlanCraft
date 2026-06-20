import React, { useState } from 'react';

const CalendarBlock = ({ initialWeek = ['', '', '', '', '', '', ''] }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [weekData, setWeekData] = useState(initialWeek);

  const updateDay = (index, text) => {
    const newWeek = [...weekData];
    newWeek[index] = text;
    setWeekData(newWeek);
  };

  return (
    <div className="w-full font-body">
      <h4 className="font-serif text-lg text-academia-ink mb-4 border-b border-academia-leather pb-1">Weekly Agenda</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {days.map((day, index) => (
          <div 
            key={day} 
            className={`flex flex-col border border-academia-leather/60 p-2 ${index === 6 ? 'md:col-span-2' : ''}`}
          >
            <span className="text-xs font-serif uppercase tracking-widest text-academia-inkLight mb-1">
              {day}
            </span>
            <textarea
              value={weekData[index]}
              onChange={(e) => updateDay(index, e.target.value)}
              className="w-full bg-transparent outline-none resize-none text-academia-ink text-sm min-h-[60px]"
              placeholder="Notes..."
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarBlock;