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
    <div
      className={"flex w-full flex-col items-center gap-[1.5rem] lg:container"}
    >
      <div
        className={
          "flex items-center justify-center gap-5 rounded-lg border border-white p-[0.625rem] text-[1rem] font-medium text-primary"
        }
        style={{
          background: "#000",
          display: "inline-flex",
        }}
      >
        {!isSignedIn ? (
          <div className={"flex flex-row items-center gap-[1.5rem]"}>
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
          </div>
        ) : (
          <div
            className={"flex flex-row items-center gap-[1.5rem] sm:gap-[1rem]"}
          >
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
          </div>
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
