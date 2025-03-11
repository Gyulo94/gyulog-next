import Comments from "@/components/blog/Comment/comments";
import { DeleteButton } from "@/components/blog/delete-button";
import Processbar from "@/components/blog/processbar";
import ScrollToTopButton from "@/components/blog/scroll-to-top-button";
import ViewCount from "@/components/blog/view-count";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { MarkdownViewer } from "@/components/ui/markdown";
import { findById } from "@/lib/actions/blog.action";
import { Blog, Tags } from "@/lib/schema";
import { format } from "date-fns";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";

// const getPost = cache(async (id: number) => {
//   const post = await findById(id);
//   return post;
// })

export async function generateMetadata({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> {
  const { id } = await params;
  const getData: Blog = await findById(id);
  const { title, thumbnail, content } = getData;
  return {
    title,
    description: content,
    openGraph: {
      images: [
        {
          url: "http://localhost:8000/" + thumbnail,
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = await params;

  const getData: Blog = await findById(id);
  const { title, category, tags, createdAt, thumbnail, content, viewCnt } =
    getData;

  const session = await getServerSession(authOptions);

  return (
    <>
      <Processbar />
      <div className="mx-auto container h-auto min-h-full flex flex-col px-4 pt-20">
        <h1 className="mb-8 text-4xl font-bold">{title}</h1>
        <div className="flex flex-row items-center justify-between">
          <div className="flex gap-2">
            <Link href={`/category/${category.name}`}>
              <Badge variant="default">{category.name}</Badge>
            </Link>
            {tags.map((tag: Tags) => (
              <Link href={`/tag/${tag.name}`} key={tag.name}>
                <Badge key={tag.name} variant="secondary">
                  {tag.name}
                </Badge>
              </Link>
            ))}
          </div>
          <div className="text-sm text-gray-500">
            {format(new Date(createdAt), "yyyy년 M월 d일 HH:mm")}
            {session && session.user && (
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/admin/write/${id}`}>
                    <Icons.edit className="w-6 h-6" />
                  </Link>
                </Button>

                <DeleteButton id={id} />
              </div>
            )}
          </div>
        </div>
        {thumbnail && (
          <Image
            src={thumbnail}
            width={0}
            height={0}
            sizes="100vw"
            alt={title}
            className="mt-8 h-auto w-full"
          />
        )}
        <MarkdownViewer source={content} className="mt-8 w-full" />
        <ViewCount viewCnt={viewCnt} />
        <Comments blogId={id} />
      </div>
      <ScrollToTopButton />
    </>
  );
}
