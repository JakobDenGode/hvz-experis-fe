import React from "react";
import SquadList from "../components/squad-list/SquadList";

function SquadPage() {
  const squads = [
    {
      squadName: "squad1",
      squadId: 1,
    },
    {
      name: "squad2",
      squadId: 2,
    },
  ];

  return (
    <div>
      SquadPage
      <SquadList />
    </div>
  );
}

export default SquadPage;
