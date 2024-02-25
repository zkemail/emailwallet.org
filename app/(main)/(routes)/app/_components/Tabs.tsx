import CreateAccount from "./CreateAccount";
import Deposit from "./Deposit";
import Send from "./Send";
import TabButton from "./TabButtons";

const Tabs: React.FC<{
  selectedTab: string;
  setSelectedTab: (tab: "create" | "send" | "deposit") => void;
  // isSignedIn: boolean;
}> = ({ setSelectedTab, selectedTab }) => {
  return (
    <div className={"flex flex-col items-center gap-[1.5rem]"}>
      <div
        className={
          "flex items-center gap-5 p-[0.625rem] text-[1rem] font-medium text-primary"
        }
        style={{ borderRadius: "0.5625rem", background: "#000" }}
      >
        <TabButton
          selected={selectedTab === "create"}
          onClick={() => {
            setSelectedTab("create");
          }}
        >
          Create
        </TabButton>
        <TabButton
          selected={selectedTab === "send"}
          onClick={() => {
            setSelectedTab("send");
          }}
        >
          Send Money
        </TabButton>
        <TabButton
          selected={selectedTab === "deposit"}
          onClick={() => {
            setSelectedTab("deposit");
          }}
        >
          Deposit
        </TabButton>
      </div>
      {selectedTab === "create" && (
        <CreateAccount setSelectedTab={setSelectedTab} />
      )}
      {selectedTab === "send" && <Send />}
      {selectedTab === "deposit" && <Deposit />}
    </div>
  );
};

export default Tabs;
