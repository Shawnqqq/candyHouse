const login = () => import(/* webpackChunkName: "Login" */ "@/views/Login"); //登录页
const Dashboard = () =>
  import(/* webpackChunkName: "Dashboard" */ "@/views/Dashboard"); //概览页
const Manager = () =>
  import(/* webpackChunkName: "Manager" */ "@/views/Manager"); //管理员
const ManagerEdit = () =>
  import(/* webpackChunkName: "Manager" */ "@/views/ManagerEdit");
const ManagerCreate = () =>
  import(/* webpackChunkName: "Manager" */ "@/views/ManagerCreate");
const Index = () => import(/* webpackChunkName: "Index" */ "@/views/Index"); //首页管理
const LandingCreate = () =>
  import(/* webpackChunkName: "Index" */ "@/views/LandingCreate");
const LandingSingle = () =>
  import(/* webpackChunkName: "Index" */ "@/views/LandingSingle");
const Banner = () => import(/* webpackChunkName: "Index" */ "@/views/Banner");
const BannerCreate = () =>
  import(/* webpackChunkName: "Index" */ "@/views/BannerCreate");
const Poster = () => import(/* webpackChunkName: "Index" */ "@/views/Poster");
const PosterCreate = () =>
  import(/* webpackChunkName: "Index" */ "@/views/PosterCreate");
const Classify = () =>
  import(/* webpackChunkName: "Index" */ "@/views/Classify");
const ClassifyCreate = () =>
  import(/* webpackChunkName: "Index" */ "@/views/ClassifyCreate");
const ClassifyEdit = () =>
  import(/* webpackChunkName: "Index" */ "@/views/ClassifyEdit");
const Column = () => import(/* webpackChunkName: "Index" */ "@/views/Column");
const ColumnCreate = () =>
  import(/* webpackChunkName: "Index" */ "@/views/ColumnCreate");
const ColumnSingle = () =>
  import(/* webpackChunkName: "Index" */ "@/views/ColumnSingle");
const Goods = () => import(/* webpackChunkName: "Goods" */ "@/views/Goods"); //商品管理
const Category = () =>
  import(/* webpackChunkName: "Goods" */ "@/views/Category");
const GoodsSingle = () =>
  import(/* webpackChunkName: "Goods" */ "@/views/GoodsSingle");
const Recommend = () =>
  import(/* webpackChunkName: "Goods" */ "@/views/Recommend");
const GoodsCreate = () =>
  import(/* webpackChunkName: "Goods" */ "@/views/GoodsCreate");

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
        path: "/admin/index",
        name: "indexRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "index" },
        meta: {
          nav: {
            icon: "el-icon-monitor",
            title: "首页管理"
          },
          breadcrumb: {
            title: "首页管理"
          }
        },
        children: [
          {
            path: "/admin/index",
            name: "index",
            component: { render: h => h("router-view") },
            meta: {
              nav: {
                icon: "el-icon-star-off",
                title: "活动页管理"
              },
              breadcrumb: {
                title: "活动页管理"
              }
            },
            children: [
              {
                path: "/admin/index",
                name: "index",
                component: Index
              },
              {
                path: "/admin/landingCreate",
                name: "landingCreate",
                component: LandingCreate,
                meta: {
                  breadcrumb: {
                    title: "活动页添加"
                  }
                }
              },
              {
                path: "/admin/landingSingle",
                name: "landingSingle",
                component: LandingSingle,
                meta: {
                  breadcrumb: {
                    title: "活动页详情"
                  }
                }
              }
            ]
          },
          {
            path: "/admin/banner",
            name: "banner",
            component: { render: h => h("router-view") },
            meta: {
              nav: {
                icon: "el-icon-c-scale-to-original",
                title: "轮播图管理"
              },
              breadcrumb: {
                title: "轮播图管理"
              }
            },
            children: [
              {
                path: "/admin/banner",
                name: "banner",
                component: Banner
              },
              {
                path: "/admin/bannerCreate",
                name: "bannerCreate",
                component: BannerCreate,
                meta: {
                  breadcrumb: {
                    title: "轮播图添加"
                  }
                }
              }
            ]
          },
          {
            path: "/admin/poster",
            name: "poster",
            component: { render: h => h("router-view") },
            meta: {
              nav: {
                icon: "el-icon-picture-outline",
                title: "海报页管理"
              },
              breadcrumb: {
                title: "海报页管理"
              }
            },
            children: [
              {
                path: "/admin/poster",
                name: "poster",
                component: Poster
              },
              {
                path: "/admin/posterCreate",
                name: "posterCreate",
                component: PosterCreate,
                meta: {
                  breadcrumb: {
                    title: "海报页添加"
                  }
                }
              }
            ]
          },
          {
            path: "/admin/classify",
            name: "classify",
            component: { render: h => h("router-view") },
            meta: {
              nav: {
                icon: "el-icon-menu",
                title: "分类推荐管理"
              },
              breadcrumb: {
                title: "分类推荐管理"
              }
            },
            children: [
              {
                path: "/admin/classify",
                name: "classify",
                component: Classify
              },
              {
                path: "/admin/classifyCreate",
                name: "classifyCreate",
                component: ClassifyCreate,
                meta: {
                  breadcrumb: {
                    title: "分类推荐添加"
                  }
                }
              },
              {
                path: "/admin/classifyEdit",
                name: "classifyEdit",
                component: ClassifyEdit,
                meta: {
                  breadcrumb: {
                    title: "分类推荐修改"
                  }
                }
              }
            ]
          },
          {
            path: "/admin/column",
            name: "column",
            component: { render: h => h("router-view") },
            meta: {
              nav: {
                icon: "el-icon-files",
                title: "合辑推荐管理"
              },
              breadcrumb: {
                title: "合辑推荐管理"
              }
            },
            children: [
              {
                path: "/admin/column",
                name: "column",
                component: Column
              },
              {
                path: "/admin/columnCreate",
                name: "columnCreate",
                component: ColumnCreate,
                meta: {
                  breadcrumb: {
                    title: "合辑推荐添加"
                  }
                }
              },
              {
                path: "/admin/columnSingle",
                name: "columnSingle",
                component: ColumnSingle,
                meta: {
                  breadcrumb: {
                    title: "合辑推荐修改"
                  }
                }
              }
            ]
          }
        ]
      },
      {
        path: "/admin/goods",
        name: "goodsRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "goods" },
        meta: {
          nav: {
            icon: "el-icon-goods",
            title: "商品管理"
          },
          breadcrumb: {
            title: "商品管理"
          }
        },
        children: [
          {
            path: "/admin/goods",
            name: "goods",
            component: Goods,
            meta: {
              nav: {
                icon: "el-icon-shopping-bag-1",
                title: "商品列表"
              },
              breadcrumb: {
                title: "商品列表"
              }
            }
          },
          {
            path: "/admin/goodsSingle",
            name: "goodsSingle",
            component: GoodsSingle,
            meta: {
              breadcrumb: {
                title: "商品详情"
              }
            }
          },
          {
            path: "/admin/recommend",
            name: "recommend",
            component: Recommend,
            meta: {
              nav: {
                icon: "el-icon-sell",
                title: "商品推荐"
              },
              breadcrumb: {
                title: "商品推荐"
              }
            }
          },
          {
            path: "/admin/category",
            name: "category",
            component: Category,
            meta: {
              nav: {
                icon: "el-icon-s-grid",
                title: "商品分类"
              },
              breadcrumb: {
                title: "商品分类"
              }
            }
          },
          {
            path: "/admin/goodsCreate",
            name: "goodsCreate",
            component: GoodsCreate,
            meta: {
              nav: {
                icon: "el-icon-circle-plus-outline",
                title: "商品添加"
              },
              breadcrumb: {
                title: "商品添加"
              }
            }
          }
        ]
      },
      {
        path: "/admin/manager",
        name: "managerRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "manager" },
        meta: {
          nav: {
            icon: "el-icon-s-custom",
            title: "管理员"
          },
          breadcrumb: {
            title: "管理员"
          }
        },
        children: [
          {
            path: "/admin/manager",
            name: "manager",
            component: Manager
          },
          {
            path: "/admin/managerEdit",
            name: "managerEdit",
            component: ManagerEdit,
            meta: {
              breadcrumb: {
                title: "管理员修改"
              }
            }
          },
          {
            path: "/admin/managerCreate",
            name: "managerCreate",
            component: ManagerCreate,
            meta: {
              breadcrumb: {
                title: "运营添加"
              }
            }
          }
        ]
      }
    ]
  }
];
