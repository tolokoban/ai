import { State } from "../state";
import { AiTool } from "./types";

export function toolWrap<INPUT, OUTPUT>(tool: AiTool<INPUT, OUTPUT>): AiTool<INPUT, OUTPUT> {
  return {
    ...tool,
    execute: async (input: INPUT): Promise<OUTPUT> => {
      const item: {
        tool: AiTool;
        status: "process" | "success" | "failure";
        input: unknown;
        output: unknown;
      } = { tool, status: "process", input, output: undefined };
      State.tools.value = [...State.tools.value, item];
      console.log("Tool >> ", item);
      try {
        const output = await tool.execute(input);
        item.status = "success";
        State.tools.value = [...State.tools.value];
        return output;
      } catch (error) {
        console.error("Error in tool:", item);
        console.error(error);
        item.status = "failure";
        State.tools.value = [...State.tools.value];
        throw error;
      }
    },
  };
}
