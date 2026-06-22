import Link from "next/link";
import { ChevronDown } from "lucide-react";

import type { ProductCategory } from "@/lib/woocommerce.d";

export type MenuCategory = Pick<ProductCategory, "id" | "name" | "slug">;

interface CategoriesMenuProps {
  categories: MenuCategory[];
}

export function CategoriesMenu({ categories }: CategoriesMenuProps) {
  return (
    <div className="relative group">
      <button
        type="button"
        className="flex items-center gap-1.5 text-sm font-semibold outline-none"
        aria-haspopup="true"
      >
        {/* Underline wipes in left -> right on hover, like the reference theme */}
        <span className="bg-[linear-gradient(to_right,hsl(var(--brand)),hsl(var(--brand)))] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-100 ease-linear group-hover:bg-[length:100%_1px] group-focus-within:bg-[length:100%_1px]">
          Categories
        </span>
        <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-150 group-hover:rotate-180" />
      </button>

      {/*
        pt-[10px] is the transparent hover bridge / gap (matches reference).
        Asymmetric timing: close uses the base transition (80ms, no delay);
        open uses the group-hover transition (120ms with an 80ms delay).
      */}
      <div
        className="absolute left-0 top-full z-[60] pt-[10px] invisible translate-y-[5px] opacity-0 pointer-events-none transition-[opacity,transform,visibility] duration-[80ms] delay-0 ease-linear group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:duration-[120ms] group-hover:delay-[80ms] group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:pointer-events-auto group-focus-within:duration-[120ms] group-focus-within:delay-[80ms]"
      >
        <div className="max-h-96 w-56 overflow-y-auto bg-popover py-5 text-popover-foreground">
          {categories.length === 0 ? (
            <span className="block px-[30px] py-2.5 text-sm text-muted-foreground">
              No categories
            </span>
          ) : (
            categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop/category/${category.slug}`}
                className="block px-[30px] py-2.5 text-sm outline-none transition-colors hover:text-brand focus-visible:text-brand"
              >
                {category.name}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
