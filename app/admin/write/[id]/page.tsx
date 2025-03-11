import { findById } from "@/lib/actions/blog.action";
import { findAllCategory } from "@/lib/actions/category.actions";
import { findAllTags } from "@/lib/actions/tag.actions";
import { getServerAuthSession } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import WriteForm from "../write-form";

export const metadata: Metadata = {
  title: "Write",
};

export default async function WritePage(props: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await props.params;
  const session = await getServerAuthSession();
  console.log(session);

  if (!session || !session.user) redirect("/admin/login");
  const getData = await findById(id);
  const category = await findAllCategory();
  const tags = await findAllTags();
  return (
    <div className="container mx-auto flex flex-col px-4 pb-20 pt-12">
      <h1 className="mb-8 text-2xl font-medium">새로운 글</h1>
      <WriteForm categoryList={category} tagsList={tags} editData={getData} />
    </div>
  );
}
