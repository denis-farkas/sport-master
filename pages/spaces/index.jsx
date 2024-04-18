import Link from "next/link";
import { useState, useEffect } from "react";

import { Spinner } from "components";
import { Layout } from "components/users";
import { spaceService } from "services";

export default Index;

// page pour afficher la tables spaces
function Index() {
  const [spaces, setSpaces] = useState(null);
  // recupere tout les spaces
  useEffect(() => {
    spaceService.getAll().then((x) => setSpaces(x));
  }, []);

  function deleteSpace(id) {
    setSpaces(
      spaces.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    spaceService.delete(id).then(() => {
      setSpaces((spaces) => spaces.filter((x) => x.id !== id));
    });
  }

  return (
    <Layout>
      <h1>Espaces</h1>
      <Link href="/spaces/add" className="btn btn-sm btn-success mb-2">
        Ajouter un espace
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Id</th>
            <th style={{ width: "40%" }}>Nom</th>
            <th style={{ width: "20%" }}></th>
          </tr>
        </thead>
        <tbody>
          {spaces &&
            spaces.map((space) => (
              <tr key={space.id}>
                <td>{space.id}</td>
                <td>{space.name}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    href={`/spaces/edit/${space.id}`}
                    className="btn btn-sm btn-primary me-1"
                  >
                    Modifier
                  </Link>
                  <button
                    onClick={() => deleteSpace(space.id)}
                    className="btn btn-sm btn-danger btn-delete-user"
                    style={{ width: "60px" }}
                    disabled={space.isDeleting}
                  >
                    {space.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Effacer</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          {/* si space n exite pas affiche le spinner */}
          {!spaces && (
            <tr>
              <td colSpan="4">
                <Spinner />
              </td>
            </tr>
          )}

          {/* si space  exite et la longeur n exite pas alors n affiche pas les heures */}
          {spaces && !spaces.length && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">Pas d&apos;espaces à afficher</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}
