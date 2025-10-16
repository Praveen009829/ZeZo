import React, { useState } from "react";
import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown, ListGroup } from "react-bootstrap";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navigation = ({ user, onLogout, movies = [], tvShows = [] }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Handle typing in search bar
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      const allItems = [
        ...movies.map(m => ({ ...m, type: 'movie' })),
        ...tvShows.map(tv => ({ ...tv, type: 'tv' }))
      ];

      const filtered = allItems
        .filter((item) =>
          (item.title || item.name).toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5); // top 5 suggestions
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // Navigate to selected suggestion
  const handleSelectSuggestion = (item) => {
    setSearchTerm("");
    setSuggestions([]);
    navigate(`/detail/${item.type}/${item.id}`);
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${encodeURIComponent(searchTerm)}`);
      setSuggestions([]);
      setSearchTerm("");
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="px-3">
      <Container fluid>
        <Navbar.Brand href="/">ZeZo</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/tvshows">TV Shows</Nav.Link>
            <Nav.Link href="/movies">Movies</Nav.Link>
            <Nav.Link href="/mylist">My List</Nav.Link>
          </Nav>

          {/* Search bar */}
          <Form className="d-flex me-3 position-relative" onSubmit={handleSubmit}>
            <FormControl
              type="search"
              placeholder="Search movies or TV shows"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              autoComplete="off"
            />
            <Button variant="outline-light" type="submit">
              <FaSearch />
            </Button>

            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
              <ListGroup
                className="position-absolute top-100 start-0 w-100"
                style={{ zIndex: 1000 }}
              >
                {suggestions.map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    action
                    onClick={() => handleSelectSuggestion(item)}
                  >
                    {item.title || item.name} ({item.type})
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Form>

          {/* User/Profile */}
          {user ? (
            <Nav>
              <NavDropdown
                title={<FaUserCircle size={24} />}
                id="user-nav-dropdown"
                align="end"
                menuVariant="dark"
              >
                <NavDropdown.Item onClick={() => navigate("/profile")}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
