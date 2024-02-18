import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/Context";
import axios from "axios";
import * as jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";

const SingleUserPage = () => {
    const { accessTokenn, setAccessTokenn, refreshToken } = useGlobalContext();
    const [user, setUser] = useState({});
    const { id } = useParams();

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

    useEffect(() => {
        if (accessTokenn) {
            axiosJWT
                .get(`http://localhost:3001/users/${id}`, {
                    headers: { authorization: "Bearer " + accessTokenn },
                })
                .then((res) => {
                    setUser(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [accessTokenn]);

    const { firstName, lastName, picture } = user;

    return (
        <section className="single-user-section">
            <div className="section-info">
                <img
                    className="single-user-img"
                    src={`http://localhost:3001/assets/${picture}`}
                    alt={picture}
                />
                <h3>
                    {firstName} {lastName}{" "}
                </h3>
            </div>
            <div className="section-posts">
                <div className="single-user-title">
                    <p>all post of {lastName}</p>
                    <button className="add-btn"> Add Post +</button>
                </div>
                <div className="single-user-posts">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                    delectus magni qui optio impedit tempora vel fuga ad nihil
                    aperiam? Dignissimos velit, recusandae officia facilis ab
                    commodi laborum repellendus laboriosam. Lorem ipsum, dolor
                    sit amet consectetur adipisicing elit. Laboriosam tempora ab
                    saepe aliquid non tenetur eligendi suscipit recusandae magni
                    rem itaque deserunt error quo, commodi eos? Assumenda
                    nostrum facere aperiam. Lorem ipsum dolor, sit amet
                    consectetur adipisicing elit. Provident doloremque minima
                    autem ex ab? Officia sit suscipit aliquam incidunt earum
                    aspernatur debitis molestias necessitatibus maxime
                    doloremque doloribus, at est quasi.
                </div>
            </div>
        </section>
    );
};

export default SingleUserPage;
