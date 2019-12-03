import request from "@/global/request/axios";
import API from "@/global/request/api";

const category = {
  list: function() {
    return request.get(API.category);
  },
  insert: function(params) {
    return request.post(API.category, params);
  },
  update: function(id, params) {
    return request.put(API.categoryItem(id), params);
  },
  delete: function(id) {
    return request.delete(API.categoryItem(id));
  }
};

export default category;
