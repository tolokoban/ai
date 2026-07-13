import express from "express";
import open from "open";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});
const app = express();
app.use(express.json());
app.use(express.static("static"));

app.post("/prompt", async (req, res) => {
	const { input } = req.body;
	const response = await ai.models.generateContent({
		model: "gemini-3.5-flash",
		contents: input,
	});
	res.json({
		response: response.text ?? "",
		tokens: {
			input: response.usageMetadata?.promptTokenCount ?? 0,
			output: response.usageMetadata?.candidatesTokenCount ?? 0,
		},
	});
});

const server = app.listen(0, () => {
	const addr = server.address();
	const port = typeof addr === "object" && addr ? addr.port : 0;
	const url = `http://localhost:${port}`;
	console.log(`Listening on ${url}`);
	open(url);
});
