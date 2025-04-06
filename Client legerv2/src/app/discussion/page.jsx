"use client";
import { useState } from "react";

let postId = 1;
let commentId = 1;

export default function ChatPage() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: postId++,
      content: newPost,
      likes: 0,
      comments: [],
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <div className="main-container" style={{ maxWidth: 800 }}>
      <h2 className="title">💬 Discussion Communautaire</h2>

      <form
        onSubmit={handlePost}
        className="form"
        style={{ width: "100%", marginBottom: 30 }}
      >
        <textarea
          className="input-group"
          placeholder="Écris quelque chose..."
          rows={3}
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          required
          style={{
            resize: "none",
            borderRadius: "8px",
            boxShadow: "inset 0 0 5px #000",
          }}
        />
        <button
          type="submit"
          className="submit"
          style={{ alignSelf: "flex-end" }}
        >
          🚀 Publier
        </button>
      </form>

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={() =>
            setPosts((prev) =>
              prev.map((p) =>
                p.id === post.id ? { ...p, likes: p.likes + 1 } : p
              )
            )
          }
          onAddComment={(text) => {
            const comment = { id: commentId++, text, likes: 0 };
            setPosts((prev) =>
              prev.map((p) =>
                p.id === post.id
                  ? { ...p, comments: [...p.comments, comment] }
                  : p
              )
            );
          }}
          onLikeComment={(commentId) => {
            setPosts((prev) =>
              prev.map((p) =>
                p.id === post.id
                  ? {
                      ...p,
                      comments: p.comments.map((c) =>
                        c.id === commentId ? { ...c, likes: c.likes + 1 } : c
                      ),
                    }
                  : p
              )
            );
          }}
        />
      ))}
    </div>
  );
}

function PostCard({ post, onLike, onAddComment, onLikeComment }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(commentText.trim());
      setCommentText("");
    }
  };

  return (
    <div
      className="form-container"
      style={{
        width: "100%",
        marginBottom: 25,
        borderLeft: "4px solid #4682b4",
        padding: "20px",
        backgroundColor: "#20263d",
        transition: "background-color 0.3s",
      }}
    >
      <p style={{ marginBottom: 10 }}>{post.content}</p>

      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <button
          onClick={onLike}
          className="submit"
          style={{
            width: "auto",
            padding: "6px 12px",
            fontSize: "14px",
            backgroundColor: "#2d3c5a",
          }}
        >
          ❤️ {post.likes}
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="submit"
          style={{
            width: "auto",
            padding: "6px 12px",
            fontSize: "14px",
            backgroundColor: "#2d3c5a",
          }}
        >
          {showComments ? "🡡 Cacher" : "💬 Commenter"}
        </button>
      </div>

      {showComments && (
        <div className="comments-section" style={{ marginTop: 10 }}>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: 10, marginBottom: 10 }}
          >
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Ton commentaire..."
              required
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #2e3a59",
                backgroundColor: "#1a1f33",
                color: "#c0c0c0",
              }}
            />
            <button
              type="submit"
              className="submit"
              style={{ width: "auto", padding: "10px" }}
            >
              ➤
            </button>
          </form>

          <div className="comments-list">
            {post.comments.map((comment) => (
              <div
                key={comment.id}
                style={{
                  marginBottom: 12,
                  padding: "10px 15px",
                  backgroundColor: "#1c2135",
                  borderRadius: "6px",
                  borderLeft: "3px solid #306998",
                }}
              >
                <p style={{ margin: 0 }}>{comment.text}</p>
                <button
                  onClick={() => onLikeComment(comment.id)}
                  className="submit"
                  style={{
                    marginTop: 5,
                    padding: "5px 10px",
                    fontSize: "13px",
                    backgroundColor: "#2d3c5a",
                  }}
                >
                  ❤️ {comment.likes}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
