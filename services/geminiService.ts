import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { VibeResponse } from "../types";

// Initialize the Gemini API client strictly with the environment variable
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are Oku, the "Ruka Reindeer". You are a Gen Z icon, a local influencer in Ruka, Finland.
You speak in a mix of English and very short Finnish slang (Moi, Kiitos, No nii).
Your vibe is high-energy, slightly chaotic, but extremely helpful about tourism in Ruka-Kuusamo.
You use terms like "no cap", "fr", "bet", "drip", "rizz", "main character energy".
You love moss, snowboarding, northern lights, and techno music.

When the user gives you a prompt:
1. Give a short, punchy response (max 3 sentences) hyping up their idea or roasting it lovingly.
2. Suggest 3 "hashtags" relevant to the activity in Ruka.
`;

export const generateVibeCheck = async (prompt: string): Promise<VibeResponse> => {
  try {
    // 1. Generate Text Response (The "Rizz")
    const textResponse: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 1.2, // High creativity
      }
    });

    const text = textResponse.text || "My wifi is frozen, try again fam.";
    
    // Extract hashtags roughly
    const tags = text.match(/#[\w]+/g) || ["#Ruka", "#Lapland", "#ReindeerRizz"];

    // 2. Generate Image (The "Selfie")
    // We want Oku the reindeer doing the activity mentioned.
    const imagePrompt = `
      A cool, cinematic, 3D render of a anthropomorphic reindeer wearing stylish streetwear and ski goggles,
      taking a selfie or posing in Ruka, Finland. 
      Context: ${prompt}. 
      Background: Snowy landscape, northern lights (Aurora Borealis), neon synthwave lighting, magical atmosphere.
      Style: Pixar meets Cyberpunk, high quality, 8k resolution.
    `;

    const imageResponse: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: imagePrompt,
      config: {
        // Flash image doesn't support aspect ratio config in this specific call structure usually, 
        // but we rely on the model default or prompt to frame it.
      }
    });

    let imageUrl = "";
    
    // Parse image parts
    if (imageResponse.candidates && imageResponse.candidates[0].content.parts) {
      for (const part of imageResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    return {
      text: text.replace(/#[\w]+/g, '').trim(), // Remove tags from main text
      imageUrl,
      tags
    };

  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};