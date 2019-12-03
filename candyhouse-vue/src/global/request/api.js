const PREFIX = "/api";

const API = {
  qiniuToken: `${PREFIX}/qiniu`,
  qiniu_API: "https://upload-z2.qiniup.com",
  login: `${PREFIX}/authLogin`,
  manager: `${PREFIX}/manager`,
  managerItem: id => `${PREFIX}/manager/${id}`,
  category: `${PREFIX}/category`,
  categoryItem: id => `${PREFIX}/category/${id}`
};

export default API;
