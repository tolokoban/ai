import { defineConfig } from "@rspack/cli";
import { CopyRspackPlugin, HtmlRspackPlugin, type Compiler } from "@rspack/core";
import { execSync } from "child_process";
import path from "path";

export default defineConfig({
	entry: "./src/index.tsx",
	output: {
		path: path.resolve(__dirname, "../backend/static"),
		clean: true,
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: {
					loader: "builtin:swc-loader",
					options: {
						jsc: {
							parser: { syntax: "typescript", tsx: true },
							transform: { react: { runtime: "automatic" } },
						},
					},
				},
			},
			{
				test: /\.module\.css$/,
				type: "css/module",
				parser: {
					namedExports: false,
				},
			},
			{
				test: /\.css$/,
				exclude: /\.module\.css$/,
				type: "css",
			},
			{
				test: /\.(png|jpe?g|gif|svg|webp)$/i,
				type: "asset/resource",
			},
		],
	},
	devServer: {
		static: path.resolve(__dirname, "public"),
		devMiddleware: { writeToDisk: true },
	},
	plugins: [
		{
			apply(compiler: Compiler) {
				compiler.hooks.beforeCompile.tap("RoutesPlugin", () => {
					execSync("npm run routes", { stdio: "inherit" });
				});
			},
		},
		new CopyRspackPlugin({
			patterns: [
				{
					from: "public",
					globOptions: { ignore: ["**/index.html"] },
					noErrorOnMissing: true,
				},
			],
		}),
		new HtmlRspackPlugin({ template: "./public/index.html" }),
	],
});
