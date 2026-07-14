import React from "react";
import { IconCancel, IconOk, IconWait, Theme } from "@tolokoban/ui";

import Styles from "./Tools.module.css";
import { State } from "../../state";

const $ = Theme.classNames;

export interface ToolsProps {
  className?: string;
}

export default function Tools({ className }: ToolsProps) {
  const tools = State.tools.useValue();

  if (tools.length === 0) return null;

  return (
    <div className={$.join(className, Styles.tools)}>
      <ul>
        {tools.map((t, index) => (
          <li key={index}>
            <Status value={t.status} />
            <div>{t.tool.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Status({ value }: { value: "process" | "failure" | "success" }) {
  switch (value) {
    case "process":
      return <IconWait animate />;
    case "success":
      return <IconOk color="secondary-5"/>;
    default:
      return <IconCancel color="error"/>;
  }
}
