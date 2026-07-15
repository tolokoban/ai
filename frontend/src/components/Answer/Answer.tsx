import { Theme, ViewPanel } from "@tolokoban/ui";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

import { PromptResponse } from "../../api/prompt";

import * as Styles from "./Answer.module.css";

const $ = Theme.classNames;

export interface AnswerProps {
  className?: string;
  value?: PromptResponse | null;
}

export default function Answer({ className, value }: AnswerProps) {
  if (!value) return;

  if (value.error) {
    return (
      <ViewPanel className={Styles.error} color="error" padding="M" margin="M">
        {value.error.message}
      </ViewPanel>
    );
  }

  console.log(value.text);
  return (
    <>
      <div className={$.join(className, Styles.answer)}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            tpmap({ lat, lng }: { lat: string; lng: string }) {
              return (
                <iframe
                  src={`https://trail-passion.net/app/#/map`}
                  width={640}
                  height={480}
                ></iframe>
              );
            },
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
          {value.text}
        </ReactMarkdown>
      </div>
      {value.tokens && (
        <div className={Styles.tokens}>
          Consumed tokens: {value.tokens.input} (IN) + {value.tokens.output} (OUT) ={" "}
          <strong>{value.tokens.input + value.tokens.output}</strong>
        </div>
      )}
    </>
  );
}
