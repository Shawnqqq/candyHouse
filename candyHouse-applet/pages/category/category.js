Page({
  data: {
    categoryIndex:0,
    catagory: ["推荐", "限量低价", "水果", "酒饮", "乳品", "零食", "肉蛋", "蔬菜", "熟食", "水产", "粮油", "清洁", "美妆", "家居","数码"]
  },
  onLoad: function (options) {

  },
  getData(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      categoryIndex:index
    })
  }
})