import React from "react";

import { classNames } from "../utils/common";
import { TETROMINOS } from "../constants";

type Props = {
  type: keyof typeof TETROMINOS;
};

const Cell: React.FC<Props> = ({ type }) => {
  const shapeColor = TETROMINOS[type].color;

  return <div className={classNames(`h-8 w-8 ${shapeColor}`)}></div>;
};

export default React.memo(Cell);
