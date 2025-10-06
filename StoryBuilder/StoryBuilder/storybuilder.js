import express from "express";
import OpenAI from "openai";
const app = express();
app.use(express.json());
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/story-builder", async (req, res) => {
  const { childName, age, prompt } = req.body;
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: `Write a gentle bedtime story for ${childName}, age ${age}. ${prompt}` }],
  });
  res.json({ story: completion.choices[0].message.content });
});

app.listen(3000, () => console.log("App running on port 3000"));