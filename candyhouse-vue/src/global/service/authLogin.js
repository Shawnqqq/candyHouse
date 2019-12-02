import request from "@/global/request/axios";
import API from "@/global/request/api";

const authLogin = {
  login: function(params) {
    return request.post(API.login, params);
  }
};

export default authLogin;
