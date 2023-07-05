import React, { useEffect, useState } from 'react'
import "./Home.css"
import { auth, db } from '../firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));
      // console.log(data);
      // console.log(data.docs.map((doc) => ({ doc })));
      // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getPosts();
  }, []);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    // window.location.href = "/";
    navigate("/");
  }

  return (
    <div className='homePage'>
      {postList.map((post) => {
        return (
          <div className="postContents" key={post.id}>
            <h1>{post.title}</h1>
            <div className="postTextContainer">
              {post.postsText}
            </div>
            <div className="nameAndDeleteButton">
              <h3>@{post.author.username}</h3>
              {post.author.id === auth.currentUser?.id && (
                <button onClick={() => handleDelete(post.id)}>削除</button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Home