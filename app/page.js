import Feed from "@components/Feed";
import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br />{" "}
        <span className="orange_gradient text-center">Your Sambatan Here</span>
      </h1>
      <p className="desc text-center">
      {'SambatDotCom adalah platform kolaboratif yang memungkinkan pengguna dari berbagai latar belakang untuk bertukar gagasan, pengetahuan, dan pengalaman dalam bentuk "sambatan". '}
      </p>
      <Feed/>
    </section>
  );
}
