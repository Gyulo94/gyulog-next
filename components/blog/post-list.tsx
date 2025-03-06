import { Blog } from "@/lib/schema";
import PostCard from "./post-card";

export default function PostList({ data }: { data: Blog[] }) {
  return (
    <div className="h-auto min-h-[844.22px]">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-6 pb-24 px-5 lg:gap-x-7 lg:gap-y-12 mt-14">
        {data.map((blog: Blog) => (
          <PostCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            thumnail={blog.thumnail}
            category={blog.category.name}
            tags={blog.tags}
            createdAt={blog.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
