import { Context } from "react";
import {} from "react-redux";

declare module "react-redux" {
  export const ReactReduxContext: Context<unknown>;
}
