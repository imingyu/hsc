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
var isFunction$1 = function isFunction(obj) {
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
        },
        max: {
            label: '最大值',
            message: {
                any: '{ruleLabel}为{ruleValue}',
                string: '长度{ruleLabel}为{ruleValue}'
            }
        },
        min: {
            label: '最小值',
            message: {
                any: '{ruleLabel}为{ruleValue}',
                string: '长度{ruleLabel}为{ruleValue}'
            }
        },
        isType: {
            message: '值类型必须为{ruleValue}'
        },
        email: {
            label: 'Email',
            message: '值必须为{ruleLabel}格式'
        }
    },
    regexes: {
        affirmative: /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/,
        alphaNumeric: /^[A-Za-z0-9]+$/,
        caPostalCode: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\s?[0-9][A-Z][0-9]$/,
        creditCard: /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
        dateString: /^(1[0-2]|0?[1-9])([\/-])(3[01]|[12][0-9]|0?[1-9])(?:\2)(?:[0-9]{2})?[0-9]{2}$/,
        email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i, // eslint-disable-line no-control-regex
        eppPhone: /^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/,
        hexadecimal: /^(?:0x)?[0-9a-fA-F]+$/,
        hex: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
        ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
        ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
        nanpPhone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        socialSecurityNumber: /^(?!000|666)[0-8][0-9]{2}-?(?!00)[0-9]{2}-?(?!0000)[0-9]{4}$/,
        time: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
        ukPostCode: /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/,
        url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,
        usZipCode: /^[0-9]{5}(?:-[0-9]{4})?$/
    }
};

var getValidResult = function getValidResult(validResult, message, computedOptions) {
    if (typeof validResult === 'boolean') {
        return {
            valid: validResult,
            message: !validResult ? message : '',
            options: computedOptions
        };
    } else if ((typeof validResult === 'undefined' ? 'undefined' : _typeof(validResult)) === 'object') {
        validResult.message = validResult.message || (!validResult.valid ? message : '');
        validResult.options = computedOptions;
        return validResult;
    } else {
        console.error('验证规则返回值无效！');
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
        value: function mount(typeIns, mountOptions) {
            this.typeIns = typeIns;
            if (isObject(mountOptions) && !isEmptyObject(mountOptions)) {
                extend(true, this.mountedOptions, mountOptions);
            } else {
                this.mountedOptions.value = mountOptions;
            }
            var store = getItem(typeIns.id);
            var options = this.computeOptions();
            if (options.async) {
                store.spec.async = true;
            }
            store.rules[this.name] = this;
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
                ruleValue: this.mountedOptions.value,
                ruleLabel: computedOptions.label
            };
            if (isObject(message)) {
                message = message[store.spec.type] ? message[store.spec.type] : message['any'];
            }
            if (isFunction$1(message)) {
                message = message(messageValues);
            } else if (typeof message === 'string') {
                message = formatString(message + '', messageValues);
            }
            message = message ? message : '';

            if (computedOptions.async) {
                this.handler.call(this, value, computedOptions, function (validResult) {
                    var result = getValidResult(validResult, message, computedOptions);
                    if (isFunction$1(callback)) {
                        callback(result);
                    }
                });
            } else {
                return getValidResult(this.handler.call(this, value, computedOptions), message, computedOptions);
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
        return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && val !== null && !isEmptyObject(val);
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
        return possibleConstructorReturn(this, (Required.__proto__ || Object.getPrototypeOf(Required)).call(this, 'required', function (value, options$$1) {
            var store = getItem(this.typeIns.id);
            var result = (defaultHandler[store.spec.type] || defaultHandler['any'])(value, options$$1);
            if (options$$1.value) {
                return result;
            } else {
                return true;
            }
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
            setTimeout(function () {
                callback(true);
            }, 3 * 1000);
        }, {
            async: true
        }));
    }

    return AsyncRule;
}(Rule);

var defaultHandler$2 = {
    'any': function any(target, limit) {
        return true;
    },
    'array': function array(target, limit) {
        return target && target.length >= limit ? true : false;
    },
    'string': function string(target, limit) {
        return target && target.length >= limit ? true : false;
    },
    'number': function number(target, limit) {
        if (typeof target === 'number') {
            return target >= limit;
        }
        if (typeof target === 'string') {
            return isNaN(target) ? false : target >= limit;
        }
        if (target && target.valueOf) {
            return target.valueOf() >= limit;
        }
        return false;
    }
};

var Min = function (_Rule) {
    inherits(Min, _Rule);

    function Min() {
        classCallCheck(this, Min);
        return possibleConstructorReturn(this, (Min.__proto__ || Object.getPrototypeOf(Min)).call(this, 'min', function (value, options$$1) {
            var store = getItem(this.typeIns.id);
            return (defaultHandler$2[store.spec.type] || defaultHandler$2['any'])(value, options$$1.value, options$$1);
        }, options.rules.min));
    }

    createClass(Min, [{
        key: 'mount',
        value: function mount(typeIns, mountOptions) {
            if (isObject(mountOptions) && !isEmptyObject(mountOptions)) {
                extend(true, this.mountedOptions, mountOptions);
            } else if (typeof mountOptions === 'number') {
                this.mountedOptions.value = mountOptions;
            }
            get(Min.prototype.__proto__ || Object.getPrototypeOf(Min.prototype), 'mount', this).call(this, typeIns);
        }
    }]);
    return Min;
}(Rule);

var defaultHandler$3 = {
    'any': function any(target, limit) {
        return true;
    },
    'array': function array(target, limit) {
        return !target || target && target.length <= limit ? true : false;
    },
    'string': function string(target, limit) {
        return !target || target && target.length <= limit ? true : false;
    },
    'number': function number(target, limit) {
        if (typeof target === 'number') {
            return target <= limit;
        }
        if (typeof target === 'string') {
            return target === '' || target.trim() === '' || isNaN(target) ? false : target <= limit;
        }
        if (target && target.valueOf) {
            return target.valueOf() <= limit;
        }
        return false;
    }
};

var Max = function (_Rule) {
    inherits(Max, _Rule);

    function Max() {
        classCallCheck(this, Max);
        return possibleConstructorReturn(this, (Max.__proto__ || Object.getPrototypeOf(Max)).call(this, 'max', function (value, options$$1) {
            var store = getItem(this.typeIns.id);
            return (defaultHandler$3[store.spec.type] || defaultHandler$3['any'])(value, options$$1.value, options$$1);
        }, options.rules.max));
    }

    createClass(Max, [{
        key: 'mount',
        value: function mount(typeIns, mountOptions) {
            if (isObject(mountOptions) && !isEmptyObject(mountOptions)) {
                extend(true, this.mountedOptions, mountOptions);
            } else if (typeof mountOptions === 'number') {
                this.mountedOptions.value = mountOptions;
            }
            get(Max.prototype.__proto__ || Object.getPrototypeOf(Max.prototype), 'mount', this).call(this, typeIns);
        }
    }]);
    return Max;
}(Rule);

var rules = {};
Object.keys(options.regexes).forEach(function (item) {
    var RegexRule = function (_Rule) {
        inherits(RegexRule, _Rule);

        function RegexRule() {
            classCallCheck(this, RegexRule);
            return possibleConstructorReturn(this, (RegexRule.__proto__ || Object.getPrototypeOf(RegexRule)).call(this, item, function (value, options$$1) {
                return typeof value === 'string' && options.regexes[item].test(value);
            }, options.rules[item]));
        }

        return RegexRule;
    }(Rule);

    rules[item] = RegexRule;
});

var Ip = function (_Rule2) {
    inherits(Ip, _Rule2);

    function Ip() {
        classCallCheck(this, Ip);
        return possibleConstructorReturn(this, (Ip.__proto__ || Object.getPrototypeOf(Ip)).call(this, 'ip', function (value, options$$1) {
            return typeof value === 'string' && (options.regexes.ipv4.test(value) || options.regexes.ipv6.test(value));
        }, options.rules.ip));
    }

    return Ip;
}(Rule);

rules.ip = Ip;

var Rules = {
    required: Required,
    isType: IsType,
    'async': AsyncRule,
    min: Min,
    max: Max
};
Object.keys(rules).forEach(function (item) {
    Rules[item] = rules[item];
});

var registerRule = function registerRule(mtype, rules) {
    rules.forEach(function (ruleName) {
        if (Rules[ruleName]) {
            mtype.prototype[ruleName] = function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                mountRule.apply(null, [this, ruleName].concat(args));
                return this;
            };
        }
    });
};

var mountRule = function mountRule(typeIns, ruleName, options$$1) {
    new Rules[ruleName]().mount(typeIns, options$$1);
};

var changeType = function changeType(typeIns, type) {
    getItem(typeIns.id).spec.type = type;
    mountRule(typeIns, 'isType', {
        value: type
    });
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
                if (isFunction$1(callback)) {
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
        name: store.spec.name,
        label: store.spec.label,
        rules: {}
    };
    Object.keys(store.rules).forEach(function (name) {
        var rule = store.rules[name];
        result.rules[name] = rule.validate(value);
        result.valid = result.valid && result.rules[name].valid;
    });
    return result;
};

var mergeTypes = function mergeTypes() {
    for (var _len2 = arguments.length, types = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        types[_key2] = arguments[_key2];
    }

    var result;
    types.forEach(function (type) {});
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
                async: false // 是否是异步方式验证
            },
            rules: {} //保存rule实例
        };
        setItem(this.id, DATA); // 私有变量，保护功能
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
        key: 'merge',
        value: function merge() {
            for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
                types[_key] = arguments[_key];
            }

            //合并类型：后面传递的的配置项的值会覆盖签名相同配置项的值
            mergeTypes.apply(null, [this].concat(types));
        }
    }, {
        key: 'validate',
        value: function validate$$1() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            return validate.apply(null, [this].concat(args));
        }
    }]);
    return MAny;
}();

registerRule(MAny, ['required', 'async']);

var MNumber = function (_MAny) {
    inherits(MNumber, _MAny);

    function MNumber() {
        classCallCheck(this, MNumber);

        var _this = possibleConstructorReturn(this, (MNumber.__proto__ || Object.getPrototypeOf(MNumber)).call(this));

        changeType(_this, 'number');
        return _this;
    }

    return MNumber;
}(MAny);

registerRule(MNumber, ['min', 'max']);

var MString = function (_MAny) {
    inherits(MString, _MAny);

    function MString() {
        classCallCheck(this, MString);

        var _this = possibleConstructorReturn(this, (MString.__proto__ || Object.getPrototypeOf(MString)).call(this));

        changeType(_this, 'string');
        return _this;
    }

    return MString;
}(MAny);

registerRule(MString, ['min', 'max', 'email', 'hex', 'ipv4', 'ipv6', 'ip', 'url', 'time']);

var MKeys = function (_MAny) {
    inherits(MKeys, _MAny);

    function MKeys() {
        classCallCheck(this, MKeys);

        var _this = possibleConstructorReturn(this, (MKeys.__proto__ || Object.getPrototypeOf(MKeys)).call(this));

        changeType(_this, 'object');
        return _this;
    }

    createClass(MKeys, [{
        key: 'keys',
        value: function keys(obj) {
            var store = getItem(this.id);
            store.keys = store.keys || {}; //保存key实例，每个key实例其实就是一个MAny的子类实例
            for (var prop in obj) {
                if (obj[prop] instanceof MAny) {
                    if (store.keys[prop]) {
                        store.keys[prop].merge(obj[prop]);
                    } else {
                        store.keys[prop] = obj[prop];
                    }
                    var item = store.keys[prop];
                    store.spec.async = getItem(item.id).spec.async; //同步异步性
                }
            }
            return this;
        }
    }, {
        key: 'validate',
        value: function validate$$1(value, callback) {
            var store = getItem(this.id);
            if (store.spec.async) {
                validate(this, value, function (validResult) {
                    validResult.keys = {};

                    var keyTypes = Object.keys(store.keys).map(function (item) {
                        return store.keys[item];
                    });

                    var execSize = 0;
                    var checkIsEnd = function checkIsEnd() {
                        execSize++;
                        if (execSize >= keyTypes.length) {
                            if (isFunction(callback)) {
                                callback(validResult);
                            }
                        }
                    };
                    keyTypes.forEach(function (item) {
                        item.validate(value[key], function (result) {
                            validResult.keys[key] = result;
                            validResult.valid = validResult.valid && validResult.keys[key].valid;
                            checkIsEnd();
                        });
                    });
                });
            } else {
                var validResult = validate(this, value);
                validResult.keys = {};
                for (var _key in store.keys) {
                    validResult.keys[_key] = store.keys[_key].validate(value[_key]);
                    validResult.valid = validResult.valid && validResult.keys[_key].valid;
                }
                return validResult;
            }
        }
    }]);
    return MKeys;
}(MAny);

registerRule(MKeys, []);

var MObject = function (_MKeys) {
    inherits(MObject, _MKeys);

    function MObject() {
        classCallCheck(this, MObject);
        return possibleConstructorReturn(this, (MObject.__proto__ || Object.getPrototypeOf(MObject)).call(this));
    }

    return MObject;
}(MKeys);

var MType = {
    any: MAny,
    number: MNumber,
    string: MString,
    object: MObject
};

var version = "0.1.0";

var MSchema = {
    version: version,
    validate: function validate(value, schema, callback) {
        if (schema) {
            return schema.validate(value, callback);
        } else {
            return true;
        }
    }
};
['any', 'string', 'number', 'object', 'boolean', 'array'].forEach(function (type) {
    if (MType[type]) {
        MSchema[type] = function () {
            return new MType[type]();
        };
    }
});

return MSchema;

})));
//# sourceMappingURL=index.js.map
