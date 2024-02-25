import CreateAccount from "./CreateAccount";
import Deposit from "./Deposit";
import LoginAccount from "./LoginAccount";
import Send from "./Send";
import TabButton from "./TabButtons";
import ViewAssets from "./ViewAssets";

const Tabs: React.FC<{
  selectedTab: string;
  setSelectedTab: (
    tab: "create" | "send" | "deposit" | "login" | "view",
  ) => void;
  setSignedInState: (state: boolean) => void;
  isSignedIn: boolean;
}> = ({ selectedTab, setSelectedTab, setSignedInState, isSignedIn }) => {
  return (
    <div className={"flex flex-col items-center gap-[1.5rem]"}>
      <div
        className={
          "flex items-center gap-5 p-[0.625rem] text-[1rem] font-medium text-primary"
        }
        style={{ borderRadius: "0.5625rem", background: "#000" }}
      >
        {!isSignedIn ? (
          <>
            <TabButton
              selected={selectedTab === "create"}
              onClick={() => {
                setSelectedTab("create");
              }}
            >
              Create
            </TabButton>
            <TabButton
              selected={selectedTab === "login"}
              onClick={() => {
                setSelectedTab("login");
              }}
            >
              Login
            </TabButton>
          </>
        ) : (
          <>
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
            <TabButton
              selected={selectedTab === "view"}
              onClick={() => {
                setSelectedTab("view");
              }}
            >
              View Assets
            </TabButton>
          </>
        )}
      </div>
      {selectedTab === "create" && (
        <CreateAccount
          setSelectedTab={setSelectedTab}
          setSignedInState={setSignedInState}
        />
      )}
      {selectedTab === "send" && <Send />}
      {selectedTab === "login" && (
        <LoginAccount
          setSelectedTab={setSelectedTab}
          setSignedInState={setSignedInState}
        />
      )}
      {selectedTab === "view" && <ViewAssets setSelectedTab={setSelectedTab} />}
      {selectedTab === "deposit" && <Deposit setSelectedTab={setSelectedTab} />}
    </div>
  );
};

export default Tabs;
