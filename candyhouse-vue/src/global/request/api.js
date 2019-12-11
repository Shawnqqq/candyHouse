const PREFIX = "/api";

const API = {
  qiniuToken: `${PREFIX}/qiniu`,
  qiniu_API: "https://upload-z2.qiniup.com",
  login: `${PREFIX}/authLogin`,
  manager: `${PREFIX}/manager`,
  managerItem: id => `${PREFIX}/manager/${id}`,
  category: `${PREFIX}/category`,
  categoryItem: id => `${PREFIX}/category/${id}`,
  goods: `${PREFIX}/goods`,
  goodsItem: id => `${PREFIX}/goods/${id}`,
  goodsSoldOutItem: id => `${PREFIX}/goods/soldOut/${id}`,
  goodsSoldItem: id => `${PREFIX}/goods/sold/${id}`,
  recommend: `${PREFIX}/recommend`,
  landing: `${PREFIX}/landing`,
  landingItem: id => `${PREFIX}/landing/${id}`,
  landingGoods: id => `${PREFIX}/landingGoods/${id}`
};

export default API;
