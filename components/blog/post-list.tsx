import PostCard from "./post-card";

export default function PostList({ data }: { data?: any }) {
  return data.map((post: any) => (
    <PostCard
      id={post.id}
      title={post.title}
      thumnail={post.thumnail}
      category={post.category}
      tags={post.tags || []}
      createdAt={post.createdAt}
    />
  ));
}
