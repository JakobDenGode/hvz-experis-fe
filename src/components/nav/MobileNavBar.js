import { useAuth0 } from "@auth0/auth0-react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function MobileNavBar() {
  const { isAuthenticated, user } = useAuth0();

  if (user) {
    console.log(user["http://demozero.net/roles"]);
  }

  console.log(document.location.pathname);
  console.log(isAuthenticated);

  return (
    <>
      {isAuthenticated && document.location.pathname !== "/" && (
        <Navbar
          bg="light"
          expand="lg"
          className="position-fixed w-100 bottom-0 right-0 border"
        >
          <Nav className="mx-auto  w-100">
            <div className="d-flex justify-content-around">
              <Nav.Link href="/games/:id/squad">Squads</Nav.Link>
              <Nav.Link href="/map">Map</Nav.Link>
              {user && user["http://demozero.net/roles"].length > 0 && (
                <>
                  <Nav.Link>Chat</Nav.Link>
                  <Nav.Link>Edit</Nav.Link>
                </>
              )}
            </div>
          </Nav>
        </Navbar>
      )}
    </>
  );
}

export default MobileNavBar;
