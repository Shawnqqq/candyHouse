import request from "@/global/request/axios";
import API from "@/global/request/api";

const order = {
  list: function(params) {
    return request.get(API.order, params);
  },
  delete: function(id) {
    return request.delete(API.orderItem(id));
  },
  single: function(id) {
    return request.get(API.orderItem(id));
  }
};

export default order;
