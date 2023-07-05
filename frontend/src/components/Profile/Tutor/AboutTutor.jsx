import React from "react";
import { useState } from "react";

import { VerifyTutor } from "./VerifyTutor";

export const AboutTutor = ({ profileId, userId, modulesOffer }) => {
  const [showUpload, setShowUpload] = useState(false);

  const closeHandler = () => {
    setShowUpload(false);
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="font-bold text-xl">Modules Offer</div>
        {profileId === userId && (
          <button
            onClick={() => setShowUpload(true)}
            className="border border-black rounded-lg px-4 py-2 hover:bg-black hover:text-white"
          >
            Verify Tutor
          </button>
        )}
      </div>
      {showUpload && <VerifyTutor closeHandler={closeHandler} />}
      <ul className="list-disc p-4">
        {modulesOffer ? (
          modulesOffer.map((module) => module && <li>{module}</li>)
        ) : (
          <p className="italic">
            This tutor does not have any verified modules
          </p>
        )}
      </ul>
    </div>
  );
};
