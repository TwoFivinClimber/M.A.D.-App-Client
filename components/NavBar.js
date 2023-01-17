/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  Button, Container, Image, Nav, Navbar, Offcanvas,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { signIn, signOut } from '../utils/auth';
import { checkUser } from '../api/user/userData';

const NavBar = () => {
  const router = useRouter();
  const { user } = useAuth();
  const expand = false;

  const checkUserProfile = () => {
    if (user.uid) {
      checkUser(user.uid).then((userObj) => {
        if (!userObj.id) {
          router.push('/user/new');
        }
      });
    }
  };
  const signOutUser = () => {
    router.push('/');
    signOut();
  };

  useEffect(() => {
    checkUserProfile();
  }, [user]);

  return (
    <>
      <Navbar key={expand} expand={expand} className="navbar-navbar mb-3">
        <Container fluid>
          <div className="nav-Items">
            <Navbar.Toggle className={`nav-button-expand ${router.route === '/user/new' ? 'nav-No-Show' : ''}`} aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Link href="/" passHref>
              <Navbar.Brand className="nav-Title">M.A.D. App</Navbar.Brand>
            </Link>
            {/* Visible Stuff go here */}
            {user ? (
              <Button type="button" className="sign-out-style btn btn-danger" onClick={signOutUser}>Sign Out</Button>
            ) : (
              <Button type="button" className="sign-in-style btn btn-success" onClick={signIn}>Sign In</Button>
            )}
          </div>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} />
            </Offcanvas.Header>
            <div className="nav-logo-container">
              <Image className="nav-logo-expand" src="https://res.cloudinary.com/twofiveclimb/image/upload/v1663966058/mad-app/madLogoNav_hf3myl.png" alt="mad app logo" />
            </div>
            <Offcanvas.Body>
              <Nav className="nav-Links justify-content-center flex-grow-1 pe-3">
                <Link href="/" passHref expand={false}>
                  <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}>
                    <span> Home</span>
                  </Navbar.Toggle>
                </Link>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}>
                  <Link href="/browseEvents" passHref>
                    <span>Browse Events</span>
                  </Link>
                </Navbar.Toggle>
                <Link href="/browseDays" passHref>
                  <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}>
                    <span>Browse Days</span>
                  </Navbar.Toggle>
                </Link>
                <Link href="/search" passHref>
                  <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}>
                    <span>Search</span>
                  </Navbar.Toggle>
                </Link>
                <>
                  {user
                    ? (
                      <Link href="/event/new" passHref>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}>
                          <span>Create Event</span>
                        </Navbar.Toggle>
                      </Link>
                    ) : <></> }
                  {user
                    ? (
                      <Link href="/day/new" passHref>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}>
                          <span>Create Day</span>
                        </Navbar.Toggle>
                      </Link>
                    ) : <></> }
                  {user
                    ? (
                      <Link href="/user/profile" passHref>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}>
                          <span>Profile</span>
                        </Navbar.Toggle>
                      </Link>
                    )
                    : <></> }
                  {user ? (
                    <Button type="button" className="sign-out-collapse btn btn-danger" onClick={signOutUser}>Sign Out</Button>
                  ) : (
                    <Button type="button" className="sign-in-collapse btn btn-success" onClick={signIn}>Sign In</Button>
                  )}
                </>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
