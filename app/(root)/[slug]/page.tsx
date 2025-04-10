import Processbar from "@/components/blog/processbar";
import ScrollToTopButton from "@/components/blog/scroll-to-top-button";
// import { findById } from "@/lib/actions/blog.action";

// const getPost = cache(async (id: number) => {
//   const post = await findById(id);
//   return post;
// })

// export async function generateMetadata(props: {
//   params: Promise<{ id: number }>;
// }): Promise<Metadata> {
//   const { id } = await props.params;
//   const getData: Blog = await findById(id);
//   const { title, thumbnail, content } = getData;
//   return {
//     title,
//     description: content,
//     openGraph: {
//       images: [
//         {
//           url: process.env.SERVER_URL + "/" + thumbnail,
//         },
//       ],
//     },
//   };
// }

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  // const getData: Blog = await findById(id);
  // const { title, category, tags, createdAt, thumbnail, content, viewCnt } =
  //   getData;

  // const session = await auth();

  return (
    <>
      <Processbar />
      <div className="mx-auto container h-auto min-h-full flex flex-col px-4 pt-20">
        {/* <h1 className="mb-8 text-4xl font-bold">{title}</h1>
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
        <Comments blogId={id} /> */}
      </div>
      <ScrollToTopButton />
    </>
  );
}
