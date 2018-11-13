// @material-ui/icons
//import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import ViewAgenda from "@material-ui/icons/ViewAgenda";
import Chatting from "@material-ui/icons/Chat";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import IntroArkwithPage from "../views/IntroArkwith/ArkwithIntroduction.jsx";
import ChattingPage from "../views/Chat/ChatTranslator.jsx"
import UserProfile from "../views/UserProfile/UserProfile.jsx";
import TableList from "../views/TableList/TableList.jsx";
import Typography from "../views/Typography/Typography.jsx";
import Icons from "../views/Icons/Icons.jsx";
import Maps from "../views/Maps/Maps.jsx";
import NotificationsPage from "../views/Notifications/Notifications.jsx";
import UpgradeToPro from "../views/UpgradeToPro/UpgradeToPro.jsx";
//import ChatRoom from "../views/Chat/ChatFormTest.jsx";

const arkwithRoutes = [
  {
    path: "/introarkwith",
    sidebarName: "About Arkwith",
    navbarName: "About",
    icon: ViewAgenda,
    component: IntroArkwithPage
  },
  {
    path: "/chat",
    sidebarName: "Chat Translation",
    navbarName: "Chatting",
    icon: Chatting,
    component: ChattingPage
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },
  {
    path: "/table",
    sidebarName: "Table List",
    navbarName: "Table List",
    icon: "content_paste",
    component: TableList
  },
  {
    path: "/typography",
    sidebarName: "Typography",
    navbarName: "Typography",
    icon: LibraryBooks,
    component: Typography
  },
  {
    path: "/icons",
    sidebarName: "Icons",
    navbarName: "Icons",
    icon: BubbleChart,
    component: Icons
  },
  {
    path: "/maps",
    sidebarName: "Maps",
    navbarName: "Map",
    icon: LocationOn,
    component: Maps
  },
  {
    path: "/notifications",
    sidebarName: "Notifications",
    navbarName: "Notifications",
    icon: Notifications,
    component: NotificationsPage
  },
  {
    path: "/document",
    sidebarName: "Documentation",
    navbarName: "Material Dashboard Documentation",
    icon: Unarchive,
    component: UpgradeToPro
  },
  { redirect: true, path: "/", to: "/introarkwith", navbarName: "Redirect" }
];

export default arkwithRoutes;
