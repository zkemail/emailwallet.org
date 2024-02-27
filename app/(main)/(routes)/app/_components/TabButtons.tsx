const TabButton: React.FC<{
  selected: boolean;
  children: React.ReactNode;
  onClick: () => void;
}> = (props) => {
  return (
    <div
      style={{
        background: props.selected ? "rgba(255, 255, 255, 0.25)" : "",
      }}
      className={`flex cursor-pointer items-center justify-center rounded-md px-[1rem] py-[0.625rem] text-center text-white`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default TabButton;
