import React from "react";

import { State } from "../../state";

import Styles from "./page.module.css";
import { ViewButton, ViewInputText, ViewPanel } from "@tolokoban/ui";
import { makeGoto } from "../routes";
import Answer from "../../components/Answer";

export default function PageKeys() {
  const [keyGoogle, setKeyGoogle] = State.ai.providers.google.key.useState();

  return (
    <ViewPanel className={Styles.keys} padding={"L"}>
      <Answer
        value={`Find or create your Google API key at [Google AI Studio](https://aistudio.google.com/api-keys)`}
      />
      <ViewInputText label="Google API Key" fullwidth value={keyGoogle} onChange={setKeyGoogle} />
      <ViewButton onClick={makeGoto("/")}>Back to work</ViewButton>
    </ViewPanel>
  );
}
