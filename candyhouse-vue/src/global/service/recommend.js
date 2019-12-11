import request from "@/global/request/axios";
import API from "@/global/request/api";

const recommend = {
  list: function() {
    return request.get(API.recommend);
  },
  insert: function(params) {
    return request.post(API.recommend, params);
  },
  delete: function(params) {
    return request.put(API.recommend, params);
  }
};

export default recommend;
