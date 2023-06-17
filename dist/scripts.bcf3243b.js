// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendElement = appendElement;
exports.clearChildren = clearChildren;
//Append Element Helper
function appendElement(parent, elementType, className, content) {
  var element = document.createElement(elementType);
  element.classList.add(className);
  if (content) {
    element.innerText = content;
  }
  parent.appendChild(element);
  return element;
}

//Clear comments
function clearChildren(element) {
  while (element.firstChild) {
    element.firstChild.remove();
  }
}
},{}],"data/card-issuers.json":[function(require,module,exports) {
module.exports = {
  "CARD_ISSUERS": [{
    "name": "American Express",
    "prefixNumbers": [34, 37],
    "lengths": [15],
    "image": "./assets/logos/amex.png",
    "testCards": [371013685078853, 371025821052618, 371044577615551, 371063732388250, 371023510178422]
  }, {
    "name": "Diner's Club",
    "prefixNumbers": [300, 301, 302, 303, 304, 305, 309, 36, 38, 39],
    "lengths": [14, 15],
    "image": "./assets/logos/diners.png",
    "testCards": [30190779777617, 30036928610086, 30491681460148, 30342554667550, 30418357445822]
  }, {
    "name": "Discover",
    "prefixNumbers": [6011, 64, 65, 622126, 622925],
    "lengths": [16],
    "image": "./assets/logos/discover.png",
    "testCards": [6229252334306940, 6566847776158625, 6221260862065984, 6522356782067278, 6229256164820037]
  }, {
    "name": "JCB",
    "prefixNumbers": [35, 3088, 3096, 3112, 3158, 3337],
    "lengths": [16],
    "image": "./assets/logos/jcb.png",
    "testCards": [3568647110622095, 3529120227557404, 3588811738340383, 3529034893910484, 3588577480311043]
  }, {
    "name": "MasterCard",
    "prefixNumbers": [51, 52, 53, 54, 55],
    "lengths": [16],
    "image": "./assets/logos/mastercard.png",
    "testCards": [5215759402641238, 5454084549356453, 5424329355767195, 5309413192083956, 5273702266376144]
  }, {
    "name": "Visa",
    "prefixNumbers": [4],
    "lengths": [16, 19],
    "image": "./assets/logos/visa.png",
    "testCards": [4994467374088343, 4960919014739529, 4777608872459063, 4833060294026470, 4698923722383132]
  }]
};
},{}],"scripts/issuerObjects.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CARD_ISSUERS = void 0;
var _cardIssuers = _interopRequireDefault(require("../data/card-issuers.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//Cards are Fake BTW ;)
var CARD_ISSUERS = _cardIssuers.default.CARD_ISSUERS;
exports.CARD_ISSUERS = CARD_ISSUERS;
},{"../data/card-issuers.json":"data/card-issuers.json"}],"scripts/index.js":[function(require,module,exports) {
"use strict";

var _helpers = require("./helpers.js");
var _issuerObjects = require("./issuerObjects.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var RESULT_TEXT = document.querySelector(".result-card__text");
var RESULT_CARD = document.querySelector(".result-card__container");
var CARD_INPUT = document.querySelector(".credit-card__input");
var CARD_PROVIDER = document.querySelector(".credit-card__provider-image");
var INFORMATION_RESULTS = document.querySelector(".information-card__results");
var DEFAULT_CLASS = RESULT_CARD.classList.value;
var MIN_CARD_LENGTH = 12;
var MAJOR_INDUSTRY_IDENTIFIERS = {
  0: "ISO / TC 68 and other industry duties",
  1: "Airlines",
  2: "Airlines, finance, and other future industry duties",
  3: "Travel and leisure",
  4: "Banking and finance",
  5: "Finance and banking",
  6: "Sales and banking/finance",
  7: "Petroleum and other future industry tasks",
  8: "Healthcare, telecommunications, and other future industry tasks",
  9: "For the appointment of national standards bodies"
};
function logResult(isValid) {
  RESULT_TEXT.innerText = isValid ? "Valid card." : "Invalid card.";
  RESULT_CARD.className = isValid ? "".concat(DEFAULT_CLASS, "--valid") : "".concat(DEFAULT_CLASS, "--invalid");
}
function checkCardNumber() {
  var cardNumber = this.value;
  if (!(this.value.length >= MIN_CARD_LENGTH)) {
    RESULT_TEXT.innerText = "Please enter a card number above.";
    CARD_PROVIDER.style.backgroundImage = "none";
    RESULT_CARD.className = DEFAULT_CLASS;
    (0, _helpers.clearChildren)(INFORMATION_RESULTS);
    return;
  }
  var cardLength = cardNumber.length;
  var firstDigit = cardNumber.charAt(0);
  logResult(checkSum(cardNumber));
  (0, _helpers.clearChildren)(INFORMATION_RESULTS);
  logIndustryCode(firstDigit);
  var issuer = checkCardIssuer(cardNumber);
  logIssuer(issuer);
  changeDisplayedIssuer(issuer);
  logLengthForIssuer(cardLength, issuer);
}
function checkSum(card) {
  card = reverseString(card);
  var digits = splitIntoDigits(card);
  for (var i = 1; i < digits.length; i += 2) {
    digits[i] *= 2;
    if (isTwoDigits(digits[i])) {
      digits[i] = sumDigits(digits[i]);
    }
  }
  if (sumDigits(digits) % 10 === 0) {
    return true;
  }
  return false;
}
function splitIntoDigits(number) {
  return Array.from(String(number), Number);
}
function isTwoDigits(number) {
  return number >= 10 && number <= 99;
}
function sumDigits(number) {
  var digits;
  var sum = 0;
  if (Array.isArray(number)) {
    digits = number;
  } else {
    digits = splitIntoDigits(number);
  }
  var _iterator = _createForOfIteratorHelper(digits),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var digit = _step.value;
      sum += digit;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return sum;
}
function reverseString(str) {
  return str === "" ? "" : reverseString(str.substr(1)) + str.charAt(0);
}
function logIndustryCode(number) {
  var industry = MAJOR_INDUSTRY_IDENTIFIERS[number];
  var resultHeading = "(MII) INDUSTRY CODE [".concat(number, "]: ");
  var industryResult = (0, _helpers.appendElement)(INFORMATION_RESULTS, "p", "information-card__subheading", resultHeading);
  (0, _helpers.appendElement)(industryResult, "span", "information-card__result", industry);
}
function checkCardIssuer(number) {
  var cardString = number.toString();
  var _iterator2 = _createForOfIteratorHelper(_issuerObjects.CARD_ISSUERS),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var issuer = _step2.value;
      var _iterator3 = _createForOfIteratorHelper(issuer.prefixNumbers),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var prefixNumber = _step3.value;
          if (cardString.startsWith(prefixNumber.toString())) {
            return {
              name: issuer.name,
              prefix: prefixNumber,
              lengths: issuer.lengths,
              image: issuer.image
            };
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  CARD_PROVIDER.style.backgroundImage = "none";
  return {
    name: "Unknown Issuer",
    prefix: 0,
    lengths: null,
    image: null
  };
}
function logIssuer(_ref) {
  var name = _ref.name,
    prefix = _ref.prefix;
  if (prefix === 0) {
    prefix = "N/A";
  }
  var resultHeading = "(IIN) ISSUER IDENTIFICATION NUMBER [".concat(prefix, "]: ");
  var issuerResult = (0, _helpers.appendElement)(INFORMATION_RESULTS, "p", "information-card__subheading", resultHeading);
  (0, _helpers.appendElement)(issuerResult, "span", "information-card__result", name);
}
function logLengthForIssuer(length, _ref2) {
  var name = _ref2.name,
    lengths = _ref2.lengths;
  if (!lengths) {
    return;
  }
  if (lengths.includes(length)) {
    return;
  }
  lengths = lengths.join(", ");
  RESULT_TEXT.innerText = "Expected length(s) for ".concat(name, ": ").concat(lengths, ".");
  RESULT_CARD.className = "".concat(DEFAULT_CLASS, "--invalid");
}
function changeDisplayedIssuer(_ref3) {
  var image = _ref3.image;
  var imagePath = image;
  if (imagePath === null) {
    return;
  }
  CARD_PROVIDER.style.backgroundImage = "url(".concat(imagePath, ")");
}
CARD_INPUT.addEventListener("input", checkCardNumber);
},{"./helpers.js":"scripts/helpers.js","./issuerObjects.js":"scripts/issuerObjects.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "33117" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/index.js"], null)
//# sourceMappingURL=/scripts.bcf3243b.js.map