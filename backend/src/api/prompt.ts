import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function apiPrompt(input: string): Promise<{
	response: string;
	tokens: {
		input: number;
		output: number;
	};
}> {
	const response = await ai.models.generateContent({
		model: "gemini-3.5-flash",
		contents: input,
	});
	return {
		response: response.text ?? "",
		tokens: {
			input: response.usageMetadata?.promptTokenCount ?? 0,
			output: response.usageMetadata?.candidatesTokenCount ?? 0,
		},
	};
}
