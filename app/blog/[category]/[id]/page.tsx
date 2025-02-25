import { db } from "@/lib/constants";

export default async function Page({
  params,
}: {
  params: { category: string; id: string };
}) {
  const { category, id } = await params;
  const postDetail = db.filter(
    (post) => post.category === category && post.id === id
  );
  return (
    <div className="mx-auto container">
      <h1>{postDetail[0].title}</h1>
      <p>{postDetail[0].content}</p>
    </div>
  );
}
