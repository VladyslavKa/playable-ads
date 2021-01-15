!function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = "function" == typeof require && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {exports: {}};
            t[o][0].call(l.exports, function (e) {
                var n = t[o][1][e];
                return s(n || e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }

    for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]);
    return s
}({
    1: [function (require, module, exports) {
        "use strict";

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
        }

        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call
        }

        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
        }

        Object.defineProperty(exports, "__esModule", {value: !0});
        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor)
                }
            }

            return function (Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor
            }
        }(), _utils2 = function (obj) {
            return obj && obj.__esModule ? obj : {default: obj}
        }(require("../../utils/utils")), Austin = function (_PIXI$Container) {
            function Austin(game) {
                var _ret;
                _classCallCheck(this, Austin);
                var _this = _possibleConstructorReturn(this, (Austin.__proto__ || Object.getPrototypeOf(Austin)).call(this)),
                    self = _this;
                self.game = game;
                var container = new PIXI.Container,
                    austin_base = _utils2.default.getTexture("austin_small/austin_base"),
                    austin_base_sprite = new PIXI.Sprite(austin_base);
                return self.parent = container, self.character = austin_base_sprite, self.character.anchor.set(0, 1), self.character.pivot.x = 60, container.addChild(austin_base_sprite), self.addChild(container), _ret = self, _possibleConstructorReturn(_this, _ret)
            }

            return _inherits(Austin, PIXI.Container), _createClass(Austin, [{
                key: "shutUp", value: function () {
                    var self = this;
                    self.bubble.destroy({children: !0}), self.bubble = !1
                }
            }, {
                key: "say", value: function (phrase) {
                    var self = this, bubble = new PIXI.Container, marker = new PIXI.Sprite,
                        bg = new PIXI.Sprite(_utils2.default.getTexture("bubble/base"));
                    self.bubble = bubble, self.bubble.marker = bubble, bg.addChild(marker), bubble.addChild(bg), self.addChild(bubble);
                    var align = function () {
                        self.bubble && (self.game.isPortrait ? (marker.texture = _utils2.default.getTexture("bubble/right"), marker.y = .7 * bg.height) : (marker.texture = _utils2.default.getTexture("bubble/right"), _utils2.default.getSizeWin(self.game.ratio, "< lg") ? marker.y = .4 * bg.height : marker.y = .7 * bg.height), marker.anchor.set(0, 1), marker.x = bg.width - 2, bubble.pivot.set(marker.x + marker.width, marker.y), bubble.x = -53, bubble.y = -164)
                    };
                    if (align(), self.game.align.push(align), bubble.alpha = 0, self.game.isPortrait) {
                        bubble.alpha = 0;
                        var baseY = bubble.y;
                        bubble.y = bubble.y + 10, anime({
                            targets: bubble,
                            alpha: 1,
                            y: {value: baseY, duration: 200},
                            duration: 100,
                            easing: "linear"
                        })
                    } else {
                        bubble.alpha = 0;
                        var baseX = bubble.x;
                        bubble.x = bubble.x + 10, anime({
                            targets: bubble,
                            alpha: 1,
                            x: {value: baseX, duration: 200},
                            duration: 100,
                            easing: "linear"
                        })
                    }
                    var style = new PIXI.TextStyle({
                        fontFamily: "Arial",
                        fontSize: 26,
                        lineHeight: 30,
                        align: "center",
                        fontWeight: "bold",
                        fill: "#833123",
                        wordWrap: !0,
                        direction: "rtl",
                        wordWrapWidth: bg.width - 10
                    }), text = new PIXI.Text(phrase, style);
                    text.anchor.set(.5), text.x = bg.width / 2, text.y = bg.height / 2, bg.addChild(text)
                }
            }, {
                key: "getFrames", value: function (prefix, loop, startFinish, reverseMiddle) {
                    for (var start_frames = [], middle_frames = [], middleReverse_frames = [], end_frames = [], i = 0; i < 20; i++) {
                        var texture = _utils2.default.getTexture(prefix + "start_" + i);
                        if (!texture) break;
                        start_frames.push(texture), startFinish && end_frames.unshift(texture)
                    }
                    for (var _i = 0; _i < 20; _i++) {
                        var _texture = _utils2.default.getTexture(prefix + "repeat_" + _i);
                        if (!_texture) break;
                        middle_frames.push(_texture), reverseMiddle && middleReverse_frames.unshift(_texture)
                    }
                    if (middle_frames = middleReverse_frames.concat(middle_frames), !startFinish) for (var _i2 = 0; _i2 < 20; _i2++) {
                        var _texture2 = _utils2.default.getTexture(prefix + "end_" + _i2);
                        if (!_texture2) break;
                        end_frames.push(_texture2)
                    }
                    for (var frames = start_frames.concat(middle_frames), _i3 = 0; _i3 < loop; _i3++) frames = frames.concat(middle_frames);
                    return frames = frames.concat(end_frames)
                }
            }, {
                key: "play", value: function (props) {
                    function go(frames, delay) {
                        anime.remove(self), self.anime_frame = 0, anime({
                            targets: self,
                            anime_frame: frames.length - 1,
                            duration: (props.speed || 40) * frames.length,
                            delay: delay,
                            easing: "linear",
                            round: 1,
                            update: function () {
                                var f = frames[self.anime_frame];
                                self.character.x = props.offsetX || 0, self.character.texture = f
                            },
                            complete: function () {
                                "function" == typeof props.cb && props.cb.call(self.game), props.timeOutReverse ? self.timer || go(frames.reverse(), props.timeOutReverse) : props.withoutBaseFrame || (setTimeout(function () {
                                    self.character.x = 0, self.character.texture = _utils2.default.getTexture("austin_small/austin_base")
                                }, 40), self.timer || self.motion(1200))
                            }
                        })
                    }

                    var self = this;
                    clearTimeout(self.timer), self.timer = setTimeout(function () {
                        self.timer = !1, go(props.frames, props.delay || 0)
                    }, 100)
                }
            }, {
                key: "claps", value: function () {
                    var loop = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 3, self = this,
                        frames = self.getFrames("austin_small/claps/", loop, !0, !1),
                        speed = (frames.length - 10) / (loop + 1) < 7 ? 70 : 40;
                    self.play({frames: frames, speed: speed})
                }
            }, {
                key: "waving", value: function () {
                    var loop = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 3, self = this,
                        frames = self.getFrames("austin_small/waving/", loop, !0, !0),
                        speed = (frames.length - 18) / (loop + 1) < 10 ? 50 : 30;
                    self.play({frames: frames, speed: speed})
                }
            }, {
                key: "motion", value: function () {
                    var delay = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                    if ("undefined" == typeof is_google) {
                        var self = this, frames = self.getFrames("austin_small/motion/", 0, !0, !1);
                        self.play({frames: frames, delay: delay, speed: 70, timeOutReverse: 2e3})
                    }
                }
            }]), Austin
        }();
        exports.default = Austin
    }, {"../../utils/utils": 13}], 2: [function (require, module, exports) {
        "use strict";

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj}
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
        }

        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call
        }

        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
        }

        function easeInBounce(t) {
            for (var pow2, bounce = 4; t < ((pow2 = Math.pow(2, --bounce)) - 1) / 11;) ;
            return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((3 * pow2 - 2) / 22 - t, 2)
        }

        Object.defineProperty(exports, "__esModule", {value: !0}), exports.Game = void 0;
        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor)
                }
            }

            return function (Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor
            }
        }();
        require("../../config");
        var _utils2 = _interopRequireDefault(require("../../utils/utils")),
            _resize2 = _interopRequireDefault(require("./resize")), _init2 = _interopRequireDefault(require("./init")),
            _ui2 = _interopRequireDefault(require("./ui")), _elem2 = _interopRequireDefault(require("./elem")),
            _decor2 = _interopRequireDefault(require("./decor")),
            _initLevel2 = _interopRequireDefault(require("./initLevel")),
            _finish2 = _interopRequireDefault(require("./finish")), Game = exports.Game = function (_PIXI$Application) {
                function Game(props) {
                    var _ret;
                    if (_classCallCheck(this, Game), !window.is_ios && "boolean" != typeof window.is_ios) {
                        var nav = navigator.userAgent || navigator.vendor || window.opera;
                        /iPad|iPhone|iPod/.test(nav) && !window.MSStream ? window.is_ios = !0 : window.is_ios = !1
                    }
                    var forceCanvas = !1;
                    "undefined" != typeof offWebGl && is_ios && (forceCanvas = !0);
                    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, config.size[0], config.size[1], {
                        antialias: !1,
                        resolution: 1,
                        transparent: !0,
                        forceCanvas: forceCanvas,
                        autoResize: !0
                    }));
                    Game.prototype.resize = _resize2.default, Game.prototype.init = _init2.default, Game.prototype.ui = _ui2.default, Game.prototype.elem = _elem2.default, Game.prototype.decor = _decor2.default, Game.prototype.initLevel = _initLevel2.default, Game.prototype.finish = _finish2.default;
                    var self = _this;
                    return self.app = self, self.setLang(), document.body.appendChild(self.renderer.view), setTimeout(function () {
                        self.renderer.view.className += " visible", self.init(), setTimeout(function () {
                            self.initLevel()
                        }, 1e3)
                    }, 100), "undefined" == typeof dapi ? (self.resize(), window.addEventListener("orientationchange", function () {
                        self.resize()
                    }), window.addEventListener("resize", function () {
                        self.resize()
                    })) : void 0 !== props.cb && props.cb(self), _ret = self, _possibleConstructorReturn(_this, _ret)
                }

                return _inherits(Game, PIXI.Application), _createClass(Game, [{key: "setLang", value: functio…