const Hsc = require('hschema')

const User = Hsc.object().label('用户').keys({
    username: Hsc.string().label('用户名').required().min(6).max(12),
    password: Hsc.string().label('密码').required().min(8).max(12),
    gender: Hsc.number().label('密码').required().int().range([1, 0]),
    enabled: Hsc.boolean().label('是否启用').required().message('请选择是否启用选项'),
    address: Hsc.array().label('地址').item(Hsc.string().max(500)).required(val => {
        return val && val.length > 0
    })
})