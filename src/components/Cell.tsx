import React from "react";

import { TETROMINOS } from "../constants";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

type Props = {
  type: keyof typeof TETROMINOS;
};

const Cell: React.FC<Props> = ({ type }) => {
  const shapeColor = TETROMINOS[type].color;

  return <div className={classNames(`h-8 w-8 ${shapeColor}`)} />;
};

export default React.memo(Cell);
