import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [picture, setPicture] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("picture", picture);

        axios
            .post("http://localhost:3001/auth/register", formData)
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <section className="register-section">
            <div className="register-content">
                <p className="register-header">Register your account</p>
                <form
                    className="register-form"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                >
                    <div className="form-div">
                        <p className="form-header">FirstName</p>
                        <input
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                            className="register-input"
                            type="text"
                            placeholder="Enter your firdtName"
                        />
                    </div>
                    <div className="form-div">
                        <p className="form-header">lastName</p>
                        <input
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                            className="register-input"
                            type="text"
                            placeholder="Enter your lastName"
                        />
                    </div>
                    <div className="form-div">
                        <p className="form-header">Email</p>
                        <input
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            className="register-input"
                            type="email"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-div">
                        <p className="form-header">Password</p>
                        <input
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            className="register-input"
                            type="text"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="form-div">
                        <p className="form-header">Profile Picture</p>
                        <input
                            onChange={(e) => {
                                setPicture(e.target.files[0]);
                            }}
                            className="register-input"
                            type="file"
                            name="picture"
                        />
                    </div>
                    <button className="submit-btn" type="submit">
                        Submit
                    </button>
                </form>
                <p className="register-footer">
                    Already have an account? <Link to={"/login"}>login</Link>
                </p>
            </div>
        </section>
    );
};

export default RegisterPage;

// EditUserPage
