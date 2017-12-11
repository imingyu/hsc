(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.mschema = factory());
}(this, (function () { 'use strict';

var STORE = {};
var getItem = function getItem(key) {
    return STORE[key];
};
var setItem = function setItem(key, value) {
    STORE[key] = value;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var uniqueID = function uniqueID() {
    return (Math.random() + '').replace('0.', '');
};

var isObject = function isObject(obj) {
    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
};
var isFunction = function isFunction(obj) {
    return typeof obj === 'function' || obj instanceof Function;
};
var isEmptyObject = function isEmptyObject(obj) {
    var prop = void 0;
    for (prop in obj) {
        return false;
    }
    return true;
};

var formatString = function formatString(template) {
    var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return template.replace(/{([^}]*)}/g, function (match, key) {
        return key in values ? values[key] : match;
    });
};

// jQuery版extend函数
var extend = function extend() {
    var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false,
        toString = Object.prototype.toString,
        hasOwn = Object.prototype.hasOwnProperty,
        class2type = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regexp',
        '[object Object]': 'object'
    },
        jQuery = {
        isFunction: function isFunction(obj) {
            return jQuery.type(obj) === 'function';
        },
        isArray: Array.isArray || function (obj) {
            return jQuery.type(obj) === 'array';
        },
        isWindow: function isWindow(obj) {
            return obj != null && obj == obj.window;
        },
        isNumeric: function isNumeric(obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        },
        type: function type(obj) {
            return obj == null ? String(obj) : class2type[toString.call(obj)] || 'object';
        },
        isPlainObject: function isPlainObject(obj) {
            if (!obj || jQuery.type(obj) !== 'object' || obj.nodeType) {
                return false;
            }
            try {
                if (obj.constructor && !hasOwn.call(obj, 'constructor') && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
                    return false;
                }
            } catch (e) {
                return false;
            }
            var key;
            for (key in obj) {}
            return key === undefined || hasOwn.call(obj, key);
        }
    };
    if (typeof target === 'boolean') {
        deep = target;
        target = arguments[1] || {};
        i = 2;
    }
    if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object' && !jQuery.isFunction(target)) {
        target = {};
    }
    if (length === i) {
        target = this;
        --i;
    }
    for (i; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (target === copy) {
                    continue;
                }
                if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && jQuery.isArray(src) ? src : [];
                    } else {
                        clone = src && jQuery.isPlainObject(src) ? src : {};
                    }
                    // WARNING: RECURSION
                    target[name] = extend(deep, clone, copy);
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
};

var options = {
    rules: {
        required: {
            label: '必填',
            value: true,
            trimString: true,
            message: '此项{ruleLabel}'
        }
    }
};

var getValidResult = function getValidResult(validResult, message) {
    if (typeof validResult === 'boolean') {
        return {
            valid: validResult,
            message: message
        };
    } else if ((typeof validResult === 'undefined' ? 'undefined' : _typeof(validResult)) === 'object') {
        validResult.message = validResult.message || message;
        return validResult;
    } else {
        throw new Error('验证规则返回值无效！');
    }
};

var Rule = function () {
    function Rule(name, handler, options) {
        classCallCheck(this, Rule);

        this.name = name;
        this.handler = handler;
        this.options = options || {};
        this.mountedOptions = {};
    }

    createClass(Rule, [{
        key: 'mount',
        value: function mount(typeIns) {
            this.typeIns = typeIns;
            var store = getItem(typeIns.id);
            if (this.options.async) {
                store.spec.async = true;
            }
            if (!store.spec.rules[this.name]) {
                store.spec.rules[this.name] = true;
                store.rules[this.name] = this;
            }
        }
    }, {
        key: 'validate',
        value: function validate(value, callback) {
            var computedOptions = this.computeOptions();
            var store = getItem(this.typeIns.id);
            var message = computedOptions.message;
            var messageValues = {
                value: value,
                name: store.spec.name,
                label: store.spec.label,
                type: store.spec.type,
                ruleName: this.name,
                ruleLabel: computedOptions.label
            };
            if (typeof message === 'function') {
                message = message(messageValues);
            }
            message = message ? formatString(message + '', messageValues) : '';

            if (this.options.async) {
                this.handler.call(this, value, computedOptions, function (validResult) {
                    var result = getValidResult(validResult, message);
                    if (isFunction(callback)) {
                        callback(result);
                    }
                });
            } else {
                return getValidResult(this.handler.call(this, value, computedOptions), message);
            }
        }
    }, {
        key: 'computeOptions',
        value: function computeOptions() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return extend.apply(null, [true, {}, this.options, this.mountedOptions].concat(args));
        }
    }]);
    return Rule;
}();

var defaultHandler = {
    'any': function any(val) {
        return defaultHandler.number(val) || defaultHandler.boolean(val) || defaultHandler.object(val) || defaultHandler.array(val) || defaultHandler.string(val);
    },
    'number': function number(val) {
        return typeof val === 'number' && !isNaN(val);
    },
    'boolean': function boolean(val) {
        return typeof val === 'boolean';
    },
    'object': function object(val) {
        return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && val !== null && !isEmptyObject(obj);
    },
    'array': function array(val) {
        return Array.isArray(val) && val.length > 0;
    },
    'string': function string(val, ops) {
        var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
        if (type === 'number' && !isNaN(val)) {
            return true;
        }
        if (type === 'string' && val) {
            if (ops && ops.trimString) {
                return val.trim() !== '';
            } else {
                return true;
            }
        }
        return false;
    }
};

var Required = function (_Rule) {
    inherits(Required, _Rule);

    function Required() {
        classCallCheck(this, Required);
        return possibleConstructorReturn(this, (Required.__proto__ || Object.getPrototypeOf(Required)).call(this, 'required', function (value, options$$1, callback) {
            var store = getItem(this.typeIns.id);
            return (defaultHandler[store.spec.type] || defaultHandler['any'])(value, options$$1);
        }, options.rules.required));
    }

    createClass(Required, [{
        key: 'mount',
        value: function mount(typeIns, mountOptions) {
            this.mountedOptions = this.mountedOptions || {};
            if (isObject(mountOptions) && !isEmptyObject(mountOptions)) {
                extend(true, this.mountedOptions, mountOptions);
            } else if (typeof mountOptions === 'string') {
                this.mountedOptions.message = mountOptions;
            } else if (typeof mountOptions === 'boolean') {
                this.mountedOptions.value = mountOptions;
            }
            get(Required.prototype.__proto__ || Object.getPrototypeOf(Required.prototype), 'mount', this).call(this, typeIns);
        }
    }]);
    return Required;
}(Rule);

var defaultHandler$1 = {
    'any': function any(val) {
        return true;
    },
    'array': function array(val) {
        return Array.isArray(val);
    }
};
['string', 'object', 'boolean', 'number'].forEach(function (item) {
    defaultHandler$1[item] = function (val) {
        return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === item;
    };
});

var IsType = function (_Rule) {
    inherits(IsType, _Rule);

    function IsType() {
        classCallCheck(this, IsType);
        return possibleConstructorReturn(this, (IsType.__proto__ || Object.getPrototypeOf(IsType)).call(this, 'isType', function (value, options$$1) {
            var store = getItem(this.typeIns.id);
            return (defaultHandler$1[store.spec.type] || defaultHandler$1['any'])(value, options$$1);
        }, options.rules.isType));
    }

    return IsType;
}(Rule);

var AsyncRule = function (_Rule) {
    inherits(AsyncRule, _Rule);

    function AsyncRule() {
        classCallCheck(this, AsyncRule);
        return possibleConstructorReturn(this, (AsyncRule.__proto__ || Object.getPrototypeOf(AsyncRule)).call(this, 'async', function (value, options$$1, callback) {
            console.log('start AsyncRule');
            setTimeout(function () {
                callback(true);
            }, 3 * 1000);
        }, {
            async: true
        }));
    }

    return AsyncRule;
}(Rule);

var Rules = {
    required: Required,
    isType: IsType,
    'async': AsyncRule
};

var addRule = function addRule(typeIns, ruleName, options$$1) {
    new Rules[ruleName]().mount(typeIns, options$$1);
};

var validate = function validate(typeIns, value, callback) {
    var store = getItem(typeIns.id);
    if (store.spec.async) {
        var result = {
            valid: true,
            label: store.spec.label,
            rules: {},
            message: store.spec.message
        };

        var asyncRules = [];
        Object.keys(store.rules).forEach(function (name) {
            var rule = store.rules[name];
            if (rule.options.async) {
                asyncRules.push(rule);
            } else {
                result.rules[name] = rule.validate(value);
                result.valid = result.valid && result.rules[name].valid;
            }
        });

        var execSize = 0;
        var checkIsEnd = function checkIsEnd() {
            execSize++;
            if (execSize >= asyncRules.length) {
                if (isFunction(callback)) {
                    callback(result);
                }
            }
        };

        asyncRules.forEach(function (rule) {
            rule.validate(value, function (validResult) {
                result.rules[rule.name] = validResult;
                result.valid = result.valid && result.rules[rule.name].valid;
                checkIsEnd();
            });
        });
    } else {
        return validateSync(typeIns, value);
    }
};
var validateSync = function validateSync(typeIns, value) {
    var store = getItem(typeIns.id);
    var result = {
        valid: true,
        label: store.spec.label,
        rules: {},
        message: store.spec.message
    };
    Object.keys(store.rules).forEach(function (name) {
        var rule = store.rules[name];
        result.rules[name] = rule.validate(value);
        result.valid = result.valid && result.rules[name].valid;
    });
    return result;
};

var MAny = function () {
    function MAny() {
        classCallCheck(this, MAny);

        this.id = uniqueID();

        var DATA = {
            spec: {
                name: '',
                type: 'any',
                label: '',
                async: false, // 是否是异步方式验证
                rules: {}
            },
            rules: {}
        };
        setItem(this.id, DATA); // 私有变量，保护功能
        addRule(this, 'isType', {
            value: DATA.spec.type
        });
    }

    createClass(MAny, [{
        key: 'name',
        value: function name(val) {
            getItem(this.id).spec.name = val;
            return this;
        }
    }, {
        key: 'label',
        value: function label(val) {
            getItem(this.id).spec.label = val;
            return this;
        }
    }, {
        key: 'message',
        value: function message(val) {
            getItem(this.id).spec.message = val;
            return this;
        }
    }, {
        key: 'validate',
        value: function validate$$1() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return validate.apply(null, [this].concat(args));
        }
    }]);
    return MAny;
}();

['required', 'async'].forEach(function (ruleName) {
    MAny.prototype[ruleName] = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        addRule.apply(null, [this, ruleName].concat(args));
        return this;
    };
});

var MType = {
    any: MAny
};

var version = "0.1.0";

var MSchema = {
    version: version
};
['any', 'string', 'number', 'object', 'boolean', 'array'].forEach(function (type) {
    MSchema[type] = function () {
        return new MType[type]();
    };
});

return MSchema;

})));
//# sourceMappingURL=index.js.map
