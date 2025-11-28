import React from 'react';
import { ScheduleItem } from '../../types';

interface ScheduleProps {
  schedule: ScheduleItem[];
  onChange: (index: number, val: string) => void;
}

const Schedule: React.FC<ScheduleProps> = ({ schedule, onChange }) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-bold text-gray-700 mb-2 serif">오늘의 일정</h2>
      <div className="flex-1 border-t border-gray-300">
        {schedule.map((item, index) => (
          <div key={item.time} className="flex items-center border-b border-gray-200 h-8 group hover:bg-gray-50 transition-colors">
            <div className="w-12 text-[10px] text-gray-400 font-mono pt-1 text-right pr-2 select-none">
              {item.time}
            </div>
            <input
              type="text"
              value={item.task}
              onChange={(e) => onChange(index, e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 h-full px-2 font-medium"
              placeholder=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;