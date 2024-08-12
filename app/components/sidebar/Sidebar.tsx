import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";

export default async function Sidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <div className="w-full">
      <DesktopSidebar user={currentUser!} />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}
