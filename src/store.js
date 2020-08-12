"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
exports.__esModule = true;
exports.store = void 0;
var redux_1 = require("redux");
function reducer(state, action) {
    if (state === void 0) { state = 0; }
    switch (action.type) {
        case "increment":
            return state + 1;
        default:
            return state;
    }
}
// Because this file is declared above both Modern and Legacy folders,
// we can import this from either folder without duplicating the object.
exports.store = redux_1.createStore(reducer);
