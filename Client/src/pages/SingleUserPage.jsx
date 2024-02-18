import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/Context";
import axios from "axios";
import * as jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";

const SingleUserPage = () => {
    const { accessTokenn, setAccessTokenn, refreshToken } = useGlobalContext();
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [picturee, setPicturee] = useState("");
    const [user, setUser] = useState({});
    const [showForm, setShowForm] = useState(false);
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

    const handleSubmit = (e) => {
        e.preventDefult();

        const formData = new FormData();

        formData.append("postTitle", postTitle);
        formData.append("postContent", postContent);
        formData.append("picturee", picturee);
        formData.append("userID", id);

        axiosJWT
            .post("http://localhost:3001/post/", formData, {
                headers: { authorization: "Bearer " + accessTokenn },
            })
            .then(() => {
                setShowForm(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const { firstName, lastName, picture } = user;

    if (showForm) {
        return (
            <div className="showForm">
                <div className="register-content-post">
                    <button
                        onClick={() => setShowForm(false)}
                        className="close-btn"
                    >
                        X
                    </button>
                    <p className="register-header">Create Post</p>
                    <form className="register-form">
                        <div className="form-div">
                            <p className="form-header">Post Title</p>
                            <input
                                onChange={(e) => {
                                    setPostTitle(e.target.value);
                                }}
                                className="register-input"
                                type="text"
                                placeholder="Enter your title"
                            />
                        </div>
                        <div className="form-div">
                            <p className="form-header">Post Content</p>
                            <textarea
                                rows="6"
                                cols="50"
                                onChange={(e) => {
                                    setPostContent(e.target.value);
                                }}
                                className="register-input"
                                type="text"
                                placeholder="Enter your content"
                            />
                        </div>
                        <div className="form-div">
                            <p className="form-header">Post Picture</p>
                            <input
                                onChange={(e) => {
                                    setPicturee(e.target.files[0]);
                                }}
                                className="register-input"
                                type="file"
                                name="picture"
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }

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
                    <button
                        onClick={() => setShowForm(true)}
                        className="add-btn"
                    >
                        {" "}
                        Add Post +
                    </button>
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
