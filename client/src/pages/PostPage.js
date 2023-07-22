import { formatISO9075 } from "date-fns/fp";
import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import CommentSection from "../CommentSection";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const [showOptions, setShowOptions] = useState(false); // State to toggle dropdown menu

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((response) => {
        response.json().then((postInfo) => {
          setPostInfo(postInfo);
        });
      });
  }, [id]);

  if (!postInfo) return '';

  const handleDeletePost = () => {
    fetch(`http://localhost:4000/post/${id}/delete`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          // Post deleted successfully, redirect or perform any necessary actions
        } else {
          // Handle error cases
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const isUserPost = userInfo && postInfo && userInfo.username === postInfo.author.username;

  return (
    <div className="post-page">
      {isUserPost && (
        <div className="options-btn" onClick={toggleOptions}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15l5-5-5-5M12 19l5-5-5-5" />
          </svg>
        </div>
      )}
      {showOptions && (
        <div className="options-menu">
          <ul>
            <li>
              <Link to={`/edit/${postInfo._id}`}>Edit</Link>
            </li>
            <li>
              <button onClick={handleDeletePost}>Delete</button>
            </li>
          </ul>
        </div>
      )}
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by @{postInfo.author.username}</div>
      <div className="image">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      <CommentSection postId={id} /> {/* Add the CommentSection component */}
    </div>
  );
}
