import React from "react";
import { Row } from "react-bootstrap";
import SquadMemberItem from "./SquadMemberItem";

function SquadMemberList({ squadMembers }) {
  console.log(squadMembers);
  return (
    <Row className="">
      {squadMembers.map((squadmember) => {
        const { id, rank, member } = squadmember;

        return <SquadMemberItem key={id} id={id} rank={rank} member={member} />;
      })}
    </Row>
  );
}

export default SquadMemberList;
