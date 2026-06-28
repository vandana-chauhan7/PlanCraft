import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

// Import Custom Hooks
import useDnD from '../../hooks/useDnD';
// import useAutoSave from '../../hooks/useAutoSave'; // Uncomment when connecting to backend

// Import Components
import DraggableItem from './DraggableItem';
import HeadingBlock from '../blocks/HeadingBlock';
import TextBlock from '../blocks/TextBlock';
import ChecklistBlock from '../blocks/ChecklistBlock';
import HabitTrackerBlock from '../blocks/HabitTrackerBlock';
import GoalTrackerBlock from '../blocks/GoalTrackerBlock';
import CalendarBlock from '../blocks/CalendarBlock';
import NotesBlock from '../blocks/NotesBlock';

const EditorBoard = ({ title, setTitle, blocks, setBlocks, plannerId, saveStatus = 'saved' }) => {
  // Use the custom Drag and Drop hook to keep this component clean
  const { sensors, collisionDetection, reorderItems } = useDnD();

  // Uncomment when connecting to FastAPI:
  // const { saveStatus } = useAutoSave({ title, blocks }, 1); // Assuming plannerId is 1

  const handleDragEnd = (event) => {
    const newOrder = reorderItems(blocks, event);
    if (newOrder) {
      setBlocks(newOrder);
    }
  };

  const updateBlock = (id, partial) => {
    setBlocks((prev) => prev.map(b => b.id === id ? { ...b, ...partial } : b));
  };

  const renderBlock = (block) => {
    const onChange = (payload) => {
      // payload shapes vary depending on block type
      switch (payload.type) {
        case 'heading':
          return updateBlock(block.id, { content: payload.content });
        case 'text':
          return updateBlock(block.id, { content: payload.content });
        case 'checklist':
          return updateBlock(block.id, { items: payload.items });
        case 'notes':
          return updateBlock(block.id, { note: payload.note });
        default:
          return updateBlock(block.id, payload);
      }
    };

    switch (block.type) {
      case 'heading': return <HeadingBlock initialText={block.content} onChange={onChange} />;
      case 'text': return <TextBlock initialText={block.content} onChange={onChange} />;
      case 'checklist': return <ChecklistBlock initialItems={block.items} onChange={onChange} />;
      case 'habit': return <HabitTrackerBlock initialHabits={block.habits} />;
      case 'goal': return <GoalTrackerBlock initialGoal={block.goal} />;
      case 'calendar': return <CalendarBlock initialWeek={block.week} />;
      case 'notes': return <NotesBlock initialNote={block.note} onChange={onChange} />;
      default: return <div className="text-academia-inkLight italic">Unknown Block Format</div>;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-[800px] p-12 bg-academia-parchment border border-academia-leather shadow-paper relative">
      
      {/* Auto-Save Indicator (Top Right) */}
      <div className={`absolute top-4 right-6 text-xs italic transition-colors ${
        saveStatus === 'saving' ? 'text-academia-gold' : 
        saveStatus === 'error' ? 'text-red-500' : 
        'text-academia-inkLight'
      }`}>
        {saveStatus === 'saving' ? 'Archiving...' : saveStatus === 'error' ? 'Failed to save' : 'Saved.'}
      </div>

      {plannerId && (
        <div className="absolute top-4 left-6 text-xs italic">
          <span className="text-academia-inkLight">Planner ID: {plannerId}</span>
        </div>
      )}

      <div className="border-b-2 border-academia-ink pb-4 mb-10">
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled Manuscript..." 
          className="text-4xl font-serif bg-transparent outline-none text-academia-ink w-full placeholder-academia-inkLight/40"
        />
      </div>

      <DndContext sensors={sensors} collisionDetection={collisionDetection} onDragEnd={handleDragEnd}>
        <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
          {blocks.length === 0 ? (
             <div className="text-center text-academia-inkLight italic mt-20 font-body">
               Drag and drop elements from the library to begin drafting.
             </div>
          ) : (
            blocks.map((block) => (
              <DraggableItem key={block.id} id={block.id}>
                {renderBlock(block)}
              </DraggableItem>
            ))
          )}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default EditorBoard;