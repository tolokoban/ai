import z from "zod";

export interface AiTool<INPUT = any, OUTPUT = any> {
  title: string;
  description: string;
  inputSchema: z.ZodType;
  execute: (arg: INPUT) => Promise<OUTPUT>;
}
