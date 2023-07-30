import Feed from "@components/Feed";
import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Create & Share
        <br />{" "}
        <span className="orange_gradient text-center">Your Quotes Here</span>
      </h1>
      <p className="desc text-center">
      {'"Kuotes.ID is a platform for creating and sharing quotes among users in an open-source manner. Discover, create and share your interesting quotes!"'}
      </p>
      <Feed/>
    </section>
  );
}
