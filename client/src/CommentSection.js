import React, { useState, useEffect } from 'react';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Fetch comments associated with the current blog post
    fetch(`http://localhost:4000/post/${postId}/comment`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.log(error));
  }, [postId]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();

    // Send a request to create a new comment
    fetch(`http://localhost:4000/post/${postId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: newComment }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the comment list with the new comment
        setComments((prevComments) => [...prevComments, data]);
        setNewComment('');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <p>{comment.author.username}: {comment.content}</p>
            <p>{comment.createdAt}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmitComment}>
        <input type="text" value={newComment} onChange={handleCommentChange} />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
