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

  return (
    <div className="flex h-screen w-full bg-[#eaddce]/20">
      <Sidebar activeTab="Dashboard" />
      
      {/* The Palette of available blocks */}
      <BlockToolbar onAddBlock={handleAddBlock} />

      {/* The Canvas where blocks are rendered and dragged */}
      <main className="flex-1 overflow-y-auto p-10 custom-scrollbar relative">
        <EditorBoard 
          title={title}
          setTitle={setTitle}
          blocks={blocks}
          setBlocks={setBlocks}
          saveStatus={saveStatus}
        />
      </main>
    </div>
  );
};

export default Editor;