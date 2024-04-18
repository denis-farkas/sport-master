import Link from "next/link";
import { useState, useEffect } from "react";
import { userService } from "services";

export default Index;
// composant pour la page admin

function Index() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="p-4 adminStyle">
      <div className="container">
        <p>Tableau de Bord</p>

        {user && user.roles === "ADMIN" ? (
          <>
            <p>
              <Link href={"/users"} className="nav-link ">
                Gérer les utilisateurs
              </Link>
            </p>
            <p>
              <Link href="/horaires" className="nav-link ">
                Gérer les horaires
              </Link>
            </p>
            <p>
              <Link href="/contacts" className="nav-link ">
                Gérer les contacts
              </Link>
            </p>
            <p>
              <Link href="/spaces" className="nav-link ">
                Gérer les espaces
              </Link>
            </p>
            <p>
              <Link href="/equipments" className="nav-link ">
                Gérer les équipements
              </Link>
            </p>
            <p>
              <Link href="/trainings" className="nav-link ">
                Gérer les entrainement
              </Link>
            </p>
          </>
        ) : (
          ""
        )}
        {user && (user.roles === "ADMIN" || user.roles === "EMPLOYEE") ? (
          <>
            <p>
              <Link href="/articles" className="nav-link ">
                Gérer les Articles
              </Link>
            </p>
            <p>
              <Link href="/events" className="nav-link ">
                Gérer les evenements
              </Link>
            </p>
          </>
        ) : (
          <>
            <p> Vous n&apos;êtes pas authorisé à accéder à cet espace </p>
          </>
        )}
      </div>
    </div>
  );
}
