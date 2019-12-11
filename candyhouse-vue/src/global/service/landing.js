import request from "@/global/request/axios";
import API from "@/global/request/api";

const landing = {
  list: function() {
    return request.get(API.landing);
  },
  insert: function(params) {
    return request.post(API.landing, params);
  },
  update: function(id, params) {
    return request.put(API.landingItem(id), params);
  },
  single: function(id) {
    return request.get(API.landingItem(id));
  },
  recommend: function(id, params) {
    return request.post(API.landingGoods(id), params);
  },
  unRecommend: function(id, params) {
    return request.put(API.landingGoods(id), params);
  },
  deleted: function(id) {
    return request.delete(API.landingItem(id));
  }
};

export default landing;
