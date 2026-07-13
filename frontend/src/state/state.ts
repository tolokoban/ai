import AtomicState from "@tolokoban/react-state";
import { isString } from "@tolokoban/type-guards";

export const State = {
	ai: {
		providers: {
			gemini: {
				key: new AtomicState("", {
					storage: {
						id: "ai/providers/gemini/key",
						guard: isString,
					},
				}),
			},
		},
	},
};
