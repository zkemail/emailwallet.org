const NavBar = () => {
  return (
    <nav className="flex justify-between px-6 py-4">
      <div className="text-lg font-bold">Sendeth</div>
      <div className="flex gap-4">
        <a
          href="https://docs.sendeth.org"
          className="text-blue-500 hover:underline"
        >
          Docs
        </a>
        <a
          href="https://github.com/zkemail/sendeth"
          className="text-blue-500 hover:underline"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
