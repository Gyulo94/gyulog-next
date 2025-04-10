// import Banner from "@/components/banner";
// import PostList from "@/components/blog/post-list";
// import TagList from "@/components/blog/tag-list";
// import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
// // import { findByCategory } from "@/lib/actions/blog.action";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Category",
// };

// interface CategoryProps {
//   params: Promise<{ category: string }>;
//   searchParams: {
//     [key: string]: string | string[] | undefined;
//   };
// }
// export default async function CategoryPage({
//   params,
//   searchParams,
// }: CategoryProps) {
//   const { category } = await params;
//   const { page, take } = await searchParams;
//   const currentPage = parseInt((page as string) || "1");
//   const pageSize = parseInt((take as string) || "8");
//   // const getData = await findByCategory(currentPage, pageSize, category);

//   // if (!getData.blogs.length) notFound();

//   return (
//     <main>
//       <Banner data={category} />
//       <TagList />
//       <PostList />
//       <PaginationWithLinks page={currentPage} take={pageSize} totalCount={10} />
//     </main>
//   );
// }
