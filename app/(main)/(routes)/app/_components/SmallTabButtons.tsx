const SmallTabButton: React.FC<{
  selected: boolean;
  children: React.ReactNode;
  onClick: () => void;
}> = (props) => {
  return (
    <div
      style={{
        background: props.selected ? "#ffffff10" : "#FFFFFF40",
        margin: "0.5rem",
        // borderBottom: props.selected ? "none" : "1px solid white",
        zIndex: props.selected ? 2 : 1,
        width: "100%",
      }}
      className={`flex cursor-pointer items-center justify-center rounded-[calc(var(--radius))] text-center ${
        props.selected ? "text-white" : "text-[#999999]"
      } px-4 py-3 transition-transform duration-300 ease-in-out`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default SmallTabButton;
