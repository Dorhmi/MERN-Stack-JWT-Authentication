import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/Context";
import { Link, useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import * as jwt_decode from "jwt-decode";
// import jwt from 'jsonwebtoken'

const DashboardPage = () => {
    const { accessTokenn, refreshTokenn, setAccessTokenn, setRefreshTokenn } =
        useGlobalContext();
    const [users, setUsers] = useState(null);
    const navigate = useNavigate();
    // let accessTokenn = localStorage.getItem("accessToken");
    // let refreshTokenn = localStorage.getItem("refreshToken");
    // const [isFirstMounted, setIsFirstMounted] = useState(true);
    // const navigate = useNavigate()

    // const [accessTokenn, setAccessTokenn] = useState("");
    // const [refreshTokenn, setRefreshTokenn] = useState("");
    useEffect(() => {
        setAccessTokenn(localStorage.getItem("accessToken"));
        setRefreshTokenn(localStorage.getItem("refreshToken"));
    }, [setAccessTokenn, setRefreshTokenn]);

    // console.log(accessTokenn);
    // console.log(refreshTokenn);

    // console.log(jwt_decode);
    // console.log(user);
    // console.log(users);

    const refreshToken = async () => {
        try {
            const res = await axios.post("http://localhost:3001/auth/refresh", {
                token: refreshTokenn,
            });
            localStorage.clear();
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            // setUser({
            //     ...user,
            //     accessToken: res.data.accessToken,
            //     refreshToken: res.data.refreshToken
            // });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

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

    useEffect(() => {
        if (accessTokenn) {
            axiosJWT
                .get("http://localhost:3001/users/", {
                    headers: { authorization: "Bearer " + accessTokenn },
                })
                .then((res) => {
                    if (res.data) {
                        setUsers(res.data);
                    }
                })
                .catch((error) => {
                    console.log("oops");
                });
        }
    }, [accessTokenn]);

    const handleLogout = () => {
        axios
            .post("http://localhost:3001/auth/logout", {
                token: refreshTokenn,
            })
            .then(() => {
                localStorage.clear();
                navigate("/login");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // axiosJWT.interceptors.response.use(
    //     async(res) => {
    //         if (res.data === "Token is not valid") {
    //             const data = await refreshToken();
    //             axios.defaults.headers.common["authorization"] = "Bearer " + data.accessToken;
    //         }
    //     },
    //     (error) => {
    //         return Promise.reject(error);
    //     }
    // );

    // useEffect(() => {
    //     if (user) {
    //         localStorage.setItem('user', JSON.stringify(user));
    //     }
    // }, [user]);

    // useEffect(() => {
    //     const storedTokens = localStorage.getItem('user');
    //     if (storedTokens) {
    //         setUser(JSON.parse(storedTokens));
    //     }
    // }, [setUser]);

    // useEffect(() => {
    //     if (user && user.refreshToken) {
    //         const intervalId = setInterval(async () => {
    //             try {
    //                 await refreshToken();
    //             } catch (error) {
    //                 console.log("Error refreshing token:", error);
    //             }
    //         }, 60000);
    //         return () => clearInterval(intervalId);
    //     }
    // }, [user]);

    if (!accessTokenn) {
        return (
            <div className="error-msg">
                You'r not authenticated
                <Link to={"/login"}>login</Link>
            </div>
        );
    }

    return (
        <section className="dashboard-section">
            <button onClick={handleLogout} className="logout-btn">
                Logout
            </button>
            {users ? (
                <div className="dashboard-content">
                    <h2 className="dashboard-title">Dashboard</h2>
                    <div className="dashboard-users">
                        {users.map((user) => {
                            return (
                                <UserCard
                                    key={user._id}
                                    id={user._id}
                                    {...user}
                                    axiosJWT={axiosJWT}
                                />
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div>
                    <div className="loader"></div>
                </div>
            )}
        </section>
    );
};

export default DashboardPage;
