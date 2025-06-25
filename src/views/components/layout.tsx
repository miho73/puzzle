import type {ReactElement, ReactNode} from "react";
import {RoyalG56} from "../../assets/royal/Svg.tsx";

function Divider(
  {
    className
  }: {
    className?: string
  }
) {
  return (
    <div className={
      'my-5' +
      (className ? ' ' + className : '')
    }>
      <RoyalG56 width={'70%'} className={'fill-beige-500 mx-auto'}/>
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

export {
  Stack,
  Divider
}
