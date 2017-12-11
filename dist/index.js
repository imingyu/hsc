(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.mschema = factory());
}(this, (function () { 'use strict';

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

var isObject = function isObject(obj) {
    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
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
            trimString: true,
            message: '此项{ruleLabel}'
        }
    }
};

function createRule(ruleName, ruleHandler, mounthandler) {
    var ruleOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var Rule = function () {
        function Rule() {
            classCallCheck(this, Rule);

            this.name = ruleName;
            this.handler = ruleHandler;
            this.options = ruleOptions;
        }

        createClass(Rule, [{
            key: 'mount',
            value: function mount(typeIns, mountOptions) {
                this.typeIns = typeIns;
                if (ruleOptions.async) {
                    typeIns.spec.async = true;
                }
                if (typeof mounthandler === 'function') {
                    mountOptions = mounthandler.apply(this, [typeIns, mountOptions]);
                }
                if (isObject(mountOptions) && !isEmptyObject(mountOptions)) {
                    this.mountOptions = this.mountOptions || {};
                    extend(true, this.mountOptions, mountOptions);
                }
                if (!typeIns.spec.rules[this.name]) {
                    typeIns.spec.rules[this.name] = true;
                    typeIns.rules.push(this);
                }
            }
        }, {
            key: 'validate',
            value: function validate(value, validateOptions) {
                var computedOptions = this.computeOptions(validateOptions);
                var message = computedOptions.message;
                var messageValues = {
                    value: value,
                    name: this.typeIns.spec.name,
                    label: this.typeIns.spec.label,
                    type: this.typeIns.spec.type,
                    ruleName: this.name,
                    ruleLabel: computedOptions.label
                };
                if (typeof message === 'function') {
                    message = message(messageValues);
                }
                message = message ? formatString(message + '', messageValues) : '';

                var validResult = this.handler.call(this, value, computedOptions);
                if (typeof validResult === 'boolean') {
                    return {
                        valid: validResult,
                        message: message,
                        options: computedOptions
                    };
                } else if ((typeof validResult === 'undefined' ? 'undefined' : _typeof(validResult)) === 'object') {
                    validResult.options = computedOptions;
                    validResult.message = validResult.message || message;
                    return validResult;
                } else {
                    throw new Error('验证规则返回值无效！');
                }
            }
        }, {
            key: 'computeOptions',
            value: function computeOptions() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                return extend.apply(null, [true, {}, this.options, this.mountOptions].concat(args));
            }
        }]);
        return Rule;
    }();

    Rule.displayName = ruleName;
    return Rule;
}

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
    'string': function string(val, trimString) {
        var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
        if (type === 'number' && !isNaN(val)) {
            return true;
        }
        if (type === 'string' && val) {
            if (trimString) {
                return val.trim() !== '';
            } else {
                return true;
            }
        }
        return false;
    }
};
var required = createRule('required', function (value, options$$1) {
    return (defaultHandler[this.typeIns.spec.type] || defaultHandler['any'])(value, options$$1);
}, null, options.rules.required);

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
var isType = createRule('isType', function (value, options$$1) {
    return (defaultHandler$1[this.typeIns.spec.type] || defaultHandler$1['any'])(value, options$$1);
}, false, options.rules.isType);

var Rule = {
    required: required,
    isType: isType
};

var addRule = function addRule(typeIns, ruleName, options$$1) {
    new Rule[ruleName]().mount(typeIns, options$$1);
};

var validate = function validate(typeIns, value) {
    return typeIns.spec.async ? new Promse(function (resolve, reject) {}) : validateSync(typeIns, value);
};
var validateSync = function validateSync(typeIns, value) {
    var result = {
        valid: true,
        label: typeIns.spec.label,
        rules: {},
        message: ''
    };
    typeIns.rules.forEach(function (rule) {
        result.rules[rule.name] = rule.validate(value);
        result.valid = result.valid && result.rules[rule.name].valid;
    });
    return result;
};

var MAny = function () {
    function MAny() {
        classCallCheck(this, MAny);

        this.spec = {
            name: '',
            type: 'any',
            label: '',
            async: false, // 是否是异步方式验证
            rules: {}
        };
        this.rules = [];
        addRule(this, 'isType');
    }

    createClass(MAny, [{
        key: 'name',
        value: function name(val) {
            this.spec.name = val;
        }
    }, {
        key: 'label',
        value: function label(val) {
            this.spec.label = val;
        }
    }, {
        key: 'message',
        value: function message(val) {
            this.spec.message = val;
        }
    }, {
        key: 'validate',
        value: function validate$$1(value) {
            return validate(this, value);
        }
    }]);
    return MAny;
}();

['required'].forEach(function (ruleName) {
    MAny.prototype[ruleName] = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
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
