import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import ItemLink from "./ItemLink";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { Button } from "react-bootstrap";
import { authKey } from "@/constants/storageKeys";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  const loggedInUser = getUserInfo();
  const handleLogout = () => {
    removeUserInfo(authKey);
    router.push("/");
  };
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="/" className="font-bold ms-8 text-4xl">
              Quiz System
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Dashboard
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {loggedInUser.role === "EXAMINER" && (
                    <>
                      <ItemLink
                        itemName={"Create Question"}
                        url={"/create-question"}
                      />
                      <ItemLink itemName={"Create Exam"} url={"/create-exam"} />
                    </>
                  )}
                  {loggedInUser.role === "CANDIDATE" && (
                    <ItemLink itemName={"My Exam"} url={"/my-exam"} />
                  )}
                  {loggedInUser && (
                    <Button onClick={(e) => handleLogout()} className="mt-8">
                      Logout
                    </Button>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;
