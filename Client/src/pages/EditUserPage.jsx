import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import * as jwt_decode from "jwt-decode";
import { useGlobalContext } from "../context/Context";

const EditUserPage = () => {
    const { refreshToken } = useGlobalContext();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [picture, setPicture] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const [accessTokenn, setAccessTokenn] = useState("");
    useEffect(() => {
        setAccessTokenn(localStorage.getItem("accessToken"));
    }, []);

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(
        async (config) => {
            let currentDate = new Date();
            const decodedToken = jwt_decode.jwtDecode(accessTokenn);
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                const data = await refreshToken();
                config.headers["authorization"] = "Bearer " + data.accessToken;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("picture", picture);

        axiosJWT
            .put(`http://localhost:3001/users/${id}`, formData, {
                headers: { authorization: "Bearer " + accessTokenn },
            })
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
                <p className="register-header">Edit your account</p>
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
                        Send
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditUserPage;
