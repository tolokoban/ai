import { ViewSpinner } from "@tolokoban/ui"
import React from "react"
import { Api } from "../api"
import Answer from "../components/Answer"
import Prompt from "../components/Prompt"
import * as styles from "./page.module.css";

export function App() {
    const [loading, setLoading] = React.useState(false)
    const [prompt, setPrompt] = React.useState<string|null>(null)
    const [answer, setAnswer] = React.useState<string|null>(null)
    const  handleSend=async (prompt: string) =>{
        setLoading(true)
        setAnswer(null)
        setPrompt(null)
        const response = await Api.prompt(prompt, {
            provider: "google",
            model: "gemini-3.5-flash"
        })
        setLoading(false)
        setAnswer(response.text)
    }

	return <div className={styles.root}>
        {prompt && <blockquote>{prompt}</blockquote>}
        {loading && <ViewSpinner>Waiting for response...</ViewSpinner>}
        {!loading && answer && <Answer value={answer}/>}
        <Prompt onSend={handleSend}/>
    </div>;
}
