"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RwStarRating = function (_HTMLElement) {
    _inherits(RwStarRating, _HTMLElement);

    function RwStarRating() {
        _classCallCheck(this, RwStarRating);

        // Shadow Root
        var _this = _possibleConstructorReturn(this, (RwStarRating.__proto__ || Object.getPrototypeOf(RwStarRating)).call(this));

        _this._root = _this.attachShadow({ mode: "open" });
        // Elements
        _this._$top = null;
        _this._$bottom = null;
        // Data
        _this._disabled = false;
        _this._value = 0;
        _this._touched = false;

        var $template = document.createElement("template");
        $template.innerHTML = "\n            <style>\n                :host {\n                    width: 180px;\n                    height: 1em;\n                    display: inline-block;\n                    overflow: hidden;\n                    user-select: none;\n                    vertical-align: middle;\n                    box-sizing: border-box;\n                }       \n                \n                .container {                  \n                  color: var(--star-default-color, #c5c5c5);\n                  font-size: 1em;\n                  line-height: 1em;\n                  margin: 0 auto;\n                  position: relative;\n                  padding: 0;\n                  cursor: pointer;\n                }     \n                .container .top {\n                  color: var(--star-selected-color, #e7bd06);\n                  padding: 0;\n                  position: absolute;\n                  z-index: 1;\n                  display: block;\n                  top: 0;\n                  left: 0;\n                  overflow: hidden;\n                  width: 0;       \n                }\n                .container:hover .top {\n                    display: none;\n                }                             \n                .container .bottom {\n                  padding: 0;\n                  display: block;\n                  position: absolute;\n                  top: 0;\n                  left: 0;\n                  unicode-bidi: bidi-override;\n                  direction: rtl;\n                }\n                /* Credit: https://css-tricks.com/star-ratings/ */\n                .container .bottom > span:hover,\n                .container .bottom > span:hover ~ span {               \n                   color: var(--star-hover-color, #e7bd06);\n                }               \n                :host([disabled]) .container {\n                    cursor: inherit;\n                }\n                :host([disabled]) .container .top {\n                    display: block;\n                }\n                :host([disabled]) .container .bottom > span:hover,\n                :host([disabled]) .container .bottom > span:hover ~ span {\n                    color: inherit;\n                }\n            </style>\n            <div class=\"container\">\n                <div class=\"top\">\n                    <span>\u2605</span><span>\u2605</span><span>\u2605</span><span>\u2605</span><span>\u2605</span>\n                </div>\n                <div class=\"bottom\">\n                    <span data-value=\"5\">\u2605</span><span data-value=\"4\">\u2605</span><span data-value=\"3\">\u2605</span><span data-value=\"2\">\u2605</span><span data-value=\"1\">\u2605</span>                   \n                </div>\n            </div>\n        ";

        if (window.ShadyCSS) ShadyCSS.prepareTemplate($template, "rw-star-rating");
        _this._$template = document.importNode($template.content, true);
        return _this;
    }

    _createClass(RwStarRating, [{
        key: "connectedCallback",
        value: function connectedCallback() {
            var _this2 = this;

            if (window.ShadyCSS) ShadyCSS.styleElement(this);
            this._root.appendChild(this._$template);
            this._disabled = this.getAttribute("disabled") !== null;
            this._$top = this._root.querySelector(".top");
            this._$bottom = this._root.querySelector(".bottom");
            this._$bottom.addEventListener("click", function (event) {
                if (_this2._disabled !== true && event.target.dataset.value !== undefined) {
                    if (_this2._value !== event.target.dataset.value) {
                        _this2.dispatchEvent(new Event("change"));
                        _this2.value = event.target.dataset.value;
                    }
                }
            });
            var initialValue = this.getAttribute("value");
            if (initialValue !== null) {
                this._value = initialValue;
                this._render();
            }
        }
    }, {
        key: "_render",
        value: function _render() {
            if (this._$top !== null) {
                this._$top.style.width = this._value * 10 * 2 + "%";
            }
        }
    }, {
        key: "attributeChangedCallback",
        value: function attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                switch (name) {
                    case "disabled":
                        this._disabled = newValue !== null;
                        break;
                    case "value":
                        if (this._touched === false) {
                            this._value = newValue;
                            this._render();
                        }
                        break;
                }
            }
        }
    }, {
        key: "value",
        set: function set(value) {
            if (this._value === value) return;
            this._touched = true;
            this._value = value;
            this._render();
        },
        get: function get() {
            return this._value;
        }
    }], [{
        key: "observedAttributes",
        get: function get() {
            return ["disabled", "value"];
        }
    }]);

    return RwStarRating;
}(HTMLElement);

window.customElements.define("rw-star-rating", RwStarRating);

//# sourceMappingURL=rw-star-rating.js.map