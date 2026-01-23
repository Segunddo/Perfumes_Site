
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

let ai: any = null;

try {
  if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  } else {
    console.warn("Gemini API Key is missing. AI features will be disabled.");
  }
} catch (error) {
  console.error("Failed to initialize Gemini client:", error);
}

export const getGeminiResponse = async (userMessage: string) => {
  if (!ai) {
    return "I am currently in demo mode. Please configure the GEMINI_API_KEY to enable my full capabilities.";
  }

  try {
    const productsContext = PRODUCTS.map(p => `${p.name} (${p.category}): ${p.price}`).join(', ');
    const systemInstruction = `
      You are a helpful and premium-style personal shopping assistant for "IzeShop", an elite online retailer.
      Your tone should be sophisticated, professional, and helpful.
      Available products are: ${productsContext}.
      If the user asks for recommendations, mention these specific products.
      Keep responses concise and elegant.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: userMessage,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't process that. How may I assist you with our collection today?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our systems are experiencing a brief delay. I am here to help as soon as possible.";
  }
};
