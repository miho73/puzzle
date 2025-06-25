import type {ReactElement, ReactNode} from "react";
import {RoyalC1} from "../../assets/royal/Svg.tsx";

function GoldEdgeCover(
  {
    children
  }: {
    children: ReactNode
  }
): ReactElement {
  return (
    <div className={
        'p-[3px] rounded-xl ' +
        'flex justify-center items-center '+
        'bg-gradient-to-br from-amber-100 via-amber-500 to-amber-500'
      }>
        <div className={
          'p-[3px] rounded-[calc(var(--radius-xl)-3px)] ' +
          'flex justify-center items-center w-full '+
          'bg-gradient-to-br to-amber-100 via-amber-500 from-amber-500'
        }>
          <div className={'rounded-[calc(var(--radius-xl)-6px)] w-full overflow-hidden'}>
            {children}
          </div>
        </div>
    </div>
  );
}

function GoldEdgeCard(
  {
    children,
    className
  }: {
    children: ReactNode;
    className?: string;
  }
): ReactElement {
  return (
    <GoldEdgeCover>
      <div className={
        'px-10 pt-15 pb-20 rounded-[calc(var(--radius-xl)-6px)] bg-beige-200 relative' +
        ( className ? ' ' + className : '')
      }>
        {children}

        <RoyalC1
          width={'20%'}
          className={'fill-beige-400 absolute left-2 bottom-2'}
        />
        <RoyalC1
          width={'20%'}
          className={'fill-beige-400 absolute left-2 top-2 transform -scale-y-100'}
        />
        <RoyalC1
          width={'20%'}
          className={'fill-beige-400 absolute right-2 bottom-2 transform -scale-x-100'}
        />
        <RoyalC1
          width={'20%'}
          className={'fill-beige-400 absolute right-2 top-2 transform -scale-x-100 -scale-y-100'}
        />
      </div>
    </GoldEdgeCover>
  );
}

export {
  GoldEdgeCover,
  GoldEdgeCard
};
