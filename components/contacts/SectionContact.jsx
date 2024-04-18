import { contactService } from "services";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "styles/article.module.css";

export { SectionEvent };

function SectionEvent() {
  const [contacts, setContacs] = useState(null);
  useEffect(() => {
    contactService.getVarious().then((x) => setContacs(x));
  }, []);

  return (
    <>
      <article>
        <div className={styles.actu}>
          <h2 className="text-center">ACTUALITÉS MPOWER GYM</h2>

          <p className="mt-3 text-center">DÉCOUVREZ NOS DERNIERS EVENEMENTS A VENIR</p>
          <div className={styles.trait}></div>
        </div>
        <div className="container mt-5   ">
          <div className="row ">
            {contacts &&
              contacts.map((contact) => (
                <div className="col-lg-4" key={contact.id}>
                  <div className={styles.txtBas}>
                  <img
                      className="img-fluid"
                      src={`/img/${contact.image}`}
                      alt="repas "
                    />
                    <div className={styles.separation}></div>
                    <div className={styles.blocCard}>
                      <h4 className={styles.titreBlog}>{contact.title}</h4>
                      <div className={styles.trait2}></div>
                      <Link
                        className={styles.liensEvent}
                        href={`/contact/${contact.id}`}
                      >
                        Lire la suite
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </article>
    </>
  );
}