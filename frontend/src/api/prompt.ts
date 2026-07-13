import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { APICallError, generateText, type LanguageModel, RetryError, tool } from "ai";
import { State } from "../state";
import type { AiProvider, PromptOptions } from "./types";

export async function prompt(
  input: string,
  options: PromptOptions,
): Promise<
  | { text: string; tokens: { input: number; output: number }; error?: undefined }
  | { error: Error; text?: undefined; tokens?: undefined }
> {
  try {
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
  } catch (error) {
    console.error(error);
    if (error instanceof APICallError) {
      // Network issues, rate limits, invalid API key, etc.
      // error.message, error.statusCode, error.responseBody
    } else if (error instanceof RetryError) {
      // All retry attempts exhausted
      // error.lastError has the underlying cause
    }
    return { error: ensureError(error) };
  }
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
      return State.ai.providers.google.key.value;
    default:
      throw new Error(`Don't know this provider: "${provider}"!`);
  }
}

function ensureError(error: unknown): Error {
  if (error instanceof Error) return error;
  if (typeof error === "string") return new Error(error);
  return new Error(JSON.stringify(error));
}
