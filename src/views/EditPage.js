import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import EditList from "../components/admin/EditList";

export default withAuthenticationRequired(AdminPage, {
  onRedirecting: () => <div>Redirecting to Login page</div>,
});

function AdminPage() {
  const { user } = useAuth0();
  console.log(user);
  if (user && user["http://demozero.net/roles"].length === 0) {
    return <div>Permission denied</div>;
  }
  return (
    <div>
      <EditList />
    </div>
  );
}
