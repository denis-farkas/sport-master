import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Layout, ViewEvent } from "components/events";
import { Spinner } from "components";
import { eventService, alertService } from "services";

export default Event;

function Event() {
  const router = useRouter();
  const [event, setEvent] = useState(null);

  // recupere l id dans le query du chemin
  useEffect(() => {
    const { id } = router.query;
    if (!id) return;

    // fetch event and set default form values if in edit mode
    eventService
      .getById(id)
      .then((x) => setEvent(x))
      .catch(alertService.error);
  }, [router]);
  {if (event){
    return (
      <Layout>
    <>
    <h1>{event.title}</h1>
            <p>{event.description}</p>
            <img className="img-fluid" src={`/img/${event.image}`}  alt={`${event.title}`}  />  
            <p>{event.rdv}</p>
    </>
</Layout>)
  } else {
    return(
    <Layout>
    <Spinner/>
    </Layout>
    )
  }}
}