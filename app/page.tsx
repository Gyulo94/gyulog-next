import Banner from "@/components/banner";
import PostList from "@/components/blog/post-list";
import TagList from "@/components/blog/tag-list";
import Container from "@/components/shared/container";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { findAll } from "@/lib/actions/blog.action";

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

  return (
    <Container>
      <Banner data="gyulog" />
      <TagList />
      <PostList data={getData.blogs} />
      <PaginationWithLinks
        page={currentPage}
        take={pageSize}
        totalCount={getData.totalCount}
      />
    </Container>
  );
}
