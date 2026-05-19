import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import path from "path";

let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoints
  app.post("/api/translate", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }

      const key = process.env.GEMINI_API_KEY;
      if (!key || key === "MY_GEMINI_API_KEY" || key === "") {
        return res.status(401).json({ error: "Sistem belum dikonfigurasi dengan Gemini API Key yang valid. Silakan set di Pengaturan AI Studio." });
      }

      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Translate the following Indonesian text to Japanese. 
Provide the translation in this strict JSON format:
{
  "kanji": "Japanese using kanji/kana",
  "romaji": "romaji pronunciation",
  "explanation": "Brief explanation of grammar or words used in Indonesian."
}

Text to translate: "${text}"`,
      });

      const rawText = response.text || "";
      // Strip markdown code block if present
      const cleanJson = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
      const translation = JSON.parse(cleanJson);

      res.json(translation);
    } catch (error) {
      console.error("Translation error:", error);
      res.status(500).json({ error: "Failed to translate" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Support React Router SPA fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
