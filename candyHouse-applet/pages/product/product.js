Page({
  data: {
    show:false,
    current:1,
    editor: "<p><img src='https://jdimage.300hu.com/vodtransgzp1251412368/7447398155594455924/1524309527_2929062424.100_0.jpg'><p><img                  src='https://img10.360buyimg.com/imgzone/jfs/t11773/208/2584217843/383223/e328f5ec/5a939e11N5c8bf027.jpg!q70.dpg.webp'></p><p><img src='https://img11.360buyimg.com/imgzone/jfs/t1/5780/20/6560/479708/5ba300f5Eccdb41c1/b0b0af4336663603.png!q70.webp'></p><p><img src='https://img30.360buyimg.com/imgzone/jfs/t1/700/21/6775/497958/5ba300f5E62381870/290c8f4970428e69.png!q70.webp'></p>",
    sku: [{ name: "六种鱼猫粮/1KG", img: "https://m.360buyimg.com/mobilecms/s1215x1215_jfs/t1/10502/6/12920/109545/5c7e4e17Eb146970b/5ca65a38d2b0ee80.jpg!q70.dpg.webp", price: "190", stock:"3133"},
      { name: "六种鱼猫粮/1.8KG", img: "https://m.360buyimg.com/mobilecms/s1215x1215_jfs/t1/22972/32/9301/103268/5c7e4e18E766da050/f7ccb207c7be9757.jpg!q70.dpg.webp", price: "330", stock: "4123"},
      { name: "六种鱼猫粮/5.4KG", img: "https://m.360buyimg.com/mobilecms/s1215x1215_jfs/t1/72000/12/14783/488093/5dc2b544Ed3ffb19d/18e0847b30f3601e.png.webp", price: "760", 
stock: "1123"},
      { name: "全猫猫粮/1KG(鸡肉)", img: "https://m.360buyimg.com/mobilecms/s1215x1215_jfs/t1/30526/26/4605/160922/5c7e4e17E36834789/fa8b0bd135fc4617.jpg!q70.dpg.webp",price:"170",stock: "7133"},
      { name: "全猫猫粮/1.8KG(鸡肉)", img: "https://m.360buyimg.com/mobilecms/s1215x1215_jfs/t1/16196/15/9381/134493/5c7e4e15E47c2ad37/3c57e0b7fdaab8bf.jpg!q70.dpg.webp",price:"269",stock: "12133"},
      { name: "全猫猫粮/5.4KG(鸡肉)", img: "https://m.360buyimg.com/mobilecms/s1215x1215_jfs/t1/105141/27/1609/653806/5dc22efcEae8a8568/5398f6654a927678.png.webp",price:"659",
stock: "8223"}],
    skuIndex:0,
    skuCurrent:{},
    skuNum:1
  },
  onLoad: function (options) {

  },
  onShow(){
    let index = this.data.skuIndex
    this.setData({
      skuCurrent:this.data.sku[index]
    })
  },
  handleSwiper(e){
    let current = e.detail.current+1
    this.setData({
      current
    })
  },
  onEditorReady(){
    wx.createSelectorQuery().select('#product-editor').context(res => {
      res.context.setContents({
        html: this.data.editor
      })
    }).exec()
  },
  sheetClose(){
    this.setData({ show: false });
  },
  sheetShow(){
    this.setData({ show: true });
  },
  changeSKU(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      skuIndex:index
    })
    this.onShow()
  },
  changeNum(e){
    this.setData({
      skuNum: e.detail
    })
  }
})