import Banner from "@/components/banner";
import PostList from "@/components/blog/post-list";
import { db } from "@/lib/constants";

export default function Home() {
  return (
    <div className="mx-auto container">
      <Banner data="gyulog" />
      <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-6 pb-24 px-5 lg:gap-x-7 lg:gap-y-12 mt-10">
        <PostList data={db} />
      </div>
    </div>
  );
}
