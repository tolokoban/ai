import LogoGoogle from "./google.webp";
import LogoMistral from "./mistral.webp";
import LogoDeepSeek from "./deepseek.webp";

export interface AiProviderInfo {
  id: string;
  label: string;
  model: string;
  url: string;
  logo: string;
  country: string;
}

export const PROVIDERS: AiProviderInfo[] = [
  {
    id: "mistral",
    label: "Mistral",
    model: "ministral-3b-latest",
    url: "https://console.mistral.ai",
    logo: LogoMistral,
    country: "🇫🇷",
  },
  {
    id: "google",
    label: "Google",
    model: "gemini-3.1-flash-lite",
    url: "https://aistudio.google.com/api-keys",
    logo: LogoGoogle,
    country: "🇺🇸",
  },
  {
    id: "deepseek",
    label: "DeepSeek",
    model: "deepseek-chat",
    url: "https://platform.deepseek.com/api_keys",
    logo: LogoDeepSeek,
    country: "🇨🇳",
  },
];
