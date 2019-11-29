const Base = require('./base')

class addressModels extends Base {
    constructor(props = 'address'){
        super(props);
    }
}


module.exports = new addressModels();