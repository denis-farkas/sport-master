import { useState, useEffect } from "react";
import { userService, alertService } from "services";
import { useRouter } from "next/router";

const ConditionalButton = ({ props }) => {
  const router = useRouter();

  const user = props.user;
  const trainingId = props.trainingId;

  function onSuscribe(trainingId) {
    user.trainingId = trainingId;
    return userService
      .update(user.id, user)
      .then(() => {
        alertService.success("Inscription reussie", true);
        router.push("abonnement");
      })
      .catch(alertService.error);
  }

  if (!user) {
    return <button className="btnGlobal mt-2">S&apos;inscrire</button>;
  }

  if (user && user.trainingId === null) {
    return (
      <button className="btnGlobal mt-2" onClick={() => onSuscribe(trainingId)}>
        S&apos;abonner
      </button>
    );
  }

  if (user && user.trainingId !== null && user.trainingId === trainingId) {
    return <button className="btnGlobal mt-2">Vous êtes abonné</button>;
  }
};

export default ConditionalButton;
