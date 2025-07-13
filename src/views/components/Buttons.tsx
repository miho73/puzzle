import {type ReactElement, type ReactNode} from "react";
import {Link} from "react-router-dom";
import {Stack} from "./layout.tsx";

interface ButtonInterface {
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
}

function EmeraldButton(
  {
    onClick,
    children,
    className
  }: ButtonInterface
): ReactElement {
  return (
    <button

      className={
        'border-none rounded-lg overflow-hidden px-4 py-2 ' +
        'bg-gradient-to-br from-emerald-300 to-emerald-500 ' +
        'transition duration-200 ease-in-out ' +
        'hover:from-emerald-200 hover:to-emerald-400 focus:from-emerald-200 focus:to-emerald-400 ' +
        'outline-none' +
        ( className ? ' ' + className : '')
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function EmeraldLink(
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
    <Link
      to={to}
      className={
        'border-none rounded-lg overflow-hidden px-4 py-2 text-center ' +
        'bg-gradient-to-br from-emerald-300 to-emerald-500 ' +
        'transition transform-gpu duration-200 ease-in-out ' +
        'hover:from-emerald-200 hover:to-emerald-400 focus:from-emerald-200 focus:to-emerald-400 focus:scale-105 ' +
        'outline-none' +
        ( className ? ' ' + className : '')
      }
    >
      {children}
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

function SelectionRotationSwitch(
  {
    options,
    selected,
    setter,
    className
  }: {
    options: string[];
    selected: number;
    setter?: (selectedIdx: number) => void;
    className?: string;
  }
) {
  function onClick() {
    let newIndex = selected + 1;

    if(options.length == newIndex) newIndex = 0;

    if(!setter) return;
    setter(newIndex);
  }

  return (
    <button
      onClick={onClick}
      className={
        (className ? ' ' + className : '')
      }
    >
      {options[selected]}
    </button>
  );
}

export {
  EmeraldButton,
  EmeraldLink,
  IconButton,
  SelectionRotationSwitch
}
