import { IconSend, Theme, ViewFloatingButton, ViewLabel, ViewTouchable } from "@tolokoban/ui";
import React from "react";

import * as Styles from "./Prompt.module.css";
import { State } from "../../state";

const $ = Theme.classNames;

export interface PromptProps {
  className?: string;
  onSend(prompt: string): void;
}

export default function Prompt({ className, onSend }: PromptProps) {
  const [recent, setRecent] = State.recentPrompts.useState();
  const [prompt, setPrompt] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setPrompt(event.currentTarget.value);
  };
  const handleSend = () => {
    const value = prompt.trim();
    if (!recent.includes(value)) {
      setRecent([value, ...recent].slice(0, 5));
    }
    onSend(value);
    setPrompt("");
  };

  return (
    <>
      <div className={$.join(className, Styles.prompt)}>
        <textarea value={prompt} onChange={handleChange} rows={3} />
        <ViewFloatingButton
          onClick={handleSend}
          enabled={prompt.trim().length > 0}
          icon={IconSend}
          color="primary-5"
        />
      </div>
      {recent.length > 0 && (
        <ViewLabel value="Recent prompts:" box="none">
          {recent.map((p, index) => (
            <ViewTouchable key={index} onClick={() => setPrompt(p)}>
              <div className={Styles.recentButton}>
                <IconSend />
                <div>{p}</div>
              </div>
            </ViewTouchable>
          ))}
        </ViewLabel>
      )}
    </>
  );
}
