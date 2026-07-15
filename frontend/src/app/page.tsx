import { IconEdit, ViewButton, ViewLabel, ViewPanel, ViewSpinner } from "@tolokoban/ui";
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
  const provider = State.ai.getProviderInfo();

  if (!provider) {
    return (
      <ViewPanel display="grid" placeItems="center">
        <p>You need a Key to interact with AI agents.</p>
        <ViewButton onClick={makeGoto("/keys")}>Manage API Keys</ViewButton>
      </ViewPanel>
    );
  }

  const handleSend = async (prompt: string) => {
    setLoading(true);
    setAnswer(undefined);
    setPrompt(undefined);
    const response = await Api.prompt(prompt, {
      provider: provider.id,
      model: provider.model,
      key: State.ai.providers.keys.value[provider.id] ?? "",
    });
    setLoading(false);
    setAnswer(response);
  };

  return (
    <div className={styles.root}>
      <h1>
        <img src={provider.logo} />
        <strong>{provider.label}</strong>
        <small>{provider.model}</small>
        <ViewButton onClick={makeGoto("/keys")} icon={IconEdit} variant="text" color="primary-5">
          Manage AI Providers
        </ViewButton>
      </h1>
      <Tools />
      {prompt && <blockquote>{prompt}</blockquote>}
      {loading && <ViewSpinner>Waiting for response...</ViewSpinner>}
      {!loading && answer && <Answer value={answer} />}
      {!loading && (
        <ViewLabel value="What do you need?" fullwidth box="none" padding="M">
          <Prompt onSend={handleSend} />
        </ViewLabel>
      )}
      <hr />
    </div>
  );
}
