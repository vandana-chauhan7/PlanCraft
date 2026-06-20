import React from 'react';

const BlockToolbar = ({ onAddBlock }) => {
  // Define the available blocks with thematic descriptions and icons
  const availableBlocks = [
    {
      type: 'heading',
      label: 'Chapter Heading',
      description: 'A prominent serif title.',
      icon: 'M4 6h16M4 12h16M4 18h7' // Simple text lines
    },
    {
      type: 'text',
      label: 'Parchment Text',
      description: 'Standard flowing paragraphs.',
      icon: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' // Document shape
    },
    {
      type: 'checklist',
      label: 'Task Checklist',
      description: 'Tick boxes for daily objectives.',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' // Clipboard/Check
    },
    {
      type: 'habit',
      label: 'Habit Ledger',
      description: 'Track routines across the week.',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' // Clock/Time
    },
    {
      type: 'goal',
      label: 'Goal Thermometer',
      description: 'Measure progress targets.',
      icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' // Trending up chart
    },
    {
      type: 'calendar',
      label: 'Weekly Agenda',
      description: 'A 7-day grid for scheduling.',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' // Calendar
    },
    {
      type: 'notes',
      label: 'Pinned Note',
      description: 'A highlighted margin note.',
      icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z' // Bookmark/Tag
    }
  ];

  return (
    <div className="w-64 h-full border-r border-academia-leather bg-[#fbf9f6] flex flex-col shrink-0 shadow-sm z-10">
      
      {/* Header */}
      <div className="p-5 border-b border-academia-leather bg-academia-paper">
        <h3 className="font-serif text-xl text-academia-ink font-semibold tracking-wide">Library</h3>
        <p className="text-xs text-academia-inkLight italic mt-1 font-body">Select elements to draft your page.</p>
      </div>

      {/* Block List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {availableBlocks.map((block) => (
          <button
            key={block.type}
            onClick={() => onAddBlock(block.type)}
            className="w-full text-left group bg-academia-parchment border border-academia-leather/60 p-3 shadow-sm rounded-sm hover:border-academia-gold hover:shadow-md transition-all duration-200 active:scale-[0.98]"
          >
            <div className="flex items-start">
              {/* Icon Container */}
              <div className="mt-0.5 flex-shrink-0 text-academia-inkLight group-hover:text-academia-gold transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={block.icon} />
                </svg>
              </div>
              
              {/* Text Content */}
              <div className="ml-3">
                <h4 className="text-sm font-serif font-medium text-academia-ink group-hover:text-[#8a6b46] transition-colors">
                  {block.label}
                </h4>
                <p className="text-[11px] text-academia-inkLight mt-0.5 leading-tight font-body">
                  {block.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-academia-leather bg-academia-paper">
        <p className="text-xs text-center text-academia-inkLight italic">
          Changes are auto-saved to your archives.
        </p>
      </div>
    </div>
  );
};

export default BlockToolbar;