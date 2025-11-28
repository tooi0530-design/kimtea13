import React from 'react';
import { TodoItem } from '../../types';

interface TopPrioritiesProps {
  items: TodoItem[];
  onChange: (id: string, text: string) => void;
  onToggle: (id: string) => void;
}

const TopPriorities: React.FC<TopPrioritiesProps> = ({ items, onChange, onToggle }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-700 mb-2 serif">오늘의 주요 목표</h2>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="bg-rose-50 rounded-md p-3 flex items-center gap-3 shadow-sm border border-rose-100"
          >
            <div className="flex-1">
              <input
                type="text"
                value={item.text}
                onChange={(e) => onChange(item.id, e.target.value)}
                className={`w-full bg-transparent border-none outline-none text-gray-800 placeholder-rose-200 ${item.completed ? 'line-through text-rose-300' : ''}`}
                placeholder="중요한 일 입력..."
              />
            </div>
             <button
              onClick={() => onToggle(item.id)}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                item.completed ? 'bg-rose-400 border-rose-400' : 'border-rose-300 hover:bg-rose-100'
              }`}
            >
              {item.completed && <div className="w-2 h-2 bg-white rounded-full" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPriorities;