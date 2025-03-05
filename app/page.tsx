import Banner from "@/components/banner";
import PostList from "@/components/blog/post-list";
import TagList from "@/components/blog/tag-list";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { findAll } from "@/lib/actions/blog.action";
import { notFound } from "next/navigation";

interface HomeProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
export default async function Home({ searchParams }: HomeProps) {
  const { page, take } = await searchParams;
  const currentPage = parseInt((page as string) || "1");
  const pageSize = parseInt((take as string) || "8");
  const getData = await findAll(currentPage, pageSize);

  if (!getData.blogs.length) notFound();
  return (
    <div className="mx-auto container">
      <Banner data="gyulog" />
      <TagList />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-6 pb-24 px-5 lg:gap-x-7 lg:gap-y-12 mt-14">
        <PostList data={getData.blogs} />
      </div>
      <PaginationWithLinks
        page={currentPage}
        take={pageSize}
        totalCount={getData.totalCount}
      />
    </div>
  );
}
