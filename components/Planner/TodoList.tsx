import React from 'react';
import { TodoItem } from '../../types';

interface TodoListProps {
  todos: TodoItem[];
  onChange: (id: string, text: string) => void;
  onToggle: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onChange, onToggle }) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-bold text-gray-700 mb-2 serif">할 일 목록</h2>
      <div className="flex-1 flex flex-col gap-0">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-3 h-8 border-b border-gray-200 hover:bg-gray-50 transition-colors group">
            <input
              type="text"
              value={todo.text}
              onChange={(e) => onChange(todo.id, e.target.value)}
              className={`flex-1 bg-transparent border-none outline-none text-sm px-2 ${todo.completed ? 'text-gray-300 line-through' : 'text-gray-700'}`}
              placeholder=""
            />
             <button
              onClick={() => onToggle(todo.id)}
              className={`w-4 h-4 rounded-full border mr-2 flex-shrink-0 transition-colors ${
                todo.completed ? 'bg-rose-400 border-rose-400' : 'border-gray-300 group-hover:border-rose-300'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;