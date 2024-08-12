import getAllConversations from "../actions/getAllConversations";
import getConversations from "../actions/getConversationsById";
import getPinnedChat from "../actions/getPinnedChat";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import AllConversation from "./components/AllConversation";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getAllConversations();
  const users = await getUsers();
  const pinned = await getPinnedChat();
  return (
    <Sidebar>
      <AllConversation
        conversations={conversations!}
        users={users!}
        pinned={pinned!}
      />
      <div className="h-full bg-[#2e333d] rounded-l-[20px]">{children}</div>
    </Sidebar>
  );
}
