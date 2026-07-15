import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createMistral } from "@ai-sdk/mistral";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { APICallError, type LanguageModel, RetryError, tool, ToolLoopAgent } from "ai";

import { State } from "../state";
import type { PromptOptions } from "./types";
import { toolCurrentGeolocation } from "../tools/current-geolocation";
import { toolDistance } from "../tools/distance";
import { toolSearchLocation, toolSearchLocationReverse } from "../tools/search-location";

export type PromptResponse =
  | { text: string; tokens: { input: number; output: number }; error?: undefined }
  | { error: Error; text?: undefined; tokens?: undefined };

export async function prompt(input: string, options: PromptOptions): Promise<PromptResponse> {
  try {
    State.tools.value = [];
    const agent = getAgent(options);
    const response = await agent.generate({
      prompt: input,
    });
    console.log("🐞 [prompt@29] response =", response); // @FIXME: Remove this line written on 2026-07-14 at 11:47
    const { text, usage } = response;
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

function getAgent(options: PromptOptions) {
  const model = getGenerativeAI(options);
  const agent = new ToolLoopAgent({
    model,
    tools: {
      currentGeolocation: tool(toolCurrentGeolocation),
      distance: tool(toolDistance),
      searchLocation: tool(toolSearchLocation),
      searchLocationReverse: tool(toolSearchLocationReverse),
    },
  });
  return agent;
}

function getGenerativeAI(options: PromptOptions): LanguageModel {
  const { provider, model, key: apiKey } = options;
  switch (provider) {
    case "google":
      return createGoogleGenerativeAI({ apiKey })(model);
    case "mistral":
      return createMistral({ apiKey })(model);
    case "deepseek":
      return createDeepSeek({ apiKey })(model);
    default:
      throw new Error(`Don't know this provider: "${provider}"!`);
  }
}

function ensureError(error: unknown): Error {
  if (error instanceof Error) return error;
  if (typeof error === "string") return new Error(error);
  return new Error(JSON.stringify(error));
}
