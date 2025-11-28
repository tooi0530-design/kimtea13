import { DailyPlannerData, INITIAL_DATA } from '../types';

const STORAGE_PREFIX = 'aesthetic_planner_';

export const saveDay = (data: DailyPlannerData) => {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${data.date}`, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save data", e);
  }
};

export const loadDay = (date: string): DailyPlannerData => {
  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}${date}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with initial data structure to ensure no missing fields if schema updates
      return { ...INITIAL_DATA, ...parsed, date }; 
    }
  } catch (e) {
    console.error("Failed to load data", e);
  }
  return { ...INITIAL_DATA, date };
};

export const getStoredDates = (): string[] => {
  const dates: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(STORAGE_PREFIX)) {
      dates.push(key.replace(STORAGE_PREFIX, ''));
    }
  }
  return dates;
};