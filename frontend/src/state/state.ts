import AtomicState from "@tolokoban/react-state";
import { isString, isType } from "@tolokoban/type-guards";
import { AiTool } from "../tools/types";
import { AiProviderInfo, PROVIDERS } from "../constants/providers";

export const State = {
  ai: {
    getProviderInfo: (): AiProviderInfo | undefined => {
      const provider = PROVIDERS.find((item) => item.id === State.ai.providers.default.value);
      if (!provider) return undefined;
      const key = State.ai.providers.keys.value[provider.id];
      return key ? provider : undefined;
    },
    providers: {
      default: new AtomicState("mistral", {
        storage: {
          id: "ai/providers/default",
          guard: isString,
        },
      }),
      keys: new AtomicState(
        {},
        {
          storage: {
            id: "ai/providers/keys",
            guard: isRecord,
          },
        },
      ),
    },
  },
  recentPrompts: new AtomicState([], {
    storage: {
      id: "recentPrompts",
      guard: (v) => isType(v, ["array", "string"]),
    },
  }),
  tools: new AtomicState<
    Array<{
      tool: AiTool;
      status: "process" | "success" | "failure";
      input: unknown;
      output: unknown;
    }>
  >([]),
};

function isRecord(data: unknown): data is Record<string, string> {
  return isType(data, ["map", "string"]);
}
