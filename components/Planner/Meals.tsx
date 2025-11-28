import React from 'react';
import { MealData } from '../../types';
import { Droplet } from 'lucide-react';

interface MealsProps {
  meals: MealData;
  onChange: (field: keyof MealData, value: string | number) => void;
}

const Meals: React.FC<MealsProps> = ({ meals, onChange }) => {
  const mealLabels: Record<string, string> = {
    breakfast: '아침',
    lunch: '점심',
    dinner: '저녁'
  };

  return (
    <div className="mb-6 border border-gray-200 rounded-lg p-4 bg-white">
      <div className="space-y-3">
        {['breakfast', 'lunch', 'dinner'].map((type) => (
            <div key={type} className="flex items-center">
                <span className="w-16 text-xs font-bold text-gray-500">{mealLabels[type]}</span>
                <input
                    type="text"
                    value={(meals as any)[type]}
                    onChange={(e) => onChange(type as keyof MealData, e.target.value)}
                    className="flex-1 text-sm border-b border-gray-100 focus:border-gray-300 outline-none pb-1 bg-transparent"
                />
            </div>
        ))}
        <div className="flex items-center pt-2 border-t border-gray-100 mt-2">
            <span className="w-16 text-xs font-bold text-gray-500">물 섭취</span>
            <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <button
                        key={i}
                        onClick={() => onChange('water', i === meals.water ? i - 1 : i)}
                        className={`transition-colors ${
                            i <= meals.water ? 'text-blue-400' : 'text-gray-200 hover:text-blue-200'
                        }`}
                    >
                        <Droplet size={14} fill={i <= meals.water ? "currentColor" : "none"} />
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Meals;