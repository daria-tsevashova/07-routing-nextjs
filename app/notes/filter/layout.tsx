import { ReactNode } from "react";
import SidebarNotes from "./@sidebar/default";
import css from "./LayoutNotes.module.css";

type Props = {
  children: ReactNode;
};

export default function NotesLayout({ children }: Props) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>
        <SidebarNotes />
      </aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}
