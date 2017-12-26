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
        }
    }
}

export default options;