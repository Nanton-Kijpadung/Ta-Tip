
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeFocus = async (data: any) => {
  const prompt = `
    As a student success coach, analyze this student activity data and provide a short, actionable focus summary (under 100 words).
    Student: ${data.name}
    Active Time: ${data.activeTime}
    Focus Score: ${data.focusScore}
    Distractions: ${JSON.stringify(data.distractions)}
    Main Apps Used: ${JSON.stringify(data.apps)}
    
    Format the response as clear bullet points or a short paragraph emphasizing how to improve their concentration in the next session.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text || "Unable to generate insights at this time.";
  } catch (error) {
    console.error("Gemini analysis error:", error);
    return "Error connecting to AI advisor. Please try again later.";
  }
};
