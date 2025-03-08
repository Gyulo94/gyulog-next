"use client";
import { postViewCookie } from "@/lib/actions/blog.action";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ViewCount({ viewCnt }: { viewCnt: number }) {
  const id = Number(useParams().id);
  const [hasFetched, setHasFetched] = useState(false);
  const [viewCount, setViewCount] = useState<number>(viewCnt);

  useEffect(() => {
    const viewCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`viewed_${id}`));

    const fetchViewCookie = async (id: number) => {
      const cookie = await postViewCookie(id);
      console.log("cookie", cookie);

      if (cookie) {
        document.cookie = `viewed_${id}=true; max-age=86400; path=/`;
        setViewCount((prev) => (prev !== null ? prev + 1 : prev));
      }
    };

    if (!viewCookie && !isNaN(id) && !hasFetched) {
      fetchViewCookie(id);
      setHasFetched(true);
    }
  }, [id, hasFetched]);
  return (
    <p className="text-right text-sm text-gray-500">{`${viewCount} 조회`}</p>
  );
}
