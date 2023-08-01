"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPost, setMyPost] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPost(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);
  
  const handleEdit = (post) => {
    console.log('Masuk Edit')
    router.push(`/update-sambat?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure want to delete this Quotes?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/sambat/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = myPost.filter((item) => item._id !== post._id);
        setMyPost(filteredPosts);
      } catch (error) {
        alert(error)
        alert("Failed to Delete Post");
      }
    }
  };
  

  return (
    <Profile
      data={myPost}
      name={session?.user.name}
      desc={
        "Welcome to your profile page. View, edit, and delete your own created quotes!"
      }
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
