import request from "@/global/request/axios";
import API from "@/global/request/api";

const poster = {
  list: function() {
    return request.get(API.poster);
  },
  insert: function(params) {
    return request.post(API.poster, params);
  },
  delete: function(id) {
    return request.delete(API.posterItem(id));
  }
};

export default poster;
