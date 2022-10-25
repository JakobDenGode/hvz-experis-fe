import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import EditList from "../components/admin/EditList";
import MobileNavBar from "../components/nav/MobileNavBar";

export default withAuthenticationRequired(AdminPage, {
  onRedirecting: () => <div>Redirecting to Login page</div>,
});

function AdminPage() {
  const { user } = useAuth0();

  if (user && !user["https//:hvz-server.com/roles"].length > 0) {
    return <div>Permission denied</div>;
  }
  return (
    <div>
      <EditList />
      <MobileNavBar />
    </div>
  );
}
