const SmallTabButton: React.FC<{
  selected: boolean;
  children: React.ReactNode;
  onClick: () => void;
}> = (props) => {
  return (
    <div
      style={{
        background: props.selected ? "black" : "lightgray",
        borderTop: props.selected ? "1px solid white" : "none",
        borderLeft: props.selected ? "1px solid white" : "none",
        borderRight: props.selected ? "1px solid white" : "none",
        borderBottom: props.selected ? "none" : "1px solid white",
        borderTopLeftRadius: "calc(var(--radius) + 12px)",
        borderTopRightRadius: "calc(var(--radius) + 12px)",
        zIndex: props.selected ? 2 : 1,
        width: "100%",
      }}
      className={`flex cursor-pointer items-center justify-center text-center ${
        props.selected ? "text-white" : "text-[#999999]"
      } px-4 py-3 transition-transform duration-300 ease-in-out`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default SmallTabButton;
