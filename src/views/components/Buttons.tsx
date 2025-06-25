import type {ReactElement, ReactNode} from "react";
import {GoldEdgeCover} from "./GoldEdgeCover.tsx";

function GoldEdgeButton(
  {
    onClick,
    children,
    className
  }: {
    onClick?: () => void;
    children?: ReactNode;
    className?: string;
  }
): ReactElement {
  return (
    <button onClick={onClick}>
      <GoldEdgeCover>
        <p className={
          'px-2 py-1 bg-gradient-to-br from-green-300 to-green-500' +
          ( className ? ' ' + className : '')
        }>{children}</p>
      </GoldEdgeCover>
    </button>
  );
}

export {
  GoldEdgeButton
}
