(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.tinybind = factory());
}(this, function () { 'use strict';

  var OPTIONS = ['prefix', 'templateDelimiters', 'rootInterface', 'preloadData', 'handler'];
  var EXTENSIONS = ['binders', 'formatters', 'adapters'];

  var PRIMITIVE = 0;
  var KEYPATH = 1;
  var TEXT = 0;
  var BINDING = 1;
  var QUOTED_STR = /^'.*'$|^".*"$/; // Parser and tokenizer for getting the type and value from a string.

  function parseType(string) {
    var type = PRIMITIVE;
    var value = string;

    if (QUOTED_STR.test(string)) {
      value = string.slice(1, -1);
    } else if (string === 'true') {
      value = true;
    } else if (string === 'false') {
      value = false;
    } else if (string === 'null') {
      value = null;
    } else if (string === 'undefined') {
      value = undefined;
    } else if (!isNaN(string)) {
      value = Number(string);
    } else {
      type = KEYPATH;
    }

    return {
      type: type,
      value: value
    };
  } // Template parser and tokenizer for mustache-style text content bindings.
  // Parses the template and returns a set of tokens, separating static portions
  // of text from binding declarations.

  function parseTemplate(template, delimiters) {
    var tokens;
    var length = template.length;
    var index = 0;
    var lastIndex = 0;
    var open = delimiters[0],
        close = delimiters[1];

    while (lastIndex < length) {
      index = template.indexOf(open, lastIndex);

      if (index < 0) {
        if (tokens) {
          tokens.push({
            type: TEXT,
            value: template.slice(lastIndex)
          });
        }

        break;
      } else {
        tokens || (tokens = []);

        if (index > 0 && lastIndex < index) {
          tokens.push({
            type: TEXT,
            value: template.slice(lastIndex, index)
          });
        }

        lastIndex = index + open.length;
        index = template.indexOf(close, lastIndex);

        if (index < 0) {
          var substring = template.slice(lastIndex - close.length);
          var lastToken = tokens[tokens.length - 1];

          if (lastToken && lastToken.type === TEXT) {
            lastToken.value += substring;
          } else {
            tokens.push({
              type: TEXT,
              value: substring
            });
          }

          break;
        }

        var value = template.slice(lastIndex, index).trim();
        tokens.push({
          type: BINDING,
          value: value
        });
        lastIndex = index + close.length;
      }
    }

    return tokens;
  }

  var tinybind = {
    // Global binders.
    binders: {},
    // Global formatters.
    formatters: {},
    // Global sightglass adapters.
    adapters: {},
    // Default attribute prefix.
    _prefix: 'rv',
    _fullPrefix: 'rv-',

    get prefix() {
      return this._prefix;
    },

    set prefix(value) {
      this._prefix = value;
      this._fullPrefix = value + '-';
    },

    parseTemplate: parseTemplate,
    parseType: parseType,
    // Default template delimiters.
    templateDelimiters: ['{', '}'],
    // Default sightglass root interface.
    rootInterface: '.',
    // Preload data by default.
    preloadData: true,
    // Default event handler.
    handler: function handler(context, ev, binding) {
      this.call(context, ev, binding.view.models);
    },
    // Sets the attribute on the element. If no binder above is matched it will fall
    // back to using this binder.
    fallbackBinder: function fallbackBinder(el, value) {
      if (value != null) {
        el.setAttribute(this.type, value);
      } else {
        el.removeAttribute(this.type);
      }
    },
    // Merges an object literal into the corresponding global options.
    configure: function configure(options) {
      var _this = this;

      if (!options) {
        return;
      }

      Object.keys(options).forEach(function (option) {
        var value = options[option];

        if (EXTENSIONS.indexOf(option) > -1) {
          Object.keys(value).forEach(function (key) {
            _this[option][key] = value[key];
          });
        } else {
          _this[option] = value;
        }
      });
    }
  };

  // Check if a value is an object than can be observed.
  function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
  } // Error thrower.


  function error(message) {
    throw new Error("[Observer] " + message);
  }

  var adapters;
  var interfaces;
  var rootInterface; // Constructs a new keypath observer and kicks things off.

  var Observer =
  /*#__PURE__*/
  function () {
    Observer.updateOptions = function updateOptions(options) {
      adapters = options.adapters;
      interfaces = Object.keys(adapters);
      rootInterface = options.rootInterface;
    } // Tokenizes the provided keypath string into interface + path tokens for the
    // observer to work with.
    ;

    Observer.tokenize = function tokenize(keypath, root) {
      var tokens = [];
      var current = {
        i: root,
        path: ''
      };
      var index;
      var chr;

      for (index = 0; index < keypath.length; index++) {
        chr = keypath.charAt(index);

        if (!!~interfaces.indexOf(chr)) {
          tokens.push(current);
          current = {
            i: chr,
            path: ''
          };
        } else {
          current.path += chr;
        }
      }

      tokens.push(current);
      return tokens;
    };

    function Observer(obj, keypath, callback) {
      this.keypath = keypath;
      this.callback = callback;
      this.objectPath = [];
      this.parse();
      this.obj = this.getRootObject(obj);

      if (isObject(this.target = this.realize())) {
        this.set(true, this.key, this.target, this.callback);
      }
    } // Parses the keypath using the interfaces defined on the view. Sets variables
    // for the tokenized keypath as well as the end key.


    var _proto = Observer.prototype;

    _proto.parse = function parse() {
      var path;
      var root;

      if (!interfaces.length) {
        error('Must define at least one adapter interface.');
      }

      if (!!~interfaces.indexOf(this.keypath[0])) {
        root = this.keypath[0];
        path = this.keypath.substr(1);
      } else {
        root = rootInterface;
        path = this.keypath;
      }

      this.tokens = Observer.tokenize(path, root);
      this.key = this.tokens.pop();
    } // Realizes the full keypath, attaching observers for every key and correcting
    // old observers to any changed objects in the keypath.
    ;

    _proto.realize = function realize() {
      var current = this.obj;
      var unreached = -1;
      var prev;
      var token;

      for (var index = 0; index < this.tokens.length; index++) {
        token = this.tokens[index];

        if (isObject(current)) {
          if (typeof this.objectPath[index] !== 'undefined') {
            if (current !== (prev = this.objectPath[index])) {
              this.set(false, token, prev, this);
              this.set(true, token, current, this);
              this.objectPath[index] = current;
            }
          } else {
            this.set(true, token, current, this);
            this.objectPath[index] = current;
          }

          current = this.get(token, current);
        } else {
          if (unreached === -1) {
            unreached = index;
          }

          if (prev = this.objectPath[index]) {
            this.set(false, token, prev, this);
          }
        }
      }

      if (unreached !== -1) {
        this.objectPath.splice(unreached);
      }

      return current;
    } // Updates the keypath. This is called when any intermediary key is changed.
    ;

    _proto.sync = function sync() {
      var next;
      var oldValue;
      var newValue;

      if ((next = this.realize()) !== this.target) {
        if (isObject(this.target)) {
          this.set(false, this.key, this.target, this.callback);
        }

        if (isObject(next)) {
          this.set(true, this.key, next, this.callback);
        }

        oldValue = this.value();
        this.target = next;
        newValue = this.value();
        if (newValue !== oldValue || newValue instanceof Function) this.callback.sync();
      } else if (next instanceof Array) {
        this.callback.sync();
      }
    } // Reads the current end value of the observed keypath. Returns undefined if
    // the full keypath is unreachable.
    ;

    _proto.value = function value() {
      if (isObject(this.target)) {
        return this.get(this.key, this.target);
      }
    } // Sets the current end value of the observed keypath. Calling setValue when
    // the full keypath is unreachable is a no-op.
    ;

    _proto.setValue = function setValue(value) {
      if (isObject(this.target)) {
        adapters[this.key.i].set(this.target, this.key.path, value);
      }
    } // Gets the provided key on an object.
    ;

    _proto.get = function get(key, obj) {
      return adapters[key.i].get(obj, key.path);
    } // Observes or unobserves a callback on the object using the provided key.
    ;

    _proto.set = function set(active, key, obj, callback) {
      var action = active ? 'observe' : 'unobserve';
      adapters[key.i][action](obj, key.path, callback);
    } // Unobserves the entire keypath.
    ;

    _proto.unobserve = function unobserve() {
      var obj;
      var token;

      for (var index = 0; index < this.tokens.length; index++) {
        token = this.tokens[index];

        if (obj = this.objectPath[index]) {
          this.set(false, token, obj, this);
        }
      }

      if (isObject(this.target)) {
        this.set(false, this.key, this.target, this.callback);
      }
    } // traverse the scope chain to find the scope which has the root property
    // if the property is not found in chain, returns the root scope
    ;

    _proto.getRootObject = function getRootObject(obj) {
      var rootProp;
      var current;

      if (!obj.$parent) {
        return obj;
      }

      if (this.tokens.length) {
        rootProp = this.tokens[0].path;
      } else {
        rootProp = this.key.path;
      }

      current = obj;

      while (current.$parent && current[rootProp] === undefined) {
        current = current.$parent;
      }

      return current;
    };

    return Observer;
  }();

  function getInputValue(el) {
    if (el.type === 'checkbox') {
      return el.checked;
    } else if (el.type === 'select-multiple') {
      var results = [];
      var option;

      for (var i = 0; i < el.options.length; i++) {
        option = el.options[i];

        if (option.selected) {
          results.push(option.value);
        }
      }

      return results;
    } else {
      return el.value;
    }
  }

  var FORMATTER_ARGS = /[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g;
  var FORMATTER_SPLIT = /\s+/; // A single binding between a model attribute and a DOM element.

  var Binding =
  /*#__PURE__*/
  function () {
    // All information about the binding is passed into the constructor; the
    // containing view, the DOM node, the type of binding, the model object and the
    // keypath at which to listen for changes.
    function Binding(view, el, type, keypath, binder, arg, formatters) {
      this.view = view;
      this.el = el;
      this.type = type;
      this.keypath = keypath;
      this.binder = binder;
      this.arg = arg;
      this.formatters = formatters;
      this.formatterObservers = {};
      this.model = undefined;
    } // Observes the object keypath


    var _proto = Binding.prototype;

    _proto.observe = function observe(obj, keypath) {
      return new Observer(obj, keypath, this);
    };

    _proto.parseTarget = function parseTarget() {
      if (this.keypath) {
        var token = parseType(this.keypath);

        if (token.type === 0) {
          this.value = token.value;
        } else {
          this.observer = this.observe(this.view.models, this.keypath);
          this.model = this.observer.target;
        }
      } else {
        this.value = undefined;
      }
    };

    _proto.parseFormatterArguments = function parseFormatterArguments(args, formatterIndex) {
      var _this = this;

      return args.map(parseType).map(function (_ref, ai) {
        var type = _ref.type,
            value = _ref.value;

        if (type === 0) {
          return value;
        } else {
          if (!_this.formatterObservers[formatterIndex]) {
            _this.formatterObservers[formatterIndex] = {};
          }

          var observer = _this.formatterObservers[formatterIndex][ai];

          if (!observer) {
            observer = _this.observe(_this.view.models, value);
            _this.formatterObservers[formatterIndex][ai] = observer;
          }

          return observer.value();
        }
      });
    } // Applies all the current formatters to the supplied value and returns the
    // formatted value.
    ;

    _proto.formattedValue = function formattedValue(value) {
      var _this2 = this;

      return this.formatters.reduce(function (result, declaration, index) {
        var args = declaration.match(FORMATTER_ARGS);
        var id = args.shift();
        var formatter = _this2.view.options.formatters[id];

        var processedArgs = _this2.parseFormatterArguments(args, index);

        if (formatter && formatter.read instanceof Function) {
          result = formatter.read.apply(formatter, [result].concat(processedArgs));
        } else if (formatter instanceof Function) {
          result = formatter.apply(void 0, [result].concat(processedArgs));
        }

        return result;
      }, value);
    } // Returns an event handler for the binding around the supplied function.
    ;

    _proto.eventHandler = function eventHandler(fn) {
      var binding = this;
      var handler = binding.view.options.handler;
      return function (ev) {
        handler.call(fn, this, ev, binding);
      };
    } // Sets the value for the binding. This Basically just runs the binding routine
    // with the supplied value formatted.
    ;

    _proto.set = function set(value) {
      if (value instanceof Function && !this.binder.function) {
        value = this.formattedValue(value.call(this.model));
      } else {
        value = this.formattedValue(value);
      }

      var routineFn = this.binder.routine || this.binder;

      if (routineFn instanceof Function) {
        routineFn.call(this, this.el, value);
      }
    } // Syncs up the view binding with the model.
    ;

    _proto.sync = function sync() {
      if (this.observer) {
        this.model = this.observer.target;
        this.set(this.observer.value());
      } else {
        this.set(this.value);
      }
    } // Publishes the value currently set on the input element back to the model.
    ;

    _proto.publish = function publish() {
      var _this3 = this;

      if (this.observer) {
        var value = this.formatters.reduceRight(function (result, declaration, index) {
          var args = declaration.split(FORMATTER_SPLIT);
          var id = args.shift();
          var formatter = _this3.view.options.formatters[id];

          var processedArgs = _this3.parseFormatterArguments(args, index);

          if (formatter && formatter.publish) {
            result = formatter.publish.apply(formatter, [result].concat(processedArgs));
          }

          return result;
        }, this.getValue(this.el));
        this.observer.setValue(value);
      }
    } // Subscribes to the model for changes at the specified keypath. Bi-directional
    // routines will also listen for changes on the element to propagate them back
    // to the model.
    ;

    _proto.bind = function bind() {
      this.parseTarget();

      if (this.binder.hasOwnProperty('bind')) {
        this.binder.bind.call(this, this.el);
      }

      if (this.view.options.preloadData) {
        this.sync();
      }
    } // Unsubscribes from the model and the element.
    ;

    _proto.unbind = function unbind() {
      var _this4 = this;

      if (this.binder.unbind) {
        this.binder.unbind.call(this, this.el);
      }

      if (this.observer) {
        this.observer.unobserve();
      }

      Object.keys(this.formatterObservers).forEach(function (fi) {
        var args = _this4.formatterObservers[fi];
        Object.keys(args).forEach(function (ai) {
          args[ai].unobserve();
        });
      });
      this.formatterObservers = {};
    } // Updates the binding's model from what is currently set on the view. Unbinds
    // the old model first and then re-binds with the new model.
    ;

    _proto.update = function update(models) {
      if (models === void 0) {
        models = {};
      }

      if (this.observer) {
        this.model = this.observer.target;
      }

      if (this.binder.update) {
        this.binder.update.call(this, models);
      }
    } // Returns elements value
    ;

    _proto.getValue = function getValue(el) {
      if (this.binder && this.binder.getValue) {
        return this.binder.getValue.call(this, el);
      } else {
        return getInputValue(el);
      }
    };

    return Binding;
  }();

  var textBinder = {
    routine: function routine(node, value) {
      node.data = value != null ? value : '';
    }
  };
  var DECLARATION_SPLIT = /((?:'[^']*')*(?:(?:[^\|']*(?:'[^']*')+[^\|']*)+|[^\|]+))|^$/g;

  var parseNode = function parseNode(view, node) {
    var block = false;

    if (node.nodeType === 3) {
      var tokens = parseTemplate(node.data, tinybind.templateDelimiters);

      if (tokens) {
        for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i];
          var text = document.createTextNode(token.value);
          node.parentNode.insertBefore(text, node);

          if (token.type === 1) {
            view.buildBinding(text, null, token.value, textBinder, null);
          }
        }

        node.parentNode.removeChild(node);
      }

      block = true;
    } else if (node.nodeType === 1) {
      block = view.traverse(node);
    }

    if (!block) {
      for (var _i = 0; _i < node.childNodes.length; _i++) {
        parseNode(view, node.childNodes[_i]);
      }
    }
  };

  var bindingComparator = function bindingComparator(a, b) {
    var aPriority = a.binder ? a.binder.priority || 0 : 0;
    var bPriority = b.binder ? b.binder.priority || 0 : 0;
    return bPriority - aPriority;
  };

  var trimStr = function trimStr(str) {
    return str.trim();
  }; // A collection of bindings built from a set of parent nodes.


  var View =
  /*#__PURE__*/
  function () {
    // The DOM elements and the model objects for binding are passed into the
    // constructor along with any local options that should be used throughout the
    // context of the view and it's bindings.
    function View(els, models, options) {
      if (els.jquery || els instanceof Array) {
        this.els = els;
      } else {
        this.els = [els];
      }

      this.models = models;
      this.options = options;
      this.build();
    }

    var _proto = View.prototype;

    _proto.buildBinding = function buildBinding(node, type, declaration, binder, arg) {
      var pipes = declaration.match(DECLARATION_SPLIT).map(trimStr);
      var keypath = pipes.shift();
      this.bindings.push(new Binding(this, node, type, keypath, binder, arg, pipes));
    } // Parses the DOM tree and builds `Binding` instances for every matched
    // binding declaration.
    ;

    _proto.build = function build() {
      this.bindings = [];
      var elements = this.els,
          i,
          len;

      for (i = 0, len = elements.length; i < len; i++) {
        parseNode(this, elements[i]);
      }

      this.bindings.sort(bindingComparator);
    };

    _proto.traverse = function traverse(node) {
      var bindingPrefix = tinybind._fullPrefix;
      var block = node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE';
      var attributes = node.attributes;
      var bindInfos = [];
      var starBinders = this.options.starBinders;
      var type, binder, identifier, arg;

      for (var i = 0, len = attributes.length; i < len; i++) {
        var attribute = attributes[i];

        if (attribute.name.indexOf(bindingPrefix) === 0) {
          type = attribute.name.slice(bindingPrefix.length);
          binder = this.options.binders[type];
          arg = undefined;

          if (!binder) {
            for (var k = 0; k < starBinders.length; k++) {
              identifier = starBinders[k];

              if (type.slice(0, identifier.length - 1) === identifier.slice(0, -1)) {
                binder = this.options.binders[identifier];
                arg = type.slice(identifier.length - 1);
                break;
              }
            }
          }

          if (!binder) {
            binder = tinybind.fallbackBinder;
          }

          if (binder.block) {
            this.buildBinding(node, type, attribute.value, binder, arg);
            node.removeAttribute(attribute.name);
            return true;
          }

          bindInfos.push({
            attr: attribute,
            binder: binder,
            type: type,
            arg: arg
          });
        }
      }

      for (var _i2 = 0; _i2 < bindInfos.length; _i2++) {
        var bindInfo = bindInfos[_i2];
        this.buildBinding(node, bindInfo.type, bindInfo.attr.value, bindInfo.binder, bindInfo.arg);
        node.removeAttribute(bindInfo.attr.name);
      }

      return block;
    } // Binds all of the current bindings for this view.
    ;

    _proto.bind = function bind() {
      this.bindings.forEach(function (binding) {
        binding.bind();
      });
    } // Unbinds all of the current bindings for this view.
    ;

    _proto.unbind = function unbind() {
      this.bindings.forEach(function (binding) {
        binding.unbind();
      });
    } // Syncs up the view with the model by running the routines on all bindings.
    ;

    _proto.sync = function sync() {
      this.bindings.forEach(function (binding) {
        binding.sync();
      });
    } // Publishes the input values from the view back to the model (reverse sync).
    ;

    _proto.publish = function publish() {
      this.bindings.forEach(function (binding) {
        if (binding.binder && binding.binder.publishes) {
          binding.publish();
        }
      });
    } // Updates the view's models along with any affected bindings.
    ;

    _proto.update = function update(models) {
      var _this = this;

      if (models === void 0) {
        models = {};
      }

      Object.keys(models).forEach(function (key) {
        _this.models[key] = models[key];
      });
      this.bindings.forEach(function (binding) {
        if (binding.update) {
          binding.update(models);
        }
      });
    };

    return View;
  }();

  // The default `.` adapter that comes with tinybind.js. Allows subscribing to
  // properties on plain objects, implemented in ES5 natives using
  // `Object.defineProperty`.
  var ARRAY_METHODS = ['push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'splice'];
  var adapter = {
    counter: 0,
    weakmap: {},
    weakReference: function weakReference(obj) {
      if (!obj.hasOwnProperty('__rv')) {
        var id = this.counter++;
        Object.defineProperty(obj, '__rv', {
          value: id
        });
      }

      if (!this.weakmap[obj.__rv]) {
        this.weakmap[obj.__rv] = {
          callbacks: {}
        };
      }

      return this.weakmap[obj.__rv];
    },
    cleanupWeakReference: function cleanupWeakReference(data, refId) {
      if (!Object.keys(data.callbacks).length) {
        if (!(data.pointers && Object.keys(data.pointers).length)) {
          delete this.weakmap[refId];
        }
      }
    },
    stubFunction: function stubFunction(obj, fn) {
      var original = obj[fn];
      var data = this.weakReference(obj);
      var weakmap = this.weakmap;

      obj[fn] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var response = original.apply(obj, args);
        Object.keys(data.pointers).forEach(function (refId) {
          var k = data.pointers[refId];

          if (weakmap[refId]) {
            if (weakmap[refId].callbacks[k] instanceof Array) {
              weakmap[refId].callbacks[k].forEach(function (callback) {
                callback.sync();
              });
            }
          }
        });
        return response;
      };
    },
    observeArray: function observeArray(value, refId, keypath) {
      var _this = this;

      if (value instanceof Array) {
        var data = this.weakReference(value);

        if (!data.pointers) {
          data.pointers = {};
          ARRAY_METHODS.forEach(function (fn) {
            _this.stubFunction(value, fn);
          });
        }

        if (!data.pointers[refId]) {
          data.pointers[refId] = [];
        }

        if (data.pointers[refId].indexOf(keypath) === -1) {
          data.pointers[refId].push(keypath);
        }
      }
    },
    unobserveArray: function unobserveArray(value, refId, keypath) {
      if (value instanceof Array && value.__rv != null) {
        var data = this.weakmap[value.__rv];

        if (data) {
          var pointers = data.pointers[refId];

          if (pointers) {
            var idx = pointers.indexOf(keypath);

            if (idx > -1) {
              pointers.splice(idx, 1);
            }

            if (!pointers.length) {
              delete data.pointers[refId];
            }

            this.cleanupWeakReference(data, value.__rv);
          }
        }
      }
    },
    observe: function observe(obj, keypath, callback) {
      var _this2 = this;

      var value;
      var callbacks = this.weakReference(obj).callbacks;

      if (!callbacks[keypath]) {
        callbacks[keypath] = [];
        var desc = Object.getOwnPropertyDescriptor(obj, keypath);

        if (!desc || !(desc.get || desc.set || !desc.configurable)) {
          value = obj[keypath];
          Object.defineProperty(obj, keypath, {
            enumerable: true,
            get: function get() {
              return value;
            },
            set: function set(newValue) {
              if (newValue !== value) {
                _this2.unobserveArray(value, obj.__rv, keypath);

                value = newValue;
                var data = _this2.weakmap[obj.__rv];

                if (data) {
                  var _callbacks = data.callbacks[keypath];

                  if (_callbacks) {
                    _callbacks.forEach(function (cb) {
                      cb.sync();
                    });
                  }

                  _this2.observeArray(newValue, obj.__rv, keypath);
                }
              }
            }
          });
        }
      }

      if (callbacks[keypath].indexOf(callback) === -1) {
        callbacks[keypath].push(callback);
      }

      this.observeArray(obj[keypath], obj.__rv, keypath);
    },
    unobserve: function unobserve(obj, keypath, callback) {
      var data = this.weakmap[obj.__rv];

      if (data) {
        var callbacks = data.callbacks[keypath];

        if (callbacks) {
          var idx = callbacks.indexOf(callback);

          if (idx > -1) {
            callbacks.splice(idx, 1);

            if (!callbacks.length) {
              delete data.callbacks[keypath];
              this.unobserveArray(obj[keypath], obj.__rv, keypath);
            }
          }

          this.cleanupWeakReference(data, obj.__rv);
        }
      }
    },
    get: function get(obj, keypath) {
      return obj[keypath];
    },
    set: function set(obj, keypath, value) {
      obj[keypath] = value;
    }
  };

  var getString = function getString(value) {
    return value != null ? value.toString() : undefined;
  };

  var times = function times(n, cb) {
    for (var i = 0; i < n; i++) {
      cb();
    }
  };

  function createView(binding, data, anchorEl) {
    var template = binding.el.cloneNode(true);
    var view = new View(template, data, binding.view.options);
    view.bind();
    binding.marker.parentNode.insertBefore(template, anchorEl);
    return view;
  }

  var binders = {
    // Binds an event handler on the element.
    'on-*': {
      function: true,
      priority: 1000,
      unbind: function unbind(el) {
        if (this.handler) {
          el.removeEventListener(this.arg, this.handler);
        }
      },
      routine: function routine(el, value) {
        if (this.handler) {
          el.removeEventListener(this.arg, this.handler);
        }

        this.handler = this.eventHandler(value);
        el.addEventListener(this.arg, this.handler);
      }
    },
    // Appends bound instances of the element in place for each item in the array.
    'each-*': {
      block: true,
      priority: 4000,
      bind: function bind(el) {
        if (!this.marker) {
          this.marker = document.createComment(" tinybind: " + this.type + " ");
          this.iterated = [];
          el.parentNode.insertBefore(this.marker, el);
          el.parentNode.removeChild(el);
        } else {
          this.iterated.forEach(function (view) {
            view.bind();
          });
        }
      },
      unbind: function unbind(el) {
        if (this.iterated) {
          this.iterated.forEach(function (view) {
            view.unbind();
          });
        }
      },
      routine: function routine(el, collection) {
        var _this = this;

        var modelName = this.arg;
        collection = collection || [];
        var indexProp = el.getAttribute('index-property') || '$index';
        collection.forEach(function (model, index) {
          var data = {
            $parent: _this.view.models
          };
          data[indexProp] = index;
          data[modelName] = model;
          var view = _this.iterated[index];

          if (!view) {
            var previous = _this.marker;

            if (_this.iterated.length) {
              previous = _this.iterated[_this.iterated.length - 1].els[0];
            }

            view = createView(_this, data, previous.nextSibling);

            _this.iterated.push(view);
          } else {
            if (view.models[modelName] !== model) {
              // search for a view that matches the model
              var matchIndex, nextView;

              for (var nextIndex = index + 1; nextIndex < _this.iterated.length; nextIndex++) {
                nextView = _this.iterated[nextIndex];

                if (nextView.models[modelName] === model) {
                  matchIndex = nextIndex;
                  break;
                }
              }

              if (matchIndex !== undefined) {
                // model is in other position
                // todo: consider avoiding the splice here by setting a flag
                // profile performance before implementing such change
                _this.iterated.splice(matchIndex, 1);

                _this.marker.parentNode.insertBefore(nextView.els[0], view.els[0]);

                nextView.models[indexProp] = index;
              } else {
                //new model
                nextView = createView(_this, data, view.els[0]);
              }

              _this.iterated.splice(index, 0, nextView);
            } else {
              view.models[indexProp] = index;
            }
          }
        });

        if (this.iterated.length > collection.length) {
          times(this.iterated.length - collection.length, function () {
            var view = _this.iterated.pop();

            view.unbind();

            _this.marker.parentNode.removeChild(view.els[0]);
          });
        }

        if (el.nodeName === 'OPTION') {
          this.view.bindings.forEach(function (binding) {
            if (binding.el === _this.marker.parentNode && binding.type === 'value') {
              binding.sync();
            }
          });
        }
      },
      update: function update(models) {
        var _this2 = this;

        var data = {}; //todo: add test and fix if necessary

        Object.keys(models).forEach(function (key) {
          if (key !== _this2.arg) {
            data[key] = models[key];
          }
        });
        this.iterated.forEach(function (view) {
          view.update(data);
        });
      }
    },
    // Adds or removes the class from the element when value is true or false.
    'class-*': function _class(el, value) {
      var elClass = " " + el.className + " ";

      if (!value === elClass.indexOf(" " + this.arg + " ") > -1) {
        if (value) {
          el.className = el.className + " " + this.arg;
        } else {
          el.className = elClass.replace(" " + this.arg + " ", ' ').trim();
        }
      }
    },
    // Sets the element's text value.
    text: function text(el, value) {
      el.textContent = value != null ? value : '';
    },
    // Sets the element's HTML content.
    html: function html(el, value) {
      el.innerHTML = value != null ? value : '';
    },
    // Shows the element when value is true.
    show: function show(el, value) {
      el.style.display = value ? '' : 'none';
    },
    // Hides the element when value is true (negated version of `show` binder).
    hide: function hide(el, value) {
      el.style.display = value ? 'none' : '';
    },
    // Enables the element when value is true.
    enabled: function enabled(el, value) {
      el.disabled = !value;
    },
    // Disables the element when value is true (negated version of `enabled` binder).
    disabled: function disabled(el, value) {
      el.disabled = !!value;
    },
    // Checks a checkbox or radio input when the value is true. Also sets the model
    // property when the input is checked or unchecked (two-way binder).
    checked: {
      publishes: true,
      priority: 2000,
      bind: function bind(el) {
        var self = this;

        if (!this.callback) {
          this.callback = function () {
            self.publish();
          };
        }

        el.addEventListener('change', this.callback);
      },
      unbind: function unbind(el) {
        el.removeEventListener('change', this.callback);
      },
      routine: function routine(el, value) {
        if (el.type === 'radio') {
          el.checked = getString(el.value) === getString(value);
        } else {
          el.checked = !!value;
        }
      }
    },
    // Sets the element's value. Also sets the model property when the input changes
    // (two-way binder).
    value: {
      publishes: true,
      priority: 3000,
      bind: function bind(el) {
        this.isRadio = el.tagName === 'INPUT' && el.type === 'radio';

        if (!this.isRadio) {
          this.event = el.getAttribute('event-name') || (el.tagName === 'SELECT' ? 'change' : 'input');
          var self = this;

          if (!this.callback) {
            this.callback = function () {
              self.publish();
            };
          }

          el.addEventListener(this.event, this.callback);
        }
      },
      unbind: function unbind(el) {
        if (!this.isRadio) {
          el.removeEventListener(this.event, this.callback);
        }
      },
      routine: function routine(el, value) {
        if (this.isRadio) {
          el.setAttribute('value', value);
        } else {
          if (el.type === 'select-multiple') {
            if (value instanceof Array) {
              for (var i = 0; i < el.length; i++) {
                var option = el[i];
                option.selected = value.indexOf(option.value) > -1;
              }
            }
          } else if (getString(value) !== getString(el.value)) {
            el.value = value != null ? value : '';
          }
        }
      }
    },
    // Inserts and binds the element and it's child nodes into the DOM when true.
    if: {
      block: true,
      priority: 4000,
      bind: function bind(el) {
        if (!this.marker) {
          this.marker = document.createComment(' tinybind: ' + this.type + ' ' + this.keypath + ' ');
          this.attached = false;
          el.parentNode.insertBefore(this.marker, el);
          el.parentNode.removeChild(el);
        } else if (this.bound === false && this.nested) {
          this.nested.bind();
        }

        this.bound = true;
      },
      unbind: function unbind() {
        if (this.nested) {
          this.nested.unbind();
          this.bound = false;
        }
      },
      routine: function routine(el, value) {
        if (!!value !== this.attached) {
          if (value) {
            if (!this.nested) {
              this.nested = new View(el, this.view.models, this.view.options);
              this.nested.bind();
            }

            this.marker.parentNode.insertBefore(el, this.marker.nextSibling);
            this.attached = true;
          } else {
            el.parentNode.removeChild(el);
            this.attached = false;
          }
        }
      },
      update: function update(models) {
        if (this.nested) {
          this.nested.update(models);
        }
      }
    }
  };

  var formatters = {
    watch: function watch(value) {
      return value;
    },
    not: function not(value) {
      return !value;
    },
    negate: function negate(value) {
      return !value;
    }
  };

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  var Component =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inheritsLoose(Component, _HTMLElement);

    function Component() {
      return _HTMLElement.apply(this, arguments) || this;
    }

    var _proto = Component.prototype;

    _proto.connectedCallback = function connectedCallback() {
      var nodes = this.constructor.__templateEl.content.cloneNode(true);

      this.__tinybindView = tinybind.bind(nodes, this);

      while (this.firstChild) {
        this.removeChild(this.firstChild);
      }

      this.appendChild(nodes);
    };

    _proto.disconnectedCallback = function disconnectedCallback() {
      this.__tinybindView.unbind();
    };

    _proto.attributeChangedCallback = function attributeChangedCallback(name, old, value) {
      if (old !== value) {
        var propName = this.constructor.__propAttributeMap[name];
        this[propName] = value;
      }
    };

    _createClass(Component, null, [{
      key: "observedAttributes",
      get: function get() {
        var template = this.template;

        if (!template) {
          throw new Error("No template declared for " + this.name);
        }

        this.__templateEl = document.createElement('template');
        this.__templateEl.innerHTML = template;
        var propAttributeMap = this.__propAttributeMap = {};
        var attributes = [];
        var properties = this.properties;

        if (properties) {
          Object.keys(properties).forEach(function (propName) {
            var propConfig = properties[propName];
            var attrName = typeof propConfig === 'string' ? propConfig : propName;
            propAttributeMap[attrName] = propName;
            attributes.push(attrName);
          });
        }

        return attributes;
      }
    }]);

    return Component;
  }(_wrapNativeSuper(HTMLElement));

  tinybind.binders = binders;
  tinybind.formatters = formatters;
  tinybind.adapters['.'] = adapter;
  tinybind.Component = Component; // Binds some data to a template / element. Returns a tinybind.View instance.

  tinybind.bind = function (el, models, options) {
    var viewOptions = {};
    models = models || {};
    options = options || {};
    EXTENSIONS.forEach(function (extensionType) {
      viewOptions[extensionType] = Object.create(null);

      if (options[extensionType]) {
        Object.keys(options[extensionType]).forEach(function (key) {
          viewOptions[extensionType][key] = options[extensionType][key];
        });
      }

      Object.keys(tinybind[extensionType]).forEach(function (key) {
        if (!viewOptions[extensionType][key]) {
          viewOptions[extensionType][key] = tinybind[extensionType][key];
        }
      });
    });
    OPTIONS.forEach(function (option) {
      var value = options[option];
      viewOptions[option] = value != null ? value : tinybind[option];
    });
    viewOptions.starBinders = Object.keys(viewOptions.binders).filter(function (key) {
      return key.indexOf('*') > 0;
    });
    Observer.updateOptions(viewOptions);
    var view = new View(el, models, viewOptions);
    view.bind();
    return view;
  };

  return tinybind;

}));

var jsStoreLocator = {
  init(container){
    this.selectors = {
      storesDataContainer: 'script#store-locations',
      filtersDataContainer: 'script#store-location-filters',
      mapContainer: '#Map-'
    };

    this.defaults = {
      map: {
        zoom: 6,
        center: {
          lat: -40.895021,
          lng: 170.5285246
        },
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true
      },
      rawDataType: 'json',
      googlePlacesFields: [
        'url',
      ],
      enableSearch: true
    };
    if (typeof container == 'undefined') {
      if ($("[data-section-type='store-locator']").length > 0) {
        container = $("[data-section-type='store-locator']");
      }else {
        return;
      }
    }

    this.container = container;
    this.sectionId = this.container.attr('data-section-id'); //container.dataset.sectionId;
    this.mapContainer = document.querySelector(this.selectors.mapContainer + this.sectionId);

    if (!this.container) {
      return;
    }

    this.data = {
      parsedData: {},
      stores: [],
      groups: [],
      filters: [],
      tags: [],
      activeFilters: [],
      activeStore: null,
      activeGroup: null,
      storesInFilter: [],
      storesInView: [],
    };

    this.methods = {
      focusStore: this._focusStore.bind(this),
      zoomToFitMarkers: this._zoomToFitMarkers.bind(this),
      selectGroup: this._focusGroup.bind(this),
      selectFilter: this._focusFilter.bind(this),
      clearFilter: this._clearFilters.bind(this),
      findUser: this._findUser.bind(this),
    };

    this._prepareData();
    this._bindView();
    this._buildMap();

    if ("geolocation" in navigator) {
      this.data.geolocationEnabled = true;
    }

    this.data.is_ready = true;
  },

  _focusFilter() {

    var id,
    filter;

    id = event.currentTarget.dataset.filterId;
    filter = this.data.filters.find(function(f){
      return f.id === id;
    })

    if (!filter) {
      console.error(new Error('No filter found!'));
      return;
    }

    if (filter.active) {
      this._setActiveFilter(filter, 'remove');
    } else {
      this._setActiveFilter(filter, 'add');
    }

  },

  _setActiveFilter(filter, action, updateMap) {

    var self = this;

    // action = 'add', 'remove', 'replace', 'reset'

    if (!action) {
      console.error('An action must be defined');
      console.error('action = add, remove, replace, reset');
      return;
    }

    this._setActiveStore(false, false);

    switch(action) {

      case 'replace':

      this.data.activeFilters.forEach(function(filter) {
        filter.active = false;
      });

      this.data.activeFilters = [];

      filter.active = true;
      this.data.activeFilters.push(filter);
      break;

      case 'remove':

      filter.active = false;
      _.remove(this.data.activeFilters, {'id': filter.id});
      break;

      case 'add':

      filter.active = true;
      this.data.activeFilters.push(filter);
      break;

      case 'reset':

      this.data.activeFilters.forEach(function(filter) {
        filter.active = false;
      });

      this.data.activeFilters = [];
      break;

    }

    this.data.stores.forEach(function(store, i) {
      var storeInFilter = true;

      self.data.activeFilters.forEach(function(filter) {

        if (!store.tags || store.tags.indexOf(filter.tag) == -1) {
          storeInFilter = false;
        }

      });

      if (storeInFilter) {
        self._addStoreToFilter(store);
      } else {
        self._removeStoreFromFilter(store);
      }

    });

    if (self.data.activeFilters.length == 0) {
      this.data.storesAreFiltered = false;
    } else {
      this.data.storesAreFiltered = true;
    }

    this._getMarkersInView();

    this._toggleFiltersNoResultsMessage();

  },

  _toggleFiltersNoResultsMessage() {

    if (this.data.storesAreFiltered && this.data.storesInFilter.length == 0) {
      this.data.filterNoResults = true;
    } else {
      this.data.filterNoResults = false;
    }

  },

  _clearFilters() {
    this._setActiveFilter(false, 'reset');
  },

  _addStoreToFilter(store) {

    if (store.in_filter == true) {
      return;
    }

    store.in_filter = true;
    store.marker.setMap(this.map);
    store.markerCluster.addMarker(store.marker);
    store.markerCluster.redraw();

    this.data.storesInFilter.push(store);

  },

  _removeStoreFromFilter(store) {

    if (store.in_filter == false) {
      return;
    }

    store.in_filter = false;
    store.markerCluster.removeMarker(store.marker);
    store.marker.setMap(null);
    store.markerCluster.redraw();

    _.pull(this.data.storesInFilter, store);

  },

  _focusStore() {

    var id,
    store;

    id = event.currentTarget.dataset.storeId;
    store = this.data.stores.find(function(s){
      return s.id === id;
    });

    if (!store) {
      console.error(new Error('No store found!'));
      return;
    }

    // If a link is cliked, only follow the link if the store is active
    if (event.target && event.target.nodeName == 'A') {
      if (store.active) {
        return;
      } else {
        event.preventDefault();
      }
    }

    this._setActiveStore(store);

  },

  _setActiveStore(store, updateMap) {

    var self = this;

    var marker,
    markerPosition,
    activeStore,
    currentMapBounds,
    currentMapZoom,
    boundsContainsMarker;

    activeStore = this.data.activeStore;

    if (activeStore) {
      activeStore.active = false;

      if (activeStore.infoWindow) {
        activeStore.infoWindow.close();
      }

    }

    if (store == false) {
      this.data.activeStore = null;
      return;
    }

    if (updateMap != false) {

      marker = store.marker;

      markerPosition = marker.getPosition();
      currentMapBounds = this.map.getBounds();
      boundsContainsMarker =  currentMapBounds.contains(markerPosition);
      currentMapZoom = this.map.getZoom();

      if (!boundsContainsMarker || currentMapZoom < 12) {
        this.map.panTo(markerPosition);
        this.map.setZoom(14);
      }

    }

    if (store.group) {
      this._setActiveGroup(store.group, false);
    }

    this.data.activeStore = store;
    store.active = true;

    if (store.place_id && !store.place && !store.is_loading) {
      this._fetchStoreDetails(store, function() {
        self._openStoreInfoWindow(store);
      });
    } else {
      self._openStoreInfoWindow(store);
    }

  },

  _fetchStoreDetails(store, callback) {

    var request;

    store.is_loading = true;

    request = {
      placeId: store.place_id,
      fields: this.defaults.googlePlacesFields
    };

    function formatOpeningHours(periods) {
      // Formats opening hours provided by Google Places API

      var days,
      dayNames,
      dayIndex,
      dayTitle,
      daysString,
      openAmPm,
      openHours,
      openMinutes,
      openTime,
      closeAmPm,
      closeHours,
      closeMinutes,
      closeTime,
      timesString;

      days = [];
      dayNames = ['mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun'];

      periods.forEach(function(period) {

        dayIndex = period.open.day;
        dayTitle = dayNames[dayIndex];

        openAmPm = (period.open.hours < 12 ? 'am' : 'pm');
        openHours = (period.open.hours < 12 ? period.open.hours : period.open.hours - 12);
        openMinutes = (period.open.minutes ? ':' + period.open.minutes : '');
        openTime = openHours + openMinutes + openAmPm;

        closeAmPm = (period.close.hours < 12 ? 'am' : 'pm');
        closeHours = (period.close.hours < 12 ? period.close.hours : period.close.hours - 12);
        closeMinutes = (period.close.minutes ? ':' + period.close.minutes : '');
        closeTime = closeHours + closeMinutes + closeAmPm;

        timesString = openTime + ' - ' + closeTime;

        daysString = dayTitle;

        function TimePeriod(options) {
          $.extend(this, options);
        }

        days.push(new TimePeriod({
          startDay: dayTitle,
          endDay: dayTitle,
          daysString: daysString,
          timesString: timesString,
          open: openTime,
          close: closeTime,
        }));

      });

      days.forEach(function(day, i) {
        var nextDay;

        nextDay = days[i + 1];

        if (nextDay && day.timesString == nextDay.timesString) {
          nextDay.startDay = day.startDay;
          nextDay.daysString = nextDay.startDay + ' - ' + nextDay.endDay;
          day.toDelete = true;
        }

      });

      return days.filter(function(d){
        return d.toDelete != true;
      });

    }

    this.placesService.getDetails(request, function(place, status) {

      if (status === google.maps.places.PlacesServiceStatus.OK) {

        store.place = place;

        store.open_now = place.opening_hours.open_now;
        store.opening_hours = (place.opening_hours.periods ? formatOpeningHours(place.opening_hours.periods) : []);
        store.int_phone = place.international_phone_number;
        store.phone = (place.formatted_phone_number ? place.formatted_phone_number.replace(/\-/g, ' ') : false);
        // store.permanently_closed = place.permanently_closed;
        store.google_url = place.url;

        store.is_loading = false;

        if (callback && typeof callback == 'function') {
          callback();
        }

      } else {
        console.error(new Error('Error receiving data from Places service'));

        if (callback && typeof callback == 'function') {
          callback();
        }
      }

    });

  },

  _getTemplate(template) {
    return $('[data-template-for="' + template + '"]').html();
  },

  _openStoreInfoWindow(store) {

    var self = this;

    var marker;

    marker = store.marker;

    if (!store.infoWindow) {
      store.infoWindowContent = document.createElement('div');
      store.infoWindowContent.innerHTML = self._getTemplate('store-location-info-popup');

      tinybind.bind(store.infoWindowContent, {
        store: store
      });

      store.infoWindow = new google.maps.InfoWindow({
        content: store.infoWindowContent,
      });
    }

    store.infoWindow.open(self.map, store.marker);

  },

  _focusGroup() {

    var id,
    group;

    id = event.currentTarget.value;

    if (id == '' || id =='none') {
      this._setActiveGroup(false);
      return;
    }

    group = this.data.groups.find(function(g){
      return g.id === id;
    })

    if (!group) {
      console.error(new Error('No group found!'));
      return;
    }

    this._setActiveGroup(group);

  },

  _setActiveGroup(group, updateMap) {

    var self = this;

    var center,
    address,
    markerPosition,
    activeGroup;

    activeGroup = this.data.activeGroup;
    if (activeGroup) {
      activeGroup.active = false;
    }

    if (group == false) {
      this.data.activeGroup = null;
      this._zoomToFitMarkers();
      this._setActiveStore(false, false);
      return;
    }

    this.data.activeGroup = group;
    group.active = true;

    if (updateMap == false) {
      return;
    }

    this._setActiveStore(false, false);

    if (group.markers.length > 1) {

      bounds = new google.maps.LatLngBounds();

      group.markers.forEach(function(marker, i) {
        bounds.extend(marker.getPosition());
      });

      self.map.fitBounds(bounds);

    } else {

      markerPosition = group.markers[0].getPosition();

      this.map.panTo(markerPosition);
      this.map.setZoom(14);

    }


    //  IF LOOKUP UP A REGION FROM MAPS API

    // if (region.geo) {
    //   console.info(this.data);
    //   this.map.fitBounds(region.geo.bounds);
    //   return;
    // }

    // this.geocoder.geocode({
    //   'address': region.title,
    //   'bounds': bounds
    // }, function(results, status) {

    //   if (status == 'OK') {
    //     center = results[0].geometry;
    //     region.geo = center;

    //     self.map.fitBounds(region.geo.bounds);
    //   } else {
    //     console.error(new Error('Geocode error: ' + status));
    //   }

    // });

  },

  _prepareData() {

    var self = this;

    this._getData(processData);

    function processData() {
      self._prepareStoresData();
      self._prepareStoresTagsData();
      self._prepareGroupsData();
      self._prepareFiltersData();
    }

  },

  _getData(callback) {

    var dataContainer,
    rawData,
    parsedData,
    parseOptions,
    rawDataType;

    dataContainer = document.querySelector(this.selectors.storesDataContainer);

    rawDataType = this.defaults.rawDataType;

    if (!dataContainer) {
      console.error(new Error('Missing data container'));
      return;
    }

    rawData = dataContainer.innerHTML;

    switch(rawDataType) {

      case 'json':

      this.data.parsedData.data = JSON.parse(rawData);
      callback();
      return;

      case 'csv':

      parseOptions = {
        header: true,
        dynamicTyping: true
      };

      this.data.parsedData = Papa.parse(rawData, parseOptions);
      callback();
      return;

      default:

      this.data.parsedData.data = rawData;
      callback();
      return;

    }

  },

  _handleize(str) {
    return str.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "");
  },
  _prepareStoresData() {

    var self = this;

    var locationMarkerSVG,
    googleMapsSearchURLPrefix;

    locationMarkerSVG = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path d="M256,0C161.896,0,85.333,76.563,85.333,170.667c0,28.25,7.063,56.26,20.49,81.104L246.667,506.5    c1.875,3.396,5.448,5.5,9.333,5.5s7.458-2.104,9.333-5.5l140.896-254.813c13.375-24.76,20.438-52.771,20.438-81.021    C426.667,76.563,350.104,0,256,0z M256,256c-47.052,0-85.333-38.281-85.333-85.333c0-47.052,38.281-85.333,85.333-85.333    s85.333,38.281,85.333,85.333C341.333,217.719,303.052,256,256,256z"/></svg>';
    googleMapsSearchURLPrefix = 'https://www.google.com/maps/search/';

    function Store(data) {
      $.extend(this, data);
      this.id = self._handleize(this.title);
      this.icon = locationMarkerSVG;
      this.google_url = googleMapsSearchURLPrefix + self._handleize(this.title).replace(/\-/g, '+') + '+' + self._handleize(this.street).replace(/\-/g, '+');
      this.opening_hours = this.opening_hours.split(/,/).map(function(period) {
        return period.replace(/:/, '#').split(/#/).map(function(v){
          return v.trim()
        });
      });
    }

    if (self.data.parsedData.errors && self.data.parsedData.errors.length > 0) {
      console.error(new Error('There was an error parsing data'));
      console.error(data.parsedData.errors);
      return;
    }
    self.data.parsedData.data.forEach(function(value){
      var store,
      locationData,
      existingArea;
      // Build store data
      store = new Store(value);
      self.data.stores.push(store);
    })
    // Sort stores by title
    self.data.stores = self.data.stores.sort(function(a, b) {
      return a.title.localeCompare(b.title)
    })

  },

  _prepareStoresTagsData() {

    var self = this;

    function Tag(data) {
      $.extend(this, data);
      this.id = self._handleize(this.title);
    }

    this.data.stores.forEach(function(store, i) {
      var existingTag,
      tagString,
      tags;

      if (store.tags && typeof store.tags == 'string') {

        tags = store.tags.split(',');

        store.tags = [];

        tags.forEach(function(tagString) {

          tagString = self._handleize(tagString);

          existingTag = self.data.tags.find(function(t){
            return t.title == tagString;
          });

          if (!existingTag) {

            tag = new Tag({ title: tagString });
            self.data.tags.push(tag);


          } else {
            tag = existingTag;
          }

          store.tags.push(tag);

        });

      }

    });

  },

  _prepareGroupsData() {

    var self = this;

    function Group(data) {
      $.extend(this, data);
      this.id = self._handleize(this.title);
    }

    this.data.stores.forEach(function(store, i) {
      var locationData,
      existingGroup;

      if (store.group && typeof store.group == 'string') {

        existingGroup = self.data.groups.find(function(g){
          return g.title === store.group;
        });

        if (!existingGroup) {
          locationData = {
            title: store.group
          };

          group = new Group(locationData);
          self.data.groups.push(group);
          group.stores = [];

        } else {
          group = existingGroup;
        }

        store.group = group;

        group.stores.push(store);

      }

    });

  },

  _prepareFiltersData() {

    var self = this;

    var dataContainer,
    rawData,
    jsonData;

    dataContainer = document.querySelector(this.selectors.filtersDataContainer);

    if (!dataContainer) {
      console.error(new Error('Missing data container'));
      return;
    }

    rawData = dataContainer.innerHTML;
    jsonData = JSON.parse(rawData);

    function Filter(data) {
      $.extend(this, data);
      this.id = self._handleize(this.title);
    }

    jsonData.forEach(function(value) {
      var filter,
      tag;

      value.tag = self.data.tags.find(function(t){
        return t.title === value.tag;
      });

      if (value.tag) {
        value.tag.icon = value.icon;
      }

      filter = new Filter(value);
      self.data.filters.push(filter);

    });

  },

  _bindView() {

    tinybind.bind(this.container, {
      data: this.data,
      methods: this.methods
    });

  },

  _buildMap() {

    var self = this;

    var googleMapsAPIURL,
    googleMapsAPIKEY,
    googleMapsAdditionalLibraries;

    googleMapsAPIURL = 'https://maps.googleapis.com/maps/api/js?key=';
    googleMapsAPIKEY = this.container.data('maps-key');
    if (typeof googleMapsAPIKEY == 'undefined' || googleMapsAPIKEY == null) {
      googleMapsAPIKEY = '';
    } else {
      googleMapsAPIKEY = googleMapsAPIKEY;
    }
    googleMapsAdditionalLibraries = '&libraries=places';

    // if (!googleMapsAPIKEY) {
    //   return console.error(new Error('Google Maps API key is required. You can set this up as as Store metafield: '))
    // }

    var options = this.defaults.map;

    function initMap() {
      self.geocoder = new google.maps.Geocoder();
      self.map = new google.maps.Map(self.mapContainer, options);
      self.placesService = new google.maps.places.PlacesService(self.map);
      self._addMapMarkers();

      if (self.defaults.enableSearch) {
        self._prepareSearch();
      }
    }

    self._loadJS(googleMapsAPIURL + googleMapsAPIKEY + googleMapsAdditionalLibraries, initMap);

  },

  _addMapMarkers() {

    var self = this;

    this.data.stores.forEach(function(store, i) {
      var position,
      icon;

      position = {
        'lat': store.lat,
        'lng': store.long
      };

      icon = store.icon;

      store.marker = new google.maps.Marker({
        position: position,
        map: self.map,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(icon),
          size: new google.maps.Size(28, 40),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(14, 40),
          scaledSize: new google.maps.Size(28, 40)
        },
        optimized: false
      });

      if (store.group) {
        store.group.markers = store.group.markers || [];
        store.group.markers.push(store.marker);
      }

      store.marker.addListener('click', function() {
        self._setActiveStore(store);
      });
    });

    this._clusterMarkers();
    this._zoomToFitMarkers();
    this._bindMapListners();

  },

  _clusterMarkers() {
    var self = this;

    var clusterMarkerSVG = self._getTemplate('store-location-marker-icon');

    this.data.groups.forEach(function(group, i) {

      var clusterStyles = [
        {
          width: 28,
          height: 40,
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(clusterMarkerSVG),
          textColor: 'transparent',
          textSize: 0,
          iconAnchor: [50, 100],
        }
      ];

      group.markerCluster = new MarkerClusterer(self.map, group.markers, {
        gridSize: 30,
        styles: clusterStyles,
        zoomOnClick: true,
      });

      group.stores.forEach(function(store) {
        store.markerCluster = group.markerCluster;
      });

    });

  },

  _zoomToFitMarkers() {

    var bounds = new google.maps.LatLngBounds();

    this.data.stores.forEach(function(store, i) {
      bounds.extend(store.marker.getPosition());
    });

    this.map.fitBounds(bounds);

  },

  _bindMapListners() {

    var self = this;

    this.map.addListener('bounds_changed', self._debounce(this._getMarkersInView.bind(self), 50));

  },

  _debounce(func, wait, immediate) {
  var timeout, result;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) result = func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) result = func.apply(context, args);
    return result;
  };
},

  _unbindMapListners() {

    var self = this;

    google.maps.event.clearListeners(this.map, 'bounds_changed');

  },

  _getMarkersInView() {

    var self = this;

    this.data.storesInView = [];
    this.data.storesInActiveGroup = [];

    // this.data.activeGroupTitle = 'none';

    var bounds = this.map.getBounds();

    this.data.stores.forEach(function(store, i) {
      var markerPosition,
      boundsContainsMarker;

      markerPosition = store.marker.getPosition();
      boundsContainsMarker =  bounds.contains(markerPosition);

      if (boundsContainsMarker && (!self.data.storesAreFiltered || self.data.storesAreFiltered && store.in_filter)) {
        store.in_view = true;
        self.data.storesInView.push(store);
      } else {
        store.in_view = false;
      }

      if (store.group == self.data.activeGroup) {
        store.in_active_group = true;
        self.data.storesInActiveGroup.push(store);
      } else {
        store.in_active_group = false;
      }

    });

    if (this.data.storesInView && this.data.storesInView.length == 1) {
      var store = this.data.storesInView[0];

      if (store != self.data.activeStore) {
        this._setActiveStore(store, false);
      }

    }

  },

  _findUser() {

    var self = this;

    this.data.geolocationLoading = true;

    function success(position) {
      var pos;

      pos = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      };

      userLocation = new google.maps.LatLng(pos.lat, pos.long);

      self._updateUserMarker(userLocation);

      self._findClosestStore(userLocation);
      self.data.geolocationLoading = false;
    }

    function error() {

      self.data.geolocationLoading = false;
      self.data.geolocationEnabled = false;

      iziToast.error({
        title: 'We couldn\'t find your location',
        position: 'bottomCenter',
        theme: 'light',
      });

    }

    navigator.geolocation.getCurrentPosition(success, error);

  },

  _findClosestStore(latLng) {

    var self = this;

    var closestStore,
    bounds,
    userLocation;

    bounds = new google.maps.LatLngBounds();

    closestStore = getClosestStore(latLng);

    self._setActiveStore(closestStore, false);

    bounds.extend(closestStore.marker.getPosition());
    bounds.extend(latLng);

    self.map.fitBounds(bounds);

    function getClosestStore(latLng) {

      // https://stackoverflow.com/questions/4057665/google-maps-api-v3-find-nearest-markers
      var lat = latLng.lat();
      var long = latLng.lng();
      var R = 6371; // radius of earth in km
      var distances = [];
      var closest = -1;

      var closestStore = null;

      function rad(x) {return x*Math.PI/180;}

      self.data.stores.forEach(function(store, i) {

        var mlat = store.lat;
        var mlng = store.long;

        var dLat  = rad(mlat - lat);
        var dLong = rad(mlng - long);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        distances[i] = d;

        if ( closest == -1 || d < distances[closest] ) {
          closest = i;
          closestStore = store;
        }

      });

      return closestStore;

    }

  },

  _updateUserMarker(latLng) {

    var self = this;

    var pos,
    icon,
    user,
    locationMarkerSVG;

    if (!latLng) {
      console.error(new Error('latLng must be defined'));
      return;
    }

    function User(data) {
      $.extend(this, data);
    }

    if (!this.data.user) {

      locationMarkerSVG = self._getTemplate('user-location-marker-icon');
      this.data.user = new User({
        icon: locationMarkerSVG
      });

    }

    user = this.data.user;

    user.latLng = latLng;

    if (!user.marker) {
      icon = user.icon;

      user.marker = new google.maps.Marker({
        position: user.latLng,
        map: self.map,

        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(icon),
          size: new google.maps.Size(24, 24),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(12, 12),
          scaledSize: new google.maps.Size(24, 24)
        },

        optimized: false

      });

    } else {

      user.marker.setPosition(user.latLng);

    }

  },

  _prepareSearch() {

    this.data.searchEnabled = true;

    var self = this;


    var searchField;

    // If the search box breaks it is because we are
    // using TinyBind but searching for the input field
    // with an ID. Perhaps use a tinybind binder to
    // reference the input field.
    searchField = document.getElementById('store-locator-search')

    this.autocomplete = new google.maps.places.Autocomplete(searchField);

    // #todo: Autocomplete.setFields()

    this.autocomplete.addListener('place_changed', function() {

      var place;

      place = self.autocomplete.getPlace();

      if (!place.geometry) {

        iziToast.error({
          title: 'We couldn\'t find this location',
          position: 'bottomCenter',
          theme: 'light',
        });

        return;
      }

      self._findClosestStore(place.geometry.location);
      self._updateSearchMarker(place.geometry.location);

    });
  },

  _updateSearchMarker(latLng) {

    var self = this;

    var pos,
    icon,
    locationMarkerSVG;

    if (!latLng) {
      console.error(new Error('latLng must be defined'));
      return;
    }

    function Search(data) {
      $.extend(this, data);
    }

    if (!this.data.search) {

      locationMarkerSVG = self._getTemplate('search-location-marker-icon');
      this.data.search = new Search({
        icon: locationMarkerSVG
      });

    }

    search = this.data.search;
    search.latLng = latLng;

    if (!search.marker) {

      icon = search.icon;

      search.marker = new google.maps.Marker({
        position: search.latLng,
        map: self.map,

        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(icon),
          size: new google.maps.Size(24, 24),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(12, 12),
          scaledSize: new google.maps.Size(24, 24)
        },

        optimized: false

      });

    } else {

      search.marker.setPosition(search.latLng);

    }

  },

  _loadJS( src, cb ){
    "use strict";
    var ref = document.getElementsByTagName( "script" )[ 0 ];
    var script = document.createElement( "script" );
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore( script, ref );
    if (cb && typeof(cb) === "function") {
      script.onload = cb;
    }
    return script;
  }
}

jsStoreLocator.init();
