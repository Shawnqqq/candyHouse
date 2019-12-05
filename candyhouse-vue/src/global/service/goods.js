import request from "@/global/request/axios";
import API from "@/global/request/api";

const goods = {
  list: function(params) {
    return request.get(API.goods, params);
  },
  insert: function(params) {
    return request.post(API.goods, params);
  }
  // update: function(id, params) {
  //   return request.put(API.goodsItem(id), params);
  // },
  // delete: function(id) {
  //   return request.delete(API.goodsItem(id));
  // }
};

export default goods;
