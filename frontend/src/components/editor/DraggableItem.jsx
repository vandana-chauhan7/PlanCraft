import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const DraggableItem = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`relative group mb-4 bg-academia-paper border ${isDragging ? 'border-academia-gold shadow-lg opacity-80' : 'border-academia-leather shadow-paper'} rounded-sm p-4 transition-shadow`}
    >
      {/* Drag Handle (Styled like an old book spine or subtle grip) */}
      <div 
        {...attributes} 
        {...listeners}
        className="absolute left-0 top-0 bottom-0 w-6 flex items-center justify-center cursor-grab active:cursor-grabbing bg-academia-leather/20 border-r border-academia-leather hover:bg-academia-leather/40 transition-colors"
      >
        <span className="text-academia-inkLight text-xs tracking-widest leading-none rotate-180" style={{ writingMode: 'vertical-rl' }}>
          DRAG
        </span>
      </div>
      
      {/* Content Area */}
      <div className="ml-6 pl-2">
        {children}
      </div>
    </div>
  );
};

export default DraggableItem;