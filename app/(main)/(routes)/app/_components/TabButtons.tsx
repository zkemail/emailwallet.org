const TabButton: React.FC<{
  selected: boolean;
  children: React.ReactNode;
  onClick: () => void;
}> = (props) => {
  return (
    <div
      style={{
        background: props.selected
          ? `linear-gradient(179deg, rgba(255, 255, 255, 0.20) 0.8%, rgba(255, 255, 255, 0.00) 144.46%)`
          : "",
      }}
      className={`cursor-pointer rounded-md px-[1rem] py-[0.625rem] text-white`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default TabButton;
