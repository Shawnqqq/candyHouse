const Base = require('./base')

class skuModels extends Base {
    constructor(props = 'sku'){
        super(props);
    }
}


module.exports = new skuModels();