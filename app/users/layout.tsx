import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import AllUsers from "./components/AllUsers";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
const users = await getUsers()
  return (
    <Sidebar>
        <AllUsers users={users!}/>
      <div className="h-full bg-[#2e333d] rounded-l-[20px]">{children}</div>
    </Sidebar>
  );
}
