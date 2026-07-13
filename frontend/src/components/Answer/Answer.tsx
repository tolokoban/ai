import { Theme } from "@tolokoban/ui";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

import * as Styles from "./Answer.module.css";

const $ = Theme.classNames;

export interface AnswerProps {
  className?: string;
  value: string | null;
}

export default function Answer({ className, value }: AnswerProps) {
  return (
    <div className={$.join(className, Styles.answer)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter style={oneDark} language={match[1]}>
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {value}
      </ReactMarkdown>
    </div>
  );
}
