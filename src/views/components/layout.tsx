import type {ReactElement, ReactNode} from "react";
import {RoyalG53, RoyalG56} from "../../assets/royal/Svg.tsx";

function Divider(
  {
    className,
    variant
  }: {
    className?: string,
    variant?: 'g56' | 'g53'
  }
) {
  let svg: ReactElement;

  switch (variant) {
    case 'g53':
      svg = <RoyalG53 className={'fill-beige-500 mx-auto min-w-[200px] w-3/4 sm:w-1/2'}/>;
      break;
    default:
      svg = <RoyalG56 className={'fill-beige-500 mx-auto min-w-[200px] w-3/4 sm:w-1/2'}/>;
  }

  return (
    <div className={
      'my-5' +
      (className ? ' ' + className : '')
    }>
      {svg}
    </div>
  )
}

function Stack(
  {
    children,
    direction = 'col',
    className,
  }: {
    children: ReactNode,
    direction?: 'col' | 'row',
    className?: string
  }
): ReactElement {
  return (
    <div className={
      'flex ' +
      (direction === 'col' ? 'flex-col' : 'flex-row') +
      (className ? ' ' + className : '')
    }>
      {children}
    </div>
  );
}

function Center(
  {
    children
  }: {
    children: ReactNode
  }
) {
  return (
    <div className={'w-screen h-screen flex items-center justify-center flex-col'}>
      {children}
    </div>
  )
}

export {
  Stack,
  Divider,
  Center
}
