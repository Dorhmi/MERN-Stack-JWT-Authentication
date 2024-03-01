import React from "react";

const UserPosts = ({ postTitle, postContent, postPicture, userPicture }) => {
    return (
        <article className="article-post-user">
            <h3 className="article-post-title">
                <img
                    className="article-post-user-img"
                    src={`http://localhost:3001/assets/${userPicture}`}
                    alt="userPicture"
                />
                {postTitle}
            </h3>
            <p className="article-post-content">{postContent} </p>
            <img
                className="article-post-img"
                src={`http://localhost:3001/assets/${postPicture}`}
                alt={postTitle}
            />
        </article>
    );
};

export default UserPosts;
