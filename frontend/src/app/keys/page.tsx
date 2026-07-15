import React from "react";
import { ViewButton, ViewInputText, ViewPanel, Theme } from "@tolokoban/ui";

import { State } from "../../state";
import { makeGoto } from "../routes";

import Styles from "./page.module.css";
import { AiProviderInfo, PROVIDERS } from "../../constants/providers";

export default function PageKeys() {
  return (
    <ViewPanel className={Styles.keys} padding={"L"}>
      <div className={Styles.providers}>
        {PROVIDERS.map((provider) => (
          <Provider key={provider.id} value={provider} />
        ))}
      </div>
      <ViewButton onClick={makeGoto("/")}>Back to work</ViewButton>
    </ViewPanel>
  );
}

interface ProviderProps {
  value: AiProviderInfo;
}

function Provider({ value }: ProviderProps) {
  const [selected, setSelected] = State.ai.providers.default.useState();
  const [keys, setKeys] = State.ai.providers.keys.useState();
  const key = keys[value.id] ?? "";
  const updateKey = (key: string) => {
    setKeys({
      ...keys,
      [value.id]: key,
    });
  };

  return (
    <button
      className={Theme.classNames.join(
        Styles.providerKey,
        selected === value.id && Styles.selected,
      )}
      onClick={() => setSelected(value.id)}
    >
      <div>
        <img src={value.logo} />
        <div>{value.country}</div>
      </div>
      <div>
        <h2>
          <div>{value.label}</div>
          <small>{value.model}</small>
        </h2>
        <ViewInputText label="API Key" fullwidth value={key} onChange={updateKey} />
        <small>
          <a href={value.url} target={value.id}>
            How to get/create an API key for {value.label}?
          </a>
        </small>
      </div>
    </button>
  );
}
