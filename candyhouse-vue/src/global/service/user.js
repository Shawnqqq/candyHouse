import request from "@/global/request/axios";
import API from "@/global/request/api";

const user = {
  list: function(params) {
    return request.get(API.user, params);
  },
  update: function(id){
    return request.put(API.userItem(id))
  },
  single: function(id) {
    return request.get(API.userItem(id));
  }
};

export default user;