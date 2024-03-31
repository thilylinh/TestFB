import Vue from "vue";
import VueRouter from "vue-router";
import AuthGuard from "./utils/auth.guard";
import {adminRoot} from "./constants/config";

Vue.use(VueRouter);

const routes = [
  {
    path: adminRoot,
    component: () => import(/* webpackChunkName: "app" */ "./views/app"),
    // redirect: `${adminRoot}/dashboards`,
    redirect: `${adminRoot}/news-content-manager/news-content`,
    meta: {loginRequired: true},
    children: [
      {
        path: "dashboards",
        component: () =>
          import(/* webpackChunkName: "dashboards" */ "./views/app/dashboards"),
        redirect: `${adminRoot}/dashboards/default`,
        // meta: { roles: [UserRole.Admin, UserRole.Editor] },
        meta: {
          title: "ABCAkafhkjdf"
        },
        children: [
          {
            path: "default",
            name: "dashboard-default",
            component: () =>
              import(
                /* webpackChunkName: "dashboards" */ "./views/app/dashboards/Default"
                )
            // meta: { roles: [UserRole.Admin] },
          },
        ]
      },
      {
        path: "news-content-manager",
        component: () =>
          import(/* webpackChunkName: "news-content-manager" */ "./views/app/news-content-manager"),
        redirect: `${adminRoot}/news-content-manager/news-group-type`,
        children: [
          {
            path: "news-group-type",
            name: "news-content-manager-news-group-type",
            component: () =>
              import(
                /* webpackChunkName: "news-content-manager" */ "./views/app/news-content-manager/page/newsGroupType"
                )
          },
          {
            path: "news-group",
            name: "news-content-manager-news-group",
            component: () =>
              import(
                /* webpackChunkName: "news-content-manager" */ "./views/app/news-content-manager/page/newsGroup"
                )
          },
          {
            path: "news-seo-keyword",
            name: "news-content-manager-news-seo-keyword",
            component: () =>
              import(
                /* webpackChunkName: "news-content-manager" */ "./views/app/news-content-manager/page/newsSeoKeyWord")
          },
          {
            path: "news-content",
            name: "news-content-manager-news-content",
            component: () =>
              import(
                /* webpackChunkName: "news-content-manager" */ "./views/app/news-content-manager/page/newsContent"
                )
          },
          {
            path: "news-content/:id",
            name: "news-content-manager-news-content-event",
            component: () =>
              import(
                /* webpackChunkName: "news-content-manager" */ "./views/app/news-content-manager/event/newsContentEvent"
                )
          },
          {
            path: "time-auto-pst",
            name: "news-content-manager-time-auto-pst",
            component: () =>
                import(
                    /* webpackChunkName: "news-content-manager" */ "./views/app/news-content-manager/page/newsContentAutoPost.vue"
                    )
          },
          {
            path: "user-view",
            name: "news-content-manager-time-auto-pst",
            component: () =>
                import(
                    /* webpackChunkName: "news-content-manager" */ "./views/app/news-content-manager/page/statisticView.vue"
                    )
          },
          // {
          //   path: "news-recruitment",
          //   name: "news-content-manager-news-recruitment",
          //   component: () =>
          //       import(
          //           /* webpackChunkName: "news-content-manager" */ "./views/app/news-content-manager/page/newsRecruitment.vue"
          //           )
          // },
          // {
          //   path: "news-recruitment/:id",
          //   name: "news-content-manager-news-recruitment-event",
          //   component: () =>
          //       import(
          //           /* webpackChunkName: "news-content-manager" */ "./views/app/news-content-manager/event/newsRecruitmentEvent.vue"
          //           )
          // },
          // {
          //   path: "news-recruitment-quote",
          //   name: "news-content-manager-news-recruitment-quote",
          //   component: () =>
          //       import(
          //           /* webpackChunkName: "news-content-manager" */ "./views/app/news-content-manager/page/newsRecruitmentQuote.vue"
          //           )
          // },
          // {
          //   path: "news-recruitment-quote/:id",
          //   name: "news-content-manager-news-recruitment-event-quote",
          //   component: () =>
          //       import(
          //           /* webpackChunkName: "news-content-manager" */ "./views/app/news-content-manager/event/newsRecruitmentQuoteEvent.vue"
          //           )
          // },
          {
            path: "news-via",
            name: "news-content-manager-news-via",
            component: () =>
              import(
                /* webpackChunkName: "news-content-manager" */ "./views/app/news-content-manager/page/newsVia.vue"
                )
          },
          {
            path: "news-github",
            name: "news-content-manager-news-github",
            component: () =>
              import(
                /* webpackChunkName: "news-content-manager" */ "./views/app/news-content-manager/page/newsGithub.vue"
                )
          },
          {
            path: "news-vercel",
            name: "news-content-manager-news-vercel",
            component: () =>
              import(
                /* webpackChunkName: "news-content-manager" */ "./views/app/news-content-manager/page/newsVercel.vue"
                )
          },
          {
            path: "news-domain",
            name: "news-content-manager-news-domain",
            component: () =>
              import(
                /* webpackChunkName: "news-content-manager" */ "./views/app/news-content-manager/page/newsDomain.vue"
                )
          },
        ]
      },
      {
        path: "system-manager",
        component: () =>
          import(
            /* webpackChunkName: "system-manager" */ "./views/app/system-manager"
            ),
        redirect: `${adminRoot}/system-manager/menu-function-manager`,
        children: [
          {
            path: "authority-manager",
            name: "authority-manager",
            component: () =>
              import(
                /* webpackChunkName: "system-manager" */ "./views/app/system-manager/page/authority-manager/authorityManager.vue"
                )
          },
          {
            path: "user-manager",
            name: "user-manager",
            component: () =>
              import(
                /* webpackChunkName: "system-manager" */ "./views/app/system-manager/page/userManager"
                )
          },
          {
            path: "user-type-manager",
            name: "user-type-manager",
            component: () =>
              import(
                /* webpackChunkName: "system-manager" */ "./views/app/system-manager/page/userTypeManager"
                )
          },
          {
            path: "minus-word",
            name: "minus-word",
            component: () =>
              import(
                /* webpackChunkName: "system-manager" */ "./views/app/study-manager/page/minusWord.vue"
                )
          },
          {
            path: "user-tracing-manager",
            name: "user-tracing-manager",
            component: () =>
              import(
                /* webpackChunkName: "system-manager" */ "./views/app/system-manager/page/UserTracingManager"
                )
          },
        ]
      },
      {
        path: "account-manager",
        component: () =>
          import(
            /* webpackChunkName: "account-manager" */ "./views/app/account-manager"
            ),
        redirect: `${adminRoot}/account-manager/account-info`,
        children: [
          {
            path: "account-info",
            name: "account-info",
            component: () =>
              import(
                /* webpackChunkName: "account-manager" */ "./views/app/account-manager/page/accountInfo"
                )
          }
        ]
      },
      {
        path: "link/:id",
        name: "link",
        component: () =>
          import(/* webpackChunkName: "company-manager" */ "./views/app/news-content-manager/event/linkEvent.vue"),
      },
    ]
  },
  {
    path: "/error",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  },
  {
    path: "/unauthorized",
    name: "unauthorized",
    component: () =>
      import(/* webpackChunkName: "error" */ "./views/Unauthorized")
  },
  {
    path: "/user",
    component: () => import(/* webpackChunkName: "user" */ "./views/user"),
    redirect: "/user/login",
    children: [
      {
        path: "login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Login")
      },
    ]
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  }
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history"
});
router.beforeEach(AuthGuard);
export default router;
