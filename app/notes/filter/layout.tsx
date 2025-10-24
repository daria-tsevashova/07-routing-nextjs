// layout.tsx
import css from "./LayoutNotes.module.css";

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <section className={css.notesWrapper}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.container}>{children}</div>
    </section>
  );
};

export default NotesLayout;
