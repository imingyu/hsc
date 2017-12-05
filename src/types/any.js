export default class HAny {
    constructor() {
        this.spec = {
            type: 'any'
        }
    }
    label(val) {
        this.spec.label = val;
    }
}