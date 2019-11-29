const Base = require('./base')

class orderModels extends Base {
    constructor(props = 'order'){
        super(props);
    }
}


module.exports = new orderModels();