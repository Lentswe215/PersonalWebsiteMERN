import ContactMessagesAdmin from "../Admin/ContactMessages";
import PageContentsAdmin from "../Admin/PageContents";
import ProjectsAdmin from "../Admin/Projects";
import SkillsAdmin from "../Admin/Skills";
import AdminHome from "../Admin/home";
import AdminNavMenu from "../Layouts/AdminNavMenu";
import Layout from "../Layouts/Layout";
import Home from "../Site/home";
import Login from "../Site/login";
import {
    renderRoutes
} from "./generate-routes";

export const routes = [{
        layout: Layout,
        routes: [{
                name: "login",
                title: "Login Page",
                component: Login,
                path: "/login",
                isPublic: true

            },
            {
                name: "home",
                title: "Home Page",
                component: Home,
                path: "/",
                isPublic: true

            }
        ]
    },
    {
        layout: AdminNavMenu,
        routes: [{
                name: "AdminHome",
                title: "Admin Home",
                component: AdminHome,
                path: "/admin",
                isPublic: false
            },
            {
                name: "ProjectsAdmin",
                title: "Projects Admin",
                component: ProjectsAdmin,
                path: "/admin/projects",
                isPublic: false
            },
            {
                name: "SkillsAdmin",
                title: "Skills Admin",
                component: SkillsAdmin,
                path: "/admin/skills",
                isPublic: false
            },
            {
                name: "PageContentsAdmin",
                title: "Page Contents Admin",
                component: PageContentsAdmin,
                path: "/admin/pagecontents",
                isPublic: false
            },
            {
                name: "ContactMessagesAdmin",
                title: "Contact Messages Admin",
                component: ContactMessagesAdmin,
                path: "/admin/contactmessages",
                isPublic: false
            }
        ]
    }
]

export const Routes = renderRoutes(routes);