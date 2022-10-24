import React from "react";
import { Row } from "react-bootstrap";
import SquadMemberItem from "./SquadMemberItem";

function SquadMemberList({ squadMembers }) {
  console.log(squadMembers);
  return (
    <Row className="border">
      {squadMembers.map((squadmember) => {
        const { id, members, players } = squadmember;

        return (
          <SquadMemberItem
            key={id}
            id={id}
            members={members}
            players={players}
          />
        );
      })}
    </Row>
  );
}

export default SquadMemberList;
