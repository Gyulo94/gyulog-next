// import { findAllTags } from "@/lib/actions/tag.actions";
// import Link from "next/link";
// import { Badge } from "../ui/badge";

// interface Tag {
//   name: string;
//   _count: {
//     blogs: number;
//   };
// }

// export default async function TagList() {
//   const tags = await findAllTags();

//   return (
//     <div className="flex justify-center items-center flex-wrap gap-4">
//       {tags.map((tag: Tag) => (
//         <Link href={`/tag/${tag.name}`} key={tag.name}>
//           <Badge key={tag.name} variant={"secondary"}>
//             {tag.name + " (" + tag._count.blogs + ")"}
//           </Badge>
//         </Link>
//       ))}
//     </div>
//   );
// }
