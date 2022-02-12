import React from "react";

import { STAGE_HEIGHT, STAGE_WIDTH } from "../constants";
import { STAGE } from "../types";
import Cell from "./Cell";

type Props = {
  stage: STAGE;
};

const Stage: React.FC<Props> = ({ stage }) => {
  return (
    <div className="grid grid-cols-12 grid-rows-[20] gap-[1px] bg-gray-700">
      {stage.map((row, rowIndex) =>
        row.map((cell, cellIndex) => <Cell key={`${rowIndex}_${cellIndex}`} type={cell[0]} />)
      )}
    </div>
  );
};

export default Stage;
