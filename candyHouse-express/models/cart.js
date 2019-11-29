const Base = require('./base')

class cartModels extends Base {
    constructor(props = 'cart'){
        super(props);
    }
}


module.exports = new cartModels();