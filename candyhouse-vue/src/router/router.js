const login = () => import(/* webpackChunkName: "Login" */ "@/views/Login"); //登录页
const Dashboard = () =>
  import(/* webpackChunkName: "Dashboard" */ "@/views/Dashboard"); //概览页
const manager = () =>
  import(/* webpackChunkName: "manager" */ "@/views/manager"); //管理员

import BasicLayout from "@/components/BasicLayout";

export default [
  {
    path: "/",
    component: login,
    name: "login"
  },
  {
    path: "/admin",
    component: BasicLayout,
    name: "admin",
    children: [
      {
        path: "/admin",
        name: "DashboardRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "Dashboard" },
        meta: {
          nav: {
            icon: "el-icon-pie-chart",
            title: "概况"
          },
          breadcrumb: {
            title: "概况"
          }
        },
        children: [
          {
            path: "/admin",
            name: "Dashboard",
            component: Dashboard
          }
        ]
      },
      {
        path:"/admin/manager",
        name:"managerRoot",
        component:{ render:h => h("router-view") },
        redirect:{name: "manager"},
        meta:{
          nav:{
            icon:"el-icon-s-custom",
            title: "管理员"
          },
          breadcrumb:{
            title: "管理员"
          }
        },
        children:[
          {
            path:"/admin/manager",
            name:"manager",
            component:manager
          }
        ]
      }
    ]
  }
];
