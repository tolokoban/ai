export type AiProvider = "google";

export type PromptOptions =
  | {
      provider: "google";
      model: "gemini-3.1-flash-lite";
    }
  | {
      provider: "google";
      model: "gemini-3.5-flash";
    };
