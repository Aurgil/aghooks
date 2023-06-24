import path from "path";
import { Configuration as DefaultConfiguration } from "webpack";
import CopyPlugin from "copy-webpack-plugin";

// Les types
export type WebpackConfiguration = DefaultConfiguration;
export type WC = WebpackConfiguration;
export type WCEntry = Exclude<WC["entry"], undefined>;
export type WCExternals = Exclude<WC["externals"], undefined>;
export type WCModule = Exclude<WC["module"], undefined>;
export type WCModuleRules = Exclude<WCModule["rules"], undefined>;
export type WCModuleRule = Exclude<WCModuleRules[0], "...">;
export type WCOutput = Exclude<WC["output"], undefined>;
export type WCPlugins = Exclude<WC["plugins"], undefined>;
export type WCPlugin = WCPlugins[0];
export type WCResolve = Exclude<WC["resolve"], undefined>;
export type WCResolveExts = Exclude<WCResolve["extensions"], undefined>;

// Les chemins d'accès
const ROOT_PATH = path.resolve(__dirname, "../../..");
const SRC_PATH = path.resolve(ROOT_PATH, "src");
const DIST_PATH = path.resolve(ROOT_PATH, "dist");

export function wcEntry(): WCEntry {
    const entries: WCEntry = {
        index: SRC_PATH,
    };
    return entries;
}

export function wcOutput(): WCOutput {
    const output: WCOutput = {
        path: DIST_PATH,
        clean: { keep: ".git" },
        libraryTarget: "umd",
        globalObject: this,
        filename: "[name]",
    };
    return output;
}

export function wcModule(): WCModule {
    const module: WCModule = {
        rules: wcRules(),
    };
    return module;
}

export function wcRules(): WCModuleRules {
    const rules: WCModuleRules = [
        {
            test: /\.tsx?$/i,
            use: {
                loader: "ts-loader",
                options: {
                    configFile: path.resolve(
                        ROOT_PATH,
                        "configs/typescript/package.tsconfig.json"
                    ),
                },
            },
        },
    ];
    return rules;
}

export function wcPlugins(): WCPlugins {
    const plugins: WCPlugins = [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(ROOT_PATH, "package.json"),
                    to: path.resolve(DIST_PATH, "package.json"),
                    transform: (buffer) => {
                        const json = JSON.parse(buffer.toString());
                        delete json.devDependencies;
                        delete json.scripts;
                        return JSON.stringify(json);
                    },
                },
            ],
        }),
    ];
    return plugins;
}

export function wcResolve(): WCResolve {
    const resolve: WCResolve = {
        extensions: [".ts"],
    };
    return resolve;
}
