import React from 'react';
import { HabitItem } from '../../types';
import { Plus, X } from 'lucide-react';

interface HabitsProps {
  habits: HabitItem[];
  onToggle: (id: string) => void;
  onAdd: (name: string) => void;
  onRemove: (id: string) => void;
}

const Habits: React.FC<HabitsProps> = ({ habits, onToggle, onAdd, onRemove }) => {
  const [newHabit, setNewHabit] = React.useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabit.trim()) {
      onAdd(newHabit.trim());
      setNewHabit('');
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-gray-700 serif">하기싫은 일</h2>
      </div>
      <div className="border border-gray-200 rounded-lg p-4 bg-white">
        <div className="space-y-3">
          {habits.map((habit) => (
            <div key={habit.id} className="flex items-center justify-between group">
              <span className={`text-sm font-medium ${habit.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                {habit.name}
              </span>
              <div className="flex items-center gap-2">
                 <button
                    onClick={() => onRemove(habit.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-opacity"
                 >
                     <X size={14} />
                 </button>
                 <div className="flex gap-1">
                   {/* Visual "tracker" circles, but only the last one is interactive for "Today" to keep it simple but aesthetic */}
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-4 h-4 rounded-full border border-gray-200 bg-gray-50" />
                   ))}
                   <button
                    onClick={() => onToggle(habit.id)}
                    className={`w-4 h-4 rounded-full border transition-colors ${
                      habit.completed ? 'bg-gray-800 border-gray-800' : 'border-gray-300 hover:border-gray-500'
                    }`}
                   />
                 </div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleAdd} className="mt-4 flex items-center border-t border-gray-100 pt-3">
            <input 
                type="text" 
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="하기싫은 일 추가..."
                className="flex-1 text-xs outline-none bg-transparent"
            />
            <button type="submit" className="text-gray-400 hover:text-rose-500">
                <Plus size={14} />
            </button>
        </form>
      </div>
    </div>
  );
};

export default Habits;