
import LoginPage from "./views/Pages/LoginPage";
import PickPage from "./views/Pages/PickPage";
import Who from "./views/Pages/Who";
import Rules from "./views/Pages/Rules";
import Dashboard from "./views/Pages/dash";
import Home from "./views/Pages/Home";
import WeChoose from "./views/Pages/WeChoose";
import Settings from "./views/Pages/settings";

const dashRoutes = [
  {
    path: "/dashboard",
    name: "Home",
    rtlName: "هعذاتسجيل الدخول",
    mini: "L",
    rtlMini: "هعذا",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Settings",
    rtlName: "هعذاتسجيل الدخول",
    mini: "L",
    rtlMini: "هعذا",
    component: Settings,
    layout: "/admin",
  },
  {
    path: "/pick",
    name: "Log out",
    rtlName: "هعذاتسجيل الدخول",
    mini: "L",
    rtlMini: "هعذا",
    component: PickPage,
    layout: "/auth",
  },
  
];

const authRoutes = [
  {
    path: "/login-page",
    name: "ChooseMe",
    rtlName: "هعذاتسجيل الدخول",
    mini: "L",
    rtlMini: "هعذا",
    component: LoginPage,
    layout: "/auth",
  },
  {
    path: "/pick",
    name: "ChooseMe",
    rtlName: "هعذاتسجيل الدخول",
    mini: "L",
    rtlMini: "هعذا",
    component: PickPage,
    layout: "/auth",
  },
  {
    path: "/who-are-we",
    name: "ChooseMe",
    rtlName: "هعذاتسجيل الدخول",
    mini: "L",
    rtlMini: "هعذا",
    component: Who,
    layout: "/auth",
  },
  {
    path: "/twitter-rules",
    name: "ChooseMe",
    rtlName: "هعذاتسجيل الدخول",
    mini: "L",
    rtlMini: "هعذا",
    component: Rules,
    layout: "/auth",
  },
  {
    path: "/home",
    name: "ChooseMe",
    rtlName: "هعذاتسجيل الدخول",
    mini: "L",
    rtlMini: "هعذا",
    component: Home,
    layout: "/auth",
  },
  {
    path: "/admin",
    name: "ChooseMe",
    rtlName: "هعذاتسجيل الدخول",
    mini: "L",
    rtlMini: "هعذا",
    component: WeChoose,
    layout: "/auth",
  },


];
export default { dashRoutes: dashRoutes, authRoutes: authRoutes };
