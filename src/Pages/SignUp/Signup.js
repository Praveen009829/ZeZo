import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../Components/AuthForm/AuthForm.css";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirm) {
            alert("Passwords do not match");
            return;
        }

        // Store user info locally (can connect to backend later)
        localStorage.setItem("user", JSON.stringify({ email }));
        navigate("/login");
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Sign Up</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button type="submit">Sign Up</Button>

                    <div className="auth-link">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Signup;
