import React from "react";
import SquadList from "../components/squad-list/SquadList";
import Heading from "../common/Heading";

function SquadPage() {
  const squads = [
    {
      name: "Squad1",
      id: 1,
    },
    {
      name: "Squad2",
      id: 2,
    },
  ];

  return (
    <div>
      <Heading title="Squads" />
      <SquadList squads={squads} />
      <p>test</p>
    </div>
  );
}

export default SquadPage;
