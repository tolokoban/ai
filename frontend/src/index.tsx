import { Theme } from "@tolokoban/ui";
import { createRoot } from "react-dom/client";
import App from "./app";

import "./index.css";

function start() {
	Theme.apply({
		colors: {
			neutral: "#124",
			primary: "#f90",
			secondary: "#9cd",
		},
	});
	createRoot(document.getElementById("root")!).render(<App />);
}

start();
