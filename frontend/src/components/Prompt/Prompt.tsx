import { IconSend, Theme, ViewFloatingButton } from "@tolokoban/ui";
import React from "react";

import * as Styles from "./Prompt.module.css";

const $ = Theme.classNames;

export interface PromptProps {
	className?: string;
	onSend(prompt: string): void;
}

export default function Prompt({ className, onSend }: PromptProps) {
	const [prompt, setPrompt] = React.useState("");
	const handleChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>,
	): void => {
		setPrompt(event.currentTarget.value);
	};
	const handleSend = () => {
		onSend(prompt.trim());
		setPrompt("");
	};

	return (
		<div className={$.join(className, Styles.prompt)}>
			<textarea value={prompt} onChange={handleChange} rows={1} />
			<ViewFloatingButton
				onClick={handleSend}
				enabled={prompt.trim().length > 0}
				icon={IconSend}
			/>
		</div>
	);
}
