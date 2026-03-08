import "./Header.css";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Logo size={36} showText={true} variant="dark" />
        <span className="header__region">Edmonton, AB</span>
      </div>
    </header>
  );
}
