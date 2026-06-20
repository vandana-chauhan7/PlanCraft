import { useState, useEffect, useRef } from 'react';
import { plannerApi } from '../api/plannerApi';

/**
 * A hook to automatically save planner data after the user stops typing/dragging.
 * * @param {Object} data - The current state of the planner (title, blocks, etc.)
 * @param {number} plannerId - The ID of the planner being edited
 * @param {number} delay - How long to wait after the last change before saving (ms)
 */
const useAutoSave = (data, plannerId, delay = 1500) => {
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'error'
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Prevent auto-save from running immediately on component mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!plannerId || !data) return;

    setSaveStatus('saving');

    // Set up the timer to save after the user stops making changes
    const handler = setTimeout(async () => {
      try {
        await plannerApi.update(plannerId, { 
          title: data.title,
          layout: data.blocks 
        });
        setSaveStatus('saved');
      } catch (error) {
        console.error("Failed to auto-save manuscript:", error);
        setSaveStatus('error');
      }
    }, delay);

    // If the data changes before the delay is up, clear the timeout and start over
    return () => clearTimeout(handler);
    
  }, [data, plannerId, delay]);

  return { saveStatus };
};

export default useAutoSave; 