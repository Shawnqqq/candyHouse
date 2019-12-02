import request from "@/global/request/axios";
import API from "@/global/request/api";

const manager = {
  list: function() {
    return request.get(API.manager);
  },
  insert: function(params){
    return request.post(API.managerItem,params)
  },
  update: function(id,params){
    return request.put(API.managerItem(id),params)
  },
  delete: function(id){
    return request.delete(API.managerItem(id))
  }
};

export default manager;