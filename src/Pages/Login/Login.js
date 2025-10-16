import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../Components/AuthForm/AuthForm.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Dummy auth simulation
        if (email && password) {
            localStorage.setItem("user", JSON.stringify({ email }));
            navigate("/");
        } else {
            alert("Please fill in all fields");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Sign In</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button type="submit">Sign In</Button>

                    <div className="auth-link">
                        New to Netflix? <Link to="/signup">Sign up now</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;
