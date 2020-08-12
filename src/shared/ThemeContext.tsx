/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from "react";
import type { CSSProperties } from "react";

const ThemeContext = createContext<null | CSSProperties["color"]>(null);

export default ThemeContext;
