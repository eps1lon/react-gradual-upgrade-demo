/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { useContext } from "react";
import { connect } from "react-redux";

import ThemeContext from "./shared/ThemeContext";
import lazyLegacyRoot from "./lazyLegacyRoot";
import type { store } from "../store";

// Lazy-load a component from the bundle using legacy React.
const Greeting = lazyLegacyRoot(() => import("../legacy/Greeting"));

interface AboutPageProps {
  counter: number;
  dispatch: typeof store["dispatch"];
}

function AboutPage({ counter, dispatch }: AboutPageProps) {
  const theme = useContext(ThemeContext);
  return (
    <>
      <h2>src/modern/AboutPage.js</h2>
      <h3 style={{ color: theme }}>
        This component is rendered by the outer React ({React.version}).
      </h3>
      <Greeting />
      <br />
      <p>
        Counter: {counter}{" "}
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
      </p>
    </>
  );
}

function mapStateToProps(state: ReturnType<typeof store["getState"]>) {
  return { counter: state };
}

export default connect(mapStateToProps)(AboutPage);
