import request from "@/global/request/axios";
import API from "@/global/request/api";

const manager = {
  list: function() {
    return request.get(API.manager);
  },
  insert: function(params) {
    return request.post(API.manager, params);
  },
  single: function(id) {
    return request.get(API.managerItem(id));
  },
  update: function(id, params) {
    return request.put(API.managerItem(id), params);
  },
  delete: function(id) {
    return request.delete(API.managerItem(id));
  }
};

export default manager;
