import request from "@/global/request/axios";
import API from "@/global/request/api";

const pathOptions = {
  list: function() {
    return request.get(API.pathOptions);
  }
};

export default pathOptions;
