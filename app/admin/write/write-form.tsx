"use client";

import { Input } from "@/components/ui/input";
import { MarkdownEditor } from "@/components/ui/markdown";
import SubmitButton from "@/components/ui/submitButton";
import { createMDX, createPost } from "@/lib/actions/blog.action";
import { customStyles } from "@/lib/constants";
import { Category, Tags } from "@/lib/schema";
import { format } from "date-fns";
import { Image as Photo } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import ReactSelect from "react-select/creatable";

interface WriteFormProps {
  categoryList: Category[];
  tagsList: Tags[];
}

export default function WriteForm({ categoryList, tagsList }: WriteFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const { data: session } = useSession();

  const handleImageChange = () => {
    const file = fileRef.current?.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    fileRef.current?.click();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!titleRef.current?.value || titleRef.current.value.length === 0)
      return alert("제목을 입력해주세요.");
    if (category.length === 0) return alert("카테고리를 입력해주세요.");
    if (tags.length === 0) return alert("태그를 입력해주세요.");
    if (content.length === 0) return alert("글 내용을 입력해주세요.");

    const formData = new FormData();

    formData.append("title", String(titleRef.current?.value ?? ""));
    formData.append("categoryId", String(category));
    formData.append("content", String(content));
    formData.append("userId", String(session?.user.id));

    tags.forEach((tag) => formData.append("tags[]", String(tag)));

    if (fileRef.current?.files?.[0]) {
      formData.append("thumnail", fileRef.current.files[0]);
    }

    const mdxTags = tags.join(", ");
    const mdxCategory = categoryList.find((c) => c.id === category)?.name;
    console.log("mdxTags", mdxTags);
    console.log("mdxCategory", mdxCategory);
    const createdAt = format(new Date(), "yyyy-MM-dd");
    if (!mdxCategory) {
      return alert("카테고리를 선택해주세요.");
    }
    await createMDX(
      titleRef.current?.value,
      content,
      mdxCategory,
      mdxTags,
      createdAt
    );

    const data = await createPost(formData);

    if (data.id) router.push(`/${data.id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <input
          type="file"
          accept="image/*"
          id="imageInput"
          className="hidden"
          ref={fileRef}
          onChange={handleImageChange}
        />
        {imagePreview ? (
          <Image
            src={imagePreview}
            alt="미리보기"
            width={0}
            height={0}
            sizes="100vw"
            className="cursor-pointer mx-auto h-[600px] w-full object-cover rounded-md"
            onClick={handleImageClick}
          />
        ) : (
          <div
            className="cursor-pointer mx-auto h-[600px] w-full object-cover rounded-md border flex flex-col items-center justify-center"
            onClick={handleImageClick}
          >
            <Photo size={160} className="text-gray-700" />
            <h2 className="text-gray-700 font-bold text-3xl mt-5">
              이미지를 업로드하세요.
            </h2>
          </div>
        )}
        <Input
          type="text"
          placeholder="제목"
          className="p-2 mt-5"
          ref={titleRef}
        />
        <ReactSelect
          options={
            categoryList.map((category) => ({
              value: category.id,
              label: category.name,
            })) || []
          }
          placeholder="카테고리"
          styles={customStyles}
          isMulti={false}
          onChange={(e) => e && setCategory(String(e.value))}
        />
        <ReactSelect
          options={
            tagsList.map((tag) => ({ value: tag.name, label: tag.name })) || []
          }
          placeholder="태그"
          styles={customStyles}
          isMulti
          onChange={(e) => e && setTags(e.map((tag) => tag.value))}
        />
        <MarkdownEditor
          height={500}
          value={content}
          onChange={(s) => setContent(s || "")}
        />
      </div>
      <SubmitButton className="w-full py-2 mt-4">작성하기</SubmitButton>
    </form>
  );
}
