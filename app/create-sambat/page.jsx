"use client";
import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
const CreateSambat = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    sambat: "",
    tag: "",
  });

  const createSambat = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/sambat/new", {
        method: "POST",
        body: JSON.stringify({
          sambat: post.sambat,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type={"Create"}
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createSambat}
    />
  );
};

export default CreateSambat;
