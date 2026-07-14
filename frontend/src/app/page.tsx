import { ViewButton, ViewLabel, ViewPanel, ViewSpinner } from "@tolokoban/ui";
import React from "react";
import { Api } from "../api";
import Answer from "../components/Answer";
import Prompt from "../components/Prompt";
import * as styles from "./page.module.css";
import { makeGoto } from "./routes";
import { State } from "../state";
import { PromptResponse } from "../api/prompt";
import Tools from "../components/Tools";

export default function App() {
  const [loading, setLoading] = React.useState(false);
  const [prompt, setPrompt] = React.useState<string | undefined>(undefined);
  const [answer, setAnswer] = React.useState<PromptResponse | undefined>(undefined);
  const handleSend = async (prompt: string) => {
    setLoading(true);
    setAnswer(undefined);
    setPrompt(undefined);
    const response = await Api.prompt(prompt, {
      provider: "google",
      model: "gemini-3.1-flash-lite",
    });
    setLoading(false);
    setAnswer(response);
  };
  const keyGoogle = State.ai.providers.google.key.useValue();

  if (!keyGoogle) {
    return (
      <ViewPanel display="grid" placeItems="center">
        <p>You need a Key to interact with AI agents.</p>
        <ViewButton onClick={makeGoto("/keys")}>Manage API Keys</ViewButton>
      </ViewPanel>
    );
  }

  return (
    <div className={styles.root}>
      <Tools />
      {prompt && <blockquote>{prompt}</blockquote>}
      {loading && <ViewSpinner>Waiting for response...</ViewSpinner>}
      {!loading && answer && <Answer value={answer} />}
      {!loading && (
        <ViewLabel value="What do you need?" fullwidth box="none" padding="M">
          <Prompt onSend={handleSend} />
        </ViewLabel>
      )}
    </div>
  );
}
