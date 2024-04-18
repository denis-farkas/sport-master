import styles from "styles/header.module.css";
import Link from "next/link";
import ConditionalNav from "components/conditionalNav";

const Header = () => {
  return (
   
      <div className={`container-fluid    p-0 ${styles.containerHeader}`}>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link href="/" className={`navbar-brand ${styles.TitreSite}`}>
              {" "}
              Mpower Gym
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ConditionalNav />
            </div>
          </div>
        </nav>
      </div>
   
  );
};

export default Header;
