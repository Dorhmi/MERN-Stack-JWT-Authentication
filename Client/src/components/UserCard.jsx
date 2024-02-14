import { FaTrashCan } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/Context";

const UserCard = ({ id, email, firstName, lastName, picture, axiosJWT }) => {
    const { accessTokenn } = useGlobalContext();
    const navigate = useNavigate();

    const handleDelete = () => {
        axiosJWT
            .delete(`http://localhost:3001/users/${id}`, {
                headers: { authorization: "Bearer " + accessTokenn },
            })
            .then(() => {
                localStorage.clear();
                navigate("/login");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <article className="article-user">
            <img
                className="article-img"
                src={`http://localhost:3001/assets/${picture}`}
                alt={picture}
            />
            <h3 className="article-name">
                {firstName} {lastName}
            </h3>
            <p className="article-email">{email}</p>
            <div className="icons-container">
                <a onClick={handleDelete} className="delete-btn">
                    <FaTrashCan />
                </a>
                <Link className="edit-btn" to={`/edit/${id}`}>
                    <FaUserEdit />
                </Link>
                <Link className="eye-btn" to={`/user/${id}`}>
                    <FaEye />
                </Link>
            </div>
        </article>
    );
};

export default UserCard;
