import { makeInstaller } from "@element/utils";
import { components } from "./components";
import '@element/theme/index.css'
export default makeInstaller(components);
export * from "@element/components";