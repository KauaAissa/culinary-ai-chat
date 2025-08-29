import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Necessário para servir arquivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "public")));

// Servir index.html na rota raiz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Rota da API de chat
app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Erro da OpenAI:", data.error);
      return res.status(400).json({ error: data.error.message });
    }

    console.log("✅ Resposta da OpenAI:", data.choices?.[0]?.message?.content);

    res.json(data);
  } catch (error) {
    console.error("❌ Erro no servidor:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Inicializar servidor
app.listen(3000, () =>
  console.log("🚀 Servidor rodando em http://localhost:3000")
);
