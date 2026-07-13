import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText, type LanguageModel, tool } from "ai";
import { State } from "../state";
import type { AiProvider, PromptOptions } from "./types";

export async function prompt(
  input: string,
  options: PromptOptions,
): Promise<{
  text: string;
  tokens: {
    input: number;
    output: number;
  };
}> {
  const model = getGenerativeAI(options);
  const { text, usage } = await generateText({
    model,
    prompt: input,
    tools: {
      // weather: tool({
      // 	description: "Get the weather in a location",
      // 	parameters: z.object({ location: z.string() }),
      // 	execute: async ({ location }) => ({ temp: 72, location }),
      // }),
    },
  });
  return {
    text,
    tokens: {
      input: usage.inputTokens ?? 0,
      output: usage.outputTokens ?? 0,
    },
  };
}

function getGenerativeAI(options: PromptOptions): LanguageModel {
  const { provider, model } = options;
  const apiKey = getApiKey(provider);
  switch (provider) {
    case "google":
      return createGoogleGenerativeAI({ apiKey })(model);
    default:
      throw new Error(`Don't know this provider: "${provider}"!`);
  }
}

function getApiKey(provider: AiProvider) {
  switch (provider) {
    case "google":
      return State.ai.providers.gemini.key.value;
    default:
      throw new Error(`Don't know this provider: "${provider}"!`);
  }
}
