/** 
  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
     The `type` key with the `title` value is used for a title inside the Sidenav. 
     The `type` key with the `divider` value is used for a divider between Sidenav items.
  2. The `name` key is used for the name of the route on the Sidenav.
  3. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  4. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  5. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  6. The `route` key is used to store the route location which is used for the react router.
  7. The `href` key is used to store the external links location.
  8. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  9. The `component` key is used to store the component of its route.
*/

import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import GroupIcon from "@mui/icons-material/Group";
import HelpIcon from "@mui/icons-material/Help";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import StorageIcon from "@mui/icons-material/Storage";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EventIcon from '@mui/icons-material/Event';

import {
  AllTickets,
  TicketEdit,
  Currencies,
  Dashboard,
  DestinationTickets,
  FeaturedTickets,
  VisitDestination,
  MyAccount,
  AllUsers,
  UserDetail,
  AllBookings,
  BookingAnalytics,
  Blogs,
  BlogEdit
} from "../pages";
import { AdminUsers } from "../pages/Profile/AdminUsers";
import { FeaturedTicketsAssign } from "../pages/Tickets/FeaturedTicketsAssign";
import { RoutePath } from "./RoutePath";
import { AllHelpRequests, HelpRequestDetail } from "../pages/Help";

export const PrivateRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    route: RoutePath.dashboard,
    icon: HomeIcon,
    component: <Dashboard />,
    isSideMenu: true,
    noCollapse: false,
  },
  { type: "title", title: "Basic", key: "basic-pages" },
  {
    type: "collapse",
    name: "Currencies",
    route: RoutePath.currencies,
    icon: CurrencyExchangeIcon,
    component: <Currencies />,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Visit Destinations",
    route: RoutePath.destination,
    icon: PlaceIcon,
    component: <VisitDestination />,
    noCollapse: false,
  },
  { type: "title", title: "Bookings" },
  {
    type: "collapse",
    name: "All Bookings",
    route: "/bookings/all",
    icon: EventIcon,
    component: <AllBookings />,
    isSideMenu: true,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Booking Analytics",
    route: "/bookings/analytics",
    icon: EventIcon,
    component: <BookingAnalytics />,
    isSideMenu: true,
    noCollapse: false,
  },
  { type: "title", title: "Tickets" },
  {
    type: "collapse",
    name: "All Tickets",
    route: RoutePath.allTickets,
    icon: StorageIcon,
    component: <AllTickets />,
    isSideMenu: true,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Edit ticket",
    route: "/all-tickets/edit-ticket",
    component: <TicketEdit />,
    isSideMenu: false,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Featured Tickets",
    route: "/featured-tickets",
    icon: AirplaneTicketIcon,
    component: <FeaturedTickets />,
    isSideMenu: true,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Edit Ticket",
    route: "/featured-tickets/edit-ticket",
    component: <TicketEdit />,
    isSideMenu: false,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Assign Featured Ticket",
    route: "/featured-tickets/assign-ticket",
    component: <FeaturedTicketsAssign />,
    isSideMenu: false,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Destination Tickets",
    route: "/destination-tickets",
    icon: AirlineStopsIcon,
    component: <DestinationTickets />,
    isSideMenu: true,
    noCollapse: false,
  },
  { type: "title", title: "Blogs" },
  {
    type: "collapse",
    name: "Blogs",
    route: "/blogs",
    icon: AirlineStopsIcon,
    component: <Blogs />,
    isSideMenu: true,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Edit ticket",
    route: "/blogs/edit-blog",
    component: <BlogEdit />,
    isSideMenu: false,
    noCollapse: false,
  },
  { type: "title", title: "Users" },
  {
    type: "collapse",
    name: "Users",
    route: "/users",
    icon: AccountCircleOutlinedIcon,
    component: <AllUsers />,
    isSideMenu: true,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Detail",
    route: "/users/detail",
    component: <UserDetail />,
    isSideMenu: false,
    noCollapse: false,
  },
  { type: "title", title: "Help Reqeusts" },
  {
    type: "collapse",
    name: "All Help Requests",
    route: "/request-help",
    icon: HelpIcon,
    component: <AllHelpRequests />,
    isSideMenu: true,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Detail",
    route: "/request-help/detail",
    component: <HelpRequestDetail />,
    isSideMenu: false,
    noCollapse: false,
  },
  { type: "title", title: "Accounts" },
  {
    type: "collapse",
    name: "Profile",
    route: "/profile",
    icon: PersonIcon,
    component: <MyAccount />,
    isSideMenu: true,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Admin Users",
    route: "/admin-users",
    icon: GroupIcon,
    component: <AdminUsers />,
    isSideMenu: false,
    noCollapse: false,
  },
  // {
  //   type: "collapse",
  //   name: "Basic1",
  //   key: "basic-pages",
  //   icon: StorageIcon,
  //   noCollapse: false,
  //   collapse: [
  //     { name: "Default", key: "default", route: "/dashboards/default", component: Dashboard },
  //     { name: "Automotive", key: "automotive", route: "/dashboards/automotive", component: Dashboard},
  //   ],
  // },
];
