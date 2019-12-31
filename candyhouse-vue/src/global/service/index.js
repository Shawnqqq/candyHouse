import request from "@/global/request/axios";
import API from "@/global/request/api";

const index = {
  list: function() {
    return request.get(API.index);
  }
};

export default index;