/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { useContext, useMemo, useRef, useLayoutEffect } from "react";
import { __RouterContext } from "react-router";
import { ReactReduxContext } from "react-redux";

import ThemeContext from "./shared/ThemeContext";

interface Record<T> {
  status: "pending" | "rejected" | "fulfilled";
  promise: null | Promise<void>;
  result: null | T;
}

interface Record<T> {
  status: "pending" | "rejected" | "fulfilled";
  promise: null | Promise<void>;
  result: null | T;
}

interface Root {
  render<Props>(
    Component: React.JSXElementConstructor<Props>,
    props: Props,
    context: {
      theme: React.CSSProperties["color"] | null;
      router: any;
      reactRedux: any;
    }
  ): void;
  unmount(): void;
}

let rendererModule: Record<{ default: (container: Element) => Root }> = {
  status: "pending",
  promise: null,
  result: null,
};

export default function lazyLegacyRoot<Props>(
  getLegacyComponent: () => Promise<{
    default: React.JSXElementConstructor<Props>;
  }>
): (props: Props) => React.ReactElement {
  let componentModule: Record<{
    default: React.JSXElementConstructor<Props>;
  }> = {
    status: "pending",
    promise: null,
    result: null,
  };

  return function Wrapper(props: Props) {
    const createLegacyRoot = readModule(rendererModule, () =>
      import("../legacy/createLegacyRoot")
    ).default;
    const Component = readModule(componentModule, getLegacyComponent).default;
    const containerRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<Root | null>(null);

    // Populate every contexts we want the legacy subtree to see.
    // Then in src/legacy/createLegacyRoot we will apply them.
    const theme = useContext(ThemeContext);
    const router = useContext(__RouterContext);
    const reactRedux = useContext(ReactReduxContext);
    const context = useMemo(
      () => ({
        theme,
        router,
        reactRedux,
      }),
      [theme, router, reactRedux]
    );

    // Create/unmount.
    useLayoutEffect(() => {
      if (!rootRef.current) {
        rootRef.current = createLegacyRoot(containerRef.current!);
      }
      const root = rootRef.current;
      return () => {
        root.unmount();
      };
    }, [createLegacyRoot]);

    // Mount/update.
    useLayoutEffect(() => {
      if (rootRef.current) {
        rootRef.current.render(Component, props, context);
      }
    }, [Component, props, context]);

    return <div style={{ display: "contents" }} ref={containerRef} />;
  };
}

// This is similar to React.lazy, but implemented manually.
// We use this to Suspend rendering of this component until
// we fetch the component and the legacy React to render it.
function readModule<T>(record: Record<T>, createPromise: () => Promise<T>): T {
  if (record.status === "fulfilled") {
    return record.result!;
  }
  if (record.status === "rejected") {
    throw record.result;
  }
  if (!record.promise) {
    record.promise = createPromise().then(
      (value) => {
        if (record.status === "pending") {
          record.status = "fulfilled";
          record.promise = null;
          record.result = value;
        }
      },
      (error) => {
        if (record.status === "pending") {
          record.status = "rejected";
          record.promise = null;
          record.result = error;
        }
      }
    );
  }
  throw record.promise;
}
