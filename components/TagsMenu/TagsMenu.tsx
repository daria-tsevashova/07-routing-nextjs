"use client";

import { useEffect, useState } from "react";
import css from "./TagsMenu.module.css";
import { tags } from "@/types/note";
import Link from "next/link";

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const handleMenuToggle = () => setIsOpen((prev) => !prev);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={handleMenuToggle}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href="/notes/filter/all"
              className={css.menuLink}
              onClick={() => setIsOpen(false)}
            >
              All notes
            </Link>
          </li>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={() => setIsOpen(false)}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
