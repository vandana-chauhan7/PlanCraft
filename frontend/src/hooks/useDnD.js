import { 
  useSensor, 
  useSensors, 
  PointerSensor, 
  KeyboardSensor,
  closestCenter
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';

/**
 * A utility hook to manage DnD Kit configuration and array reordering.
 */
const useDnD = () => {
  // Configure how drag interactions are detected
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Require moving 5px before drag starts (prevents accidental drags when clicking inputs)
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  /**
   * Calculates the new array order when an item is dropped.
   * * @param {Array} items - The current array of blocks
   * @param {Object} event - The event object provided by DnD Kit's onDragEnd
   * @returns {Array|null} - The reordered array, or null if the position didn't change
   */
  const reorderItems = (items, event) => {
    const { active, over } = event;

    // If dropped outside a valid zone or dropped in the exact same spot
    if (!over || active.id === over.id) {
      return null; 
    }

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    return arrayMove(items, oldIndex, newIndex);
  };

  return {
    sensors,
    collisionDetection: closestCenter,
    reorderItems,
  };
};

export default useDnD;