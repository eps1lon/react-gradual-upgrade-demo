"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var react_dom_1 = require("react-dom");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var store_1 = require("../store");
var ThemeContext_1 = __importDefault(require("./shared/ThemeContext"));
var Clock_1 = __importDefault(require("./shared/Clock"));
store_1.store.subscribe(function () {
    console.log("Counter:", store_1.store.getState());
});
var AboutSection = /** @class */ (function (_super) {
    __extends(AboutSection, _super);
    function AboutSection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AboutSection.prototype.componentDidMount = function () {
        // The modern app is wrapped in StrictMode,
        // but the legacy bits can still use old APIs.
        react_dom_1.findDOMNode(this);
    };
    AboutSection.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement(ThemeContext_1["default"].Consumer, null, function (theme) { return (react_1["default"].createElement("div", { style: { border: "1px dashed black", padding: 20 } },
            react_1["default"].createElement("h3", null, "src/legacy/Greeting.js"),
            react_1["default"].createElement("h4", { style: { color: theme } },
                "This component is rendered by the nested React (",
                react_1["default"].version,
                ")."),
            react_1["default"].createElement(Clock_1["default"], null),
            react_1["default"].createElement("p", null,
                "Counter: ",
                _this.props.counter,
                " ",
                react_1["default"].createElement("button", { onClick: function () { return _this.props.dispatch({ type: "increment" }); } }, "+")),
            react_1["default"].createElement("b", null,
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/" }, "Go to Home")))); }));
    };
    return AboutSection;
}(react_2.Component));
function mapStateToProps(state) {
    return { counter: state };
}
exports["default"] = react_redux_1.connect(mapStateToProps)(AboutSection);
