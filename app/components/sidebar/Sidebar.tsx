import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

export default async function Sidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <div className="w-full">
      <DesktopSidebar user={currentUser!} />
      {/*<MobileFooter user={currentUser!} />*/}
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}
