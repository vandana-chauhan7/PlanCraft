import React, { useState } from 'react';

const NotesBlock = ({ initialNote = '' }) => {
  const [note, setNote] = useState(initialNote);

  return (
    <div className="relative w-full p-6 bg-[#f7f0e1] border border-academia-leather/80 shadow-md">
      {/* Decorative "Tape" or "Pin" illusion */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-[#e5dfd3] shadow-sm border border-academia-leather/20 opacity-80 rotate-1"></div>
      
      <h5 className="font-serif italic text-academia-inkLight text-sm mb-2">Important Note</h5>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Record your musings here..."
        className="w-full min-h-[100px] bg-transparent outline-none resize-none text-academia-ink font-body leading-relaxed placeholder-academia-inkLight/50"
        style={{ fieldSizing: 'content' }}
      />
    </div>
  );
};

export default NotesBlock;