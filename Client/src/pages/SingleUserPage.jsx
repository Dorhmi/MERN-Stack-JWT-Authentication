import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/Context";
import axios from "axios";
import * as jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import UserPosts from "../components/UserPosts";

const SingleUserPage = () => {
    const { accessTokenn, setAccessTokenn, refreshToken } = useGlobalContext();
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [picturee, setPicturee] = useState("");
    const [user, setUser] = useState({});
    const [allpost, setAllPost] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    console.log(allpost);

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

    const ID = { userID: id };

    useEffect(() => {
        if (accessTokenn) {
            axiosJWT
                .get(`http://localhost:3001/users/${id}`, {
                    headers: { authorization: "Bearer " + accessTokenn },
                })
                .then((res) => {
                    setUser(res.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });

            axiosJWT
                .post(`http://localhost:3001/post/userPosts`, ID, {
                    headers: { authorization: "Bearer " + accessTokenn },
                })
                .then((res) => {
                    console.log(res.data);
                    setAllPost(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [accessTokenn]);

    // useEffect(() => {
    //     if (accessTokenn) {
    //         const ID = { userID: id };
    //         console.log(ID);
    //         axiosJWT
    //             .get(`http://localhost:3001/post/userPosts`, ID, {
    //                 headers: { authorization: "Bearer " + accessTokenn },
    //             })
    //             .then((res) => {
    //                 console.log(res.data);
    //                 setAllPost(res.data);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     }
    // }, [accessTokenn]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("postTitle", postTitle);
        formData.append("postContent", postContent);
        formData.append("picture", picturee);
        formData.append("userID", user._id);
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ", " + pair[1]);
        // }
        console.log(user);
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

    if (isLoading) {
        return (
            <div>
                <div className="loader"></div>
            </div>
        );
    }

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
                    <form onSubmit={handleSubmit} className="register-form">
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
                        <button className="submit-btn" type="submit">
                            Submit
                        </button>
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
                    <p>{lastName}'s Posts</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="add-btn"
                    >
                        {" "}
                        Add Post +
                    </button>
                </div>
                {allpost.length === 0 ? (
                    <div className="single-user-posts">
                        <p>No posts yet</p>
                    </div>
                ) : (
                    <div className="single-user-posts">
                        {allpost.map((post) => {
                            return (
                                <UserPosts
                                    key={post._id}
                                    {...post}
                                    userPicture={picture}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default SingleUserPage;
