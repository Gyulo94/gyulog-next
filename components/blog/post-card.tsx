import { Tags } from "@/lib/schema";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function PostCard({
  id,
  title,
  thumbnail,
  category,
  tags,
  createdAt,
}: {
  id: number;
  title: string;
  thumbnail: string;
  category: string;
  tags: Tags[];
  createdAt: string;
}) {
  return (
    <Card className="overflow-hidden md:hover:scale-105 transition-all duration-500">
      <Link href={`/${id}`}>
        <CardHeader className="pt-0 pb-4 px-0">
          <div className="relative aspect-[1.8/1]  w-full">
            <Image
              className="object-cover"
              src={thumbnail}
              fill
              sizes="360px"
              priority
              alt={title}
            />
          </div>
          <div className="flex justify-start items-center py-2 gap-x-2 px-3">
            {tags.map((tag) => (
              <Badge key={tag.name} variant={"secondary"}>
                {tag.name}
              </Badge>
            ))}
          </div>
          <CardTitle className="px-3">
            <h2 className="text-lg font-medium h-auto min-h-[56px] line-clamp-2">
              {title}
            </h2>
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex items-center justify-between border-t p-3">
          <Badge variant={"default"}>{category}</Badge>
          <p className="text-[#878787]">
            {format(new Date(createdAt), "yyyy년 M월 d일")}
          </p>
        </CardFooter>
      </Link>
    </Card>
  );
}
