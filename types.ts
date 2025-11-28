export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface ScheduleItem {
  time: string; // "05:00", "05:30"
  task: string;
}

export interface HabitItem {
  id: string;
  name: string;
  completed: boolean;
}

export interface MealData {
  breakfast: string;
  lunch: string;
  dinner: string;
  water: number; // 0-8 glasses
}

export interface ReviewData {
  achievement: string;
  improve: string;
  rate: number; // 1-10
}

export interface DailyPlannerData {
  date: string; // YYYY-MM-DD
  top3: TodoItem[];
  schedule: ScheduleItem[];
  todos: TodoItem[];
  habits: HabitItem[];
  meals: MealData;
  notes: string;
  tomorrow: string;
  review: ReviewData;
}

export const DEFAULT_SCHEDULE: ScheduleItem[] = [
  "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", 
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00", "22:30", "23:00"
].map(time => ({ time, task: "" }));

export const INITIAL_DATA: DailyPlannerData = {
  date: "",
  top3: [
    { id: '1', text: '', completed: false },
    { id: '2', text: '', completed: false },
    { id: '3', text: '', completed: false },
  ],
  schedule: DEFAULT_SCHEDULE,
  todos: Array(15).fill(null).map((_, i) => ({ id: `todo-${i}`, text: '', completed: false })),
  habits: [
    { id: 'h1', name: '운동', completed: false },
    { id: 'h2', name: '독서', completed: false },
    { id: 'h3', name: '명상', completed: false },
    { id: 'h4', name: '당류 줄이기', completed: false },
    { id: 'h5', name: '7시간 수면', completed: false },
  ],
  meals: { breakfast: '', lunch: '', dinner: '', water: 0 },
  notes: '',
  tomorrow: '',
  review: { achievement: '', improve: '', rate: 0 },
};