import { GoogleGenAI, Type } from "@google/genai";
import { DailyPlannerData } from "../types";

// Initialize the Gemini AI client
// Note: API Key must be provided in the environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generatePlanFromInput = async (
  date: string,
  currentData: DailyPlannerData,
  userInput: string
): Promise<Partial<DailyPlannerData> | null> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const prompt = `
      You are an expert daily planner assistant. 
      The user wants to plan their day for ${date}.
      
      User Input: "${userInput}"
      
      Based on this input, please fill in the following fields for their daily planner.
      IMPORTANT: Respond in Korean (Hangul).
      
      1. Schedule (Assign realistic times to tasks mentioned. Use 24h format HH:MM matching 05:00 to 23:00).
      2. Top 3 Priorities (Pick the 3 most important tasks).
      3. To-Do List (Other tasks that don't fit in top 3 or specific times).
      4. Meals (If mentioned).
      
      Current Schedule Context: ${JSON.stringify(currentData.schedule.filter(s => s.task))}
      
      Return ONLY a JSON object with the fields to update.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            top3: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of top 3 priority task descriptions in Korean"
            },
            schedule: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING, description: "Time in HH:MM format (e.g. 09:30)" },
                  task: { type: Type.STRING, description: "Task description in Korean" }
                }
              }
            },
            todos: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of other todo items in Korean"
            },
            meals: {
              type: Type.OBJECT,
              properties: {
                breakfast: { type: Type.STRING, description: "Breakfast description in Korean" },
                lunch: { type: Type.STRING, description: "Lunch description in Korean" },
                dinner: { type: Type.STRING, description: "Dinner description in Korean" }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return null;

    const result = JSON.parse(text);

    // Transform AI result back to App Data structure
    const updates: Partial<DailyPlannerData> = {};

    if (result.top3) {
      updates.top3 = currentData.top3.map((item, idx) => ({
        ...item,
        text: result.top3[idx] || item.text || ''
      }));
    }

    if (result.todos) {
        updates.todos = currentData.todos.map((item, idx) => ({
            ...item,
            text: result.todos[idx] || item.text || ''
        }));
    }

    if (result.schedule) {
      // Merge with existing schedule
      updates.schedule = currentData.schedule.map(slot => {
        const aiSlot = result.schedule.find((s: any) => s.time === slot.time);
        return aiSlot ? { ...slot, task: aiSlot.task } : slot;
      });
    }

    if (result.meals) {
      updates.meals = {
        ...currentData.meals,
        ...result.meals
      };
    }

    return updates;

  } catch (error) {
    console.error("Gemini Planning Error:", error);
    return null;
  }
};


export const reviewDayWithAI = async (data: DailyPlannerData): Promise<string> => {
    try {
        const model = 'gemini-2.5-flash';
        
        const prompt = `
          Analyze this daily planner data and provide a short, encouraging, and constructive daily review (approx 50 words) in Korean.
          Highlight achievements based on completed tasks and offer a tip for tomorrow. Use polite Korean language (존댓말).
          
          Data:
          Top 3 Completed: ${data.top3.filter(t => t.completed).map(t => t.text).join(', ')}
          Todos Completed: ${data.todos.filter(t => t.completed).map(t => t.text).join(', ')}
          Habits Done: ${data.habits.filter(h => h.completed).map(h => h.name).join(', ')}
          Notes: ${data.notes}
          Mood Rating: ${data.review.rate}/10
        `;
    
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
        });
    
        return response.text || "회고를 생성할 수 없습니다.";
    } catch (error) {
        console.error("Gemini Review Error:", error);
        return "죄송합니다. 지금은 하루를 검토할 수 없습니다.";
    }
}