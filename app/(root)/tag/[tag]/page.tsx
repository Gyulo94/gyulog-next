// import Banner from "@/components/banner";
// import PostList from "@/components/blog/post-list";
// import TagList from "@/components/blog/tag-list";
// import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
// // import { findByTag } from "@/lib/actions/blog.action";

// interface TagProps {
//   params: {
//     tag: string;
//   };
//   searchParams: {
//     [key: string]: string | string[] | undefined;
//   };
// }
// export default async function CategoryPage({ params, searchParams }: TagProps) {
//   const { tag } = await params;
//   const { page, take } = await searchParams;
//   const currentPage = parseInt((page as string) || "1");
//   const pageSize = parseInt((take as string) || "8");
//   // const getData = await findByTag(currentPage, pageSize, tag);

//   // if (!getData.blogs.length) notFound();

//   return (
//     <main>
//       <Banner data={tag} />
//       <TagList />
//       <PostList />
//       <PaginationWithLinks page={currentPage} take={pageSize} totalCount={10} />
//     </main>
//   );
// }
