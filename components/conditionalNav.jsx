import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';

import styles from "styles/header.module.css";

const ConditionalNav = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // s abonne a l'observable userservice a chaque mise a jour , le setter() met a jour l utilisateur
      const subscription = userService.user.subscribe(x => setUser(x));
      return () => subscription.unsubscribe();
  }, []);


  if (user ) {
    return (
      <>
        <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink href={"/"} className="nav-link ">
              {" "}
              Accueil
            </NavLink>
          </li>

          {/* <li className="nav-item">
            <NavLink href={"/"} className="nav-link ">
              Concept
            </NavLink>
          </li> */}

          <li className="nav-item">
            <NavLink href={"/monclub"} className="nav-link ">
              Notre Club
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink href={"/abonnement"} className="nav-link ">
              Abonnement
            </NavLink>
          </li>
          <li className="nav-item">
          <p className='membreP'>
        <span>Membre connecté(e) : </span>
              {user.firstName}
          </p>
          </li>
        </ul>
               
        <button onClick={userService.logout} className="btn btn-link nav-item nav-link">Se déconnecter</button>


    
      </>
    );
  } else {
    return (
      <>
        <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
          <li className="nav-item " >
            <NavLink href="/" className={`nav-link ${styles.menuItem}`}>
              Accueil
            </NavLink>
          </li>

          {/* <li className="nav-item">
            <NavLink href="/" className="nav-link ">
              Concept
            </NavLink>
          </li> */}

          <li className="nav-item">
            <NavLink href="/monclub" className={`nav-link ${styles.menuItem}`}>
              Mon Club
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink href={"/abonnement"} className={`nav-link ${styles.menuItem}`}>
              Abonnement
            </NavLink>
          </li>
        </ul>

        <ul className="navbar-nav d-flex  align-items-center  ">
          <li className="nav-item navigationBoutons ">
            <NavLink href={"/account/register"} className={` ${styles.btnInscription}  `}>
              S&apos;inscrire
            </NavLink>
          </li>

          <li className="nav-item ">
            <NavLink href="/" className="  nav-NavLink">
              <img src="/img/Icon.png" alt="Logo " className={styles.imgLogo} />
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              href={"/account/login"}
              className={`nav-link ${styles.btnConnection} `}
            >
              Se connecter
            </NavLink>
          </li>
        </ul>
      </>
    );
  }
};

export default ConditionalNav;
