const Base = require('./base')

class goodsModels extends Base {
    constructor(props = 'goods'){
        super(props);
    }
}


module.exports = new goodsModels();