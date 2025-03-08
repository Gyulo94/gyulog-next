import Processbar from "@/components/blog/processbar";
import ScrollToTopButton from "@/components/blog/scroll-to-top-button";
import ViewCount from "@/components/blog/view-count";
import { Badge } from "@/components/ui/badge";
import { MarkdownViewer } from "@/components/ui/markdown";
import { findById } from "@/lib/actions/blog.action";
import { Blog, Tags } from "@/lib/schema";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = await params;

  const getData: Blog = await findById(id);
  const { title, category, tags, createdAt, thumnail, content, viewCnt } =
    getData;

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
          </div>
        </div>
        {thumnail && (
          <Image
            src={thumnail}
            width={0}
            height={0}
            sizes="100vw"
            alt={title}
            className="mt-8 h-auto w-full"
          />
        )}
        <MarkdownViewer source={content} className="mt-8 w-full" />
        <ViewCount viewCnt={viewCnt} />
      </div>
      <ScrollToTopButton />
    </>
  );
}
