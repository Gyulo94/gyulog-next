"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { category } from "@/lib/constants";
import Link from "next/link";

export function MobileMenuButton() {
  return (
    <div>
      <Sheet key={"left"}>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <Icons.menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <ul className="grid w-full gap-3 p-4">
            <h2 className="font-bold">카테고리</h2>
            {category.map((category) => (
              <Link
                className="p-2 hover:bg-secondary rounded-md"
                key={category.title}
                href={category.href}
              >
                <p className="font-semibold">{category.title}</p>
              </Link>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
}
