import getCurrentUser from "../actions/getCurrentUser";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import AllUsers from "./components/AllUsers";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
const users = await getUsers()
const currentUser = await getCurrentUser()
  return (
    <Sidebar>
        <AllUsers users={users!} currentUser={currentUser} />
      <div className="h-full bg-[#2e333d] lg:rounded-l-[20px]">{children}</div>
    </Sidebar>
  );
}
