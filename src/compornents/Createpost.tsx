import React, { useEffect, useState } from "react";
import "./Createpost.css";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

type CreatePostProps = {
  isAuth: boolean;
};

const CreatePost: React.FC<CreatePostProps> = ({ isAuth }) => {
  const [title, setTitle] = useState<string>("");
  const [postText, setPostText] = useState<string>("");

  const navigate = useNavigate();

  const createPost = async (): Promise<void> => {
    await addDoc(collection(db, "posts"), {
      title: title,
      postsText: postText,
      author: {
        username: auth.currentUser?.displayName,
        id: auth.currentUser?.uid,
      },
    });

    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  });

  return (
    <div className="createPostPage">
      <div className="postContainer">
        <h1>記事を投稿する</h1>
        <div className="inputPost">
          <div>タイトル</div>
          <input
            type="text"
            placeholder="タイトルを記入"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </div>
        <div className="inputPost">
          <div>投稿</div>
          <textarea
            placeholder="投稿内容を記入"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setPostText(e.target.value)
            }
          ></textarea>
        </div>
        <button className="postButton" onClick={createPost}>
          投稿
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
