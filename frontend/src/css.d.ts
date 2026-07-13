import type * as CSS from "csstype"

declare module "csstype" {
    interface Properties extends CSS.Properties {
        // Allow namespaced CSS Custom Properties
        [index: `--theme-${string}` | `--custom-${string}`]: any
    }
}
