import type {ReactElement, ReactNode} from "react";
import {GoldEdgeCover} from "./GoldEdgeCover.tsx";
import {Link} from "react-router-dom";
import {Stack} from "./layout.tsx";

interface ButtonInterface {
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
}

function GoldEdgeButton(
  {
    onClick,
    children,
    className
  }: ButtonInterface
): ReactElement {
  return (
    <button onClick={onClick}>
      <GoldEdgeCover>
        <p className={
          'px-2 py-1 ' +
          'bg-gradient-to-br from-green-300 to-green-500' +
          ( className ? ' ' + className : '')
        }>{children}</p>
      </GoldEdgeCover>
    </button>
  );
}

function GoldEdgeLink(
  {
    to,
    children,
    className
  }: {
    to: string;
    children?: ReactNode;
    className?: string;
  }
): ReactElement {
  return (
    <Link to={to}>
      <GoldEdgeCover>
        <p className={
          'px-2 py-1 ' +
          'bg-gradient-to-br from-green-300 to-green-500 ' +
          'text-center' +
          ( className ? ' ' + className : '')
        }>{children}</p>
      </GoldEdgeCover>
    </Link>
  );
}

function IconButton(
  {
    onClick,
    children,
    icon,
    className
  }: ButtonInterface & {
    icon?: ReactElement
  }
) {
  return (
    <button
      className={
        'border-none' +
        (className ? ' ' + className : '')
      }
      onClick={onClick}
    >
      <Stack direction={'row'}>
        {icon}
        {children}
      </Stack>
    </button>
  );
}

export {
  GoldEdgeButton,
  GoldEdgeLink,
  IconButton
}
