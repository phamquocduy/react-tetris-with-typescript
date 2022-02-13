import React from "react";

import Cell from "./Cell";
import { STAGE } from "../types";

type Props = {
  stage: STAGE;
};

const Stage: React.FC<Props> = ({ stage }) => {
  return (
    <div className="grid grid-cols-12 grid-rows-[20] gap-[1px] bg-gray-700">
      {stage.map((row, y) => row.map((cell, x) => <Cell key={`${y}_${x}`} type={cell[0]} />))}
    </div>
  );
};

export default Stage;
