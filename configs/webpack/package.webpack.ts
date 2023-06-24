import {
    WC,
    wcEntry,
    wcModule,
    wcOutput,
    wcPlugins,
    wcResolve,
} from "./commun.webpack";

const configuration: WC = {
    mode: "production",
    entry: wcEntry(),
    output: wcOutput(),
    module: wcModule(),
    plugins: wcPlugins(),
    resolve: wcResolve(),
};

export default configuration;
