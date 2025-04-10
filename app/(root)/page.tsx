import Banner from "@/components/banner";
import PostList from "@/components/blog/post-list";
// import TagList from "@/components/blog/tag-list";
// import { findAll } from "@/lib/actions/blog.action";

interface HomeProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
export default async function Home({ searchParams }: HomeProps) {
  const { page, take } = await searchParams;
  const currentPage = parseInt((page as string) || "1");
  const pageSize = parseInt((take as string) || "8");
  // const getData = await findAll(currentPage, pageSize);

  return (
    <main>
      <Banner data="gyulog" />
      {/* <TagList /> */}
      <PostList />
      {/* <PaginationWithLinks page={currentPage} take={pageSize} totalCount={10} /> */}
    </main>
  );
}
