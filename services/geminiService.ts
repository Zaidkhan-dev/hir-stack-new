
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI | null;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey });
    } else {
      this.ai = null;
      console.warn('VITE_GEMINI_API_KEY not set. Career advisor will show preset responses.');
    }
  }

  async getCareerAdvice(userInterests: string) {
    const prompt = `You are a professional career advisor at "hirstack", an elite IT training institute. 
    A prospective student is interested in: "${userInterests}".
    
    Recommend a specific learning path from our offerings:
    1. Full Stack Web Development (React, Node.js)
    2. Data Science & Machine Learning (Python, AI)
    3. Cloud Engineering & DevOps (AWS, Azure)
    4. Cybersecurity Specialist
    5. Mobile App Development (Flutter, React Native)
    
    Provide a concise, encouraging response (max 150 words) that explains WHY that path fits them and what the first step is. Use professional yet approachable tone.`;

    if (!this.ai) {
      return "Career advisor is temporarily unavailable. Please contact our team directly at info@hirstack.com for personalized guidance.";
    }

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: 0.7,
          topP: 0.95,
        }
      });
      return response.text || "I'm having trouble connecting right now, but please reach out to our human advisors!";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Unable to get advice at this moment. Please check back later.";
    }
  }
}

export const geminiService = new GeminiService();
