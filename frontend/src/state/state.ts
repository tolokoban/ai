import AtomicState from "@tolokoban/react-state";
import { isString, isType } from "@tolokoban/type-guards";
import { AiTool } from "../tools/types";

export const State = {
  ai: {
    providers: {
      google: {
        key: new AtomicState("", {
          storage: {
            id: "ai/providers/gemini/key",
            guard: isString,
          },
        }),
      },
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
