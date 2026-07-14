import React from "react";
import { ViewButton, ViewInputText, ViewPanel } from "@tolokoban/ui";

import { State } from "../../state";
import { makeGoto } from "../routes";

import Styles from "./page.module.css";

export default function PageKeys() {
  const [keyGoogle, setKeyGoogle] = State.ai.providers.google.key.useState();

  return (
    <ViewPanel className={Styles.keys} padding={"L"}>
      <p>
        Find or create your Google API key at <a href="https://aistudio.google.com/api-keys">Google AI Studio</a>.
      </p>
      <ViewInputText label="Google API Key" fullwidth value={keyGoogle} onChange={setKeyGoogle} />
      <ViewButton onClick={makeGoto("/")}>Back to work</ViewButton>
    </ViewPanel>
  );
}
