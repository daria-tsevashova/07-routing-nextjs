"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories, Category } from "@/lib/api";
import css from "./SidebarNotes.module.css";

export default function SidebarNotes() {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories</p>;

  return (
    <ul className={css.sidebarList}>
      {categories?.map((cat) => (
        <li key={cat.id} className={css.sidebarItem}>
          {cat.name}
        </li>
      ))}
    </ul>
  );
}
