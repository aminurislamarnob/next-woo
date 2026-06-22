"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { MenuCategory } from "@/components/layout/categories-menu";

interface HeaderSearchProps {
  categories: MenuCategory[];
  className?: string;
}

const ALL_CATEGORIES = "All Categories";

export function HeaderSearch({ categories, className }: HeaderSearchProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState<MenuCategory | null>(
    null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    const trimmed = query.trim();
    if (trimmed) params.set("search", trimmed);
    if (selected) params.set("category", selected.slug);
    router.push(`/shop${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-stretch w-full rounded-full border border-brand bg-background overflow-hidden",
        className
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1.5 whitespace-nowrap pl-5 pr-4 text-sm font-medium text-foreground outline-none">
          {selected ? selected.name : ALL_CATEGORIES}
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="max-h-80 overflow-y-auto">
          <DropdownMenuItem onSelect={() => setSelected(null)}>
            {ALL_CATEGORIES}
          </DropdownMenuItem>
          {categories.map((category) => (
            <DropdownMenuItem
              key={category.id}
              onSelect={() => setSelected(category)}
            >
              {category.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <span className="my-2 w-px bg-border" aria-hidden="true" />

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for items..."
        aria-label="Search products"
        className="flex-1 min-w-0 bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground"
      />

      <button
        type="submit"
        aria-label="Search"
        className="m-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground transition-colors hover:bg-brand-hover"
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
}
