import React, { useEffect, useState } from "react";
import "./Home.css";
import { auth, db } from "../firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

type Post = {
  id: string;
  title?: string;
  postsText?: string;
  author?: {
    username: string;
    id: string;
  };
};

const Home: React.FC = () => {
  const [postList, setPostList] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));
      // console.log(data);
      // console.log(data.docs.map((doc) => ({ doc })));
      // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "posts", id));
    navigate("/");
  };

  return (
    <div className="homePage">
      {postList.map((post) => {
        return (
          <div className="postContents" key={post.id}>
            <h1>{post.title}</h1>
            <div className="postTextContainer">{post.postsText}</div>
            {post.author && (
              <div className="nameAndDeleteButton">
                <h3>@{post.author.username}</h3>
                {post.author.id === auth.currentUser?.uid && (
                  <button onClick={() => handleDelete(post.id)}>削除</button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
