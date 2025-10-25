// app/notes/filter/layout.tsx
import NotesLayout from "@/app/notes/layout";
import SidebarNotes from "@/app/notes/filter/@sidebar/default";

export default function FilterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NotesLayout sidebar={<SidebarNotes />}>{children}</NotesLayout>;
}
