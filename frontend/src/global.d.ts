interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

declare module "jso"
declare module "markdown-to-jsx"
declare module "*.module.css"

// @see https://v4.webpack.js.org/guides/typescript/

declare module "*.svg" {
    // Loaded as URL.
    const content: string
    export default content
}

declare module "*.yaml" {
    const value: any
    export = value
}

declare module "*.png" {
    const value: any
    export = value
}

declare module "*.jpg" {
    const value: any
    export = value
}

declare module "*.jpeg" {
    const value: any
    export = value
}

declare module "*.gif" {
    const value: any
    export = value
}

declare module "*.webp" {
    const value: any
    export = value
}

declare module "*.css" {
    // Loaded as URL.
    const content: string
    export default content
}
