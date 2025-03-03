import { Blog } from "@/lib/schema";
import PostCard from "./post-card";

export default function PostList({ data }: { data: Blog[] }) {
  return data.map((blog: Blog) => (
    <PostCard
      id={blog.id}
      title={blog.title}
      thumnail={blog.thumnail}
      category={blog.category.name}
      tags={blog.tags}
      createdAt={blog.createdAt}
    />
  ));
}
