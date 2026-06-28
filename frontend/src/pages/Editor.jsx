import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import BlockToolbar from '../components/editor/BlockToolbar';
import EditorBoard from '../components/editor/EditorBoard';
import useAutoSave from '../hooks/useAutoSave';
import { plannerApi } from '../api/plannerApi';

const Editor = () => {
  const { id } = useParams(); // Get planner ID from URL
  const navigate = useNavigate();
  
  // We lift state here so the Toolbar can talk to the Board
  const [title, setTitle] = useState("Untitled Manuscript");
  const [blocks, setBlocks] = useState([]);
  const [plannerId, setPlannerId] = useState(null);
  const [loading, setLoading] = useState(!!id); // Only load if editing existing planner

  // Create a new planner on mount if no ID provided
  useEffect(() => {
    const initializePlanner = async () => {
      try {
        if (id) {
          // Load existing planner
          const planner = await plannerApi.getById(id);
          setTitle(planner.title || "Untitled Manuscript");
          setBlocks(planner.layout || []);
          setPlannerId(id);
        } else {
          // Create new planner
          const newPlanner = await plannerApi.create({
            title: "Untitled Manuscript",
            layout: [],
            is_template: false
          });
          setPlannerId(newPlanner.id);
        }
      } catch (error) {
        console.error("Failed to initialize planner:", error);
      } finally {
        setLoading(false);
      }
    };

    initializePlanner();
  }, [id]);

  // Enable auto-save when planner is loaded
  const { saveStatus } = useAutoSave({ title, blocks }, plannerId);

  // Handler passed to BlockToolbar
  const handleAddBlock = (blockType) => {
    const newBlock = generateDefaultBlock(blockType);
    setBlocks((prev) => [...prev, newBlock]);
  };

  // Helper to generate default data structure based on the chosen block type
  const generateDefaultBlock = (type) => {
    const base = { id: `block-${Date.now()}`, type };
    switch (type) {
      case 'heading': return { ...base, content: '' };
      case 'text': return { ...base, content: '' };
      case 'checklist': return { ...base, items: [{ text: '', done: false }] };
      case 'habit': return { ...base, habits: [{ name: '', log: Array(7).fill(false) }] };
      case 'goal': return { ...base, goal: { title: '', current: 0, target: 100, unit: '%' } };
      case 'calendar': return { ...base, week: ['', '', '', '', '', '', ''] };
      case 'notes': return { ...base, note: '' };
      default: return base;
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-academia-parchment text-academia-ink font-serif italic text-xl">
        Loading your manuscript...
      </div>
    );
  }

  const handleManualSave = async () => {
    if (!plannerId) return;
    try {
      await plannerApi.update(plannerId, { title, layout: blocks });
      // noop: useAutoSave will reflect saved status as well
    } catch (err) {
      console.error('Manual save failed:', err);
      alert('Failed to save draft.');
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#eaddce]/20">
      <Sidebar activeTab="Dashboard" />
      
      {/* The Palette of available blocks */}
      <BlockToolbar onAddBlock={handleAddBlock} />

      {/* The Canvas where blocks are rendered and dragged */}
      <main className="flex-1 overflow-y-auto p-10 custom-scrollbar relative">
        <div className="flex justify-end mb-4 mr-6 space-x-3">
          <button 
            onClick={handleManualSave}
            className="px-4 py-2 bg-academia-leather text-academia-paper rounded-sm hover:opacity-90"
          >
            Save Now
          </button>

          <button
            onClick={async () => {
              if (!plannerId) return alert('Planner not yet initialized');
              if (!window.confirm('Publish this planner as a template? This will publish structure only.')) return;
              try {
                const sanitized = blocks.map(b => {
                  switch (b.type) {
                    case 'heading': return { id: b.id, type: b.type, content: '' };
                    case 'text': return { id: b.id, type: b.type, content: '' };
                    case 'notes': return { id: b.id, type: b.type, note: '' };
                    case 'checklist': return { id: b.id, type: b.type, items: (b.items || []).map(() => ({ text: '', done: false })) };
                    case 'habit': return { id: b.id, type: b.type, habits: (b.habits || []).map(h => ({ name: '', log: Array((h.log && h.log.length) || 7).fill(false) })) };
                    case 'goal': return { id: b.id, type: b.type, goal: { title: '', current: 0, target: b.goal?.target || 100, unit: b.goal?.unit || '%' } };
                    case 'calendar': return { id: b.id, type: b.type, week: Array(7).fill('') };
                    default: return { id: b.id, type: b.type };
                  }
                });

                await plannerApi.update(plannerId, { title, layout: sanitized, is_template: true });
                alert('Planner published as template (structure only).');
              } catch (err) {
                console.error('Publish failed:', err);
                alert('Failed to publish planner.');
              }
            }}
            className="px-4 py-2 bg-yellow-500 text-white rounded-sm hover:opacity-90"
          >
            Publish
          </button>

          <button
            onClick={async () => {
              if (!plannerId) return;
              if (!window.confirm('Delete this planner? This action cannot be undone.')) return;
              try {
                await plannerApi.delete(plannerId);
                navigate('/planners');
              } catch (err) {
                console.error('Delete failed:', err);
                alert('Failed to delete planner.');
              }
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-sm hover:opacity-90"
          >
            Delete
          </button>
        </div>

        <EditorBoard 
          title={title}
          setTitle={setTitle}
          blocks={blocks}
          setBlocks={setBlocks}
          plannerId={plannerId}
          saveStatus={saveStatus}
        />
      </main>
    </div>
  );
};

export default Editor;