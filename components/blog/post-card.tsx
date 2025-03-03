import { Tags } from "@/lib/schema";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function PostCard({
  id,
  title,
  thumnail,
  category,
  tags,
  createdAt,
}: {
  id: number;
  title: string;
  thumnail: string;
  category: string;
  tags: Tags[];
  createdAt: string;
}) {
  return (
    <Card className="p-2 hover:scale-105 transition-all duration-500">
      <Link href={`/${id}`}>
        <CardHeader className="pt-0 pb-4 px-0">
          <div className="relative aspect-[1.8/1] border rounded-md overflow-hidden w-full">
            <Image
              className="object-cover"
              src={thumnail}
              fill
              sizes="360px"
              priority
              alt={title}
            />
          </div>
          <div className="flex justify-start items-center py-2 gap-x-2">
            {tags.map((tag) => (
              <Badge key={tag.name} variant={"secondary"}>
                {tag.name}
              </Badge>
            ))}
          </div>
          <CardTitle>
            <h2 className="text-lg font-medium line-clamp-2">{title}</h2>
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex items-center justify-between pb-0 px-0">
          <Badge variant={"default"}>{category}</Badge>
          <p className="text-[#878787]">{createdAt}</p>
        </CardFooter>
      </Link>
    </Card>
  );
}
