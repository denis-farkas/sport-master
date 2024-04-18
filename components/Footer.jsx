import React from "react";
import styles from "styles/footer.module.css";
import { SectionHoraire } from "./horaires";
import Link from "next/link";
import { useState, useEffect } from "react";
import { userService } from "services";

const Footer = () => {

  const [user, setUser] = useState(null);
// le useEffect a l ouverture de la page et éxécute les fonctions qui sont a l 'interieur
  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);


  return (
    <footer className={` pt-5  ${styles.couleurFooter}`}>
      <div className="container">
        <div className="row contenu-footer">
          <div className="col-lg-4">
            <h4>Mpower Gym</h4>
            <div className={styles.trait}></div>
            <ul className={`lh-lg ${styles.liste}`}>
              <li> Adresse : Rue Théroigne</li>
              <li> de Méricourt, 75000 Paris</li>
              <li> numéros : 01 20 65 75 89</li>
              <li> email : mpowergym@gmail.com</li>
            </ul>
          </div>

          <div className="col-lg-4">
            <h4> Aide & Informations</h4>
            <div className={styles.trait}></div>
            <ul className={`lh-lg ${styles.liste}`}>
            {/* si il est admin ou employe il peut acceder au dashboard */}
            {user && (user.roles === "ADMIN" || user.roles === "EMPLOYEE") ? (
                <li className="nav-item">
                  <Link href={"/admin"} className="btn btn-sm boutons-footer mb-2 liensFooterAdmin">
                    Administration
                  </Link>
                 
                </li>
              ) : (
                ""
              )}
              <li className="nav-item">
                <Link
                  href="/contacts/add"
                  className="btn btn-sm boutons-footer mb-2 liensFooterAdmin "
                >
                  Contacter MpowerGym
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/articles/listeArticles"
                  className="btn btn-sm boutons-footer mb-2 liensFooterAdmin"
                >
                 Lire nos articles
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/events/listeEvents"
                  className="btn btn-sm boutons-footer mb-2 liensFooterAdmin"
                >
                 Lire nos événements
                </Link>
              </li>
          
              
            </ul>
          </div>

          <div className="col-lg-4">
            <h4>Horaires</h4>
            <div className={styles.trait}></div>
          <SectionHoraire/>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
