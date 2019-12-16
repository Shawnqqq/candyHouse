import request from "@/global/request/axios";
import API from "@/global/request/api";

const column = {
  list: function() {
    return request.get(API.column);
  },
  insert: function(params) {
    return request.post(API.column, params);
  },
  delete: function(id) {
    return request.delete(API.columnItem(id));
  },
  single: function(id) {
    return request.get(API.columnItem(id));
  },
  update: function(id, params) {
    return request.put(API.columnItem(id), params);
  },
  recommend: function(id, params) {
    return request.post(API.columnGoods(id), params);
  },
  unRecommend: function(id, params) {
    return request.put(API.columnGoods(id), params);
  }
};

export default column;
