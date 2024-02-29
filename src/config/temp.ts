import { ADMIN_ENDPOINT, AdminUserItem, STATUS } from "../types";

export const adminUserRowsTemp: AdminUserItem[] = [
  {
    id: "id1",
    email: "sooria@travelvago.com",
    fullName: "Soora Admin",
    firstName: "Soora",
    lastName: "Admin",
    permissions: [
      ADMIN_ENDPOINT.DASHBOARD,
      ADMIN_ENDPOINT.CURRENCIES,
      ADMIN_ENDPOINT.VISIT_DESTINATIONS,
      ADMIN_ENDPOINT.ALL_TICKETS,
      ADMIN_ENDPOINT.ADMIN_USERS,
    ],
    status: STATUS.ACTIVE,
  },
];
