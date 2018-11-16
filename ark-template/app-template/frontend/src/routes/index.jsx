//import App from "layouts/Dashboard/Dashboard.jsx";
import ArkwithSite from "../layouts/ArkwithSite/ArkwithSite.jsx";
import Login from "../views/Authentication/LoginPage.jsx"
import SingUp from "../views/Authentication/SignUpPage.jsx"
//import Blog from "layouts/Blog.js";

const indexRoutes = [
    { path: "/login", component: Login },
    { path: "/singup", component: SingUp },
    //Because there is a redirect, we need to be the last item here.
    { path: "/", component: ArkwithSite },

];

export default indexRoutes;
