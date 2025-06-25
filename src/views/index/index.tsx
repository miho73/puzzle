import {GoldEdgeCard} from "../components/GoldEdgeCover.tsx";
import {GoldEdgeButton} from "../components/Buttons.tsx";
import {Divider, Stack} from "../components/layout.tsx";

function Index() {
  return (
    <div className={'w-screen h-screen flex items-center justify-center flex-col'}>
      <GoldEdgeCard className={'p-5'}>
        <p className={'text-center font-bold text-5xl monsieur-la-doulaise-regular'}>Puzzlit</p>

        <Divider/>

        <Stack className={'gap-2.5 mt-3'}>
          <GoldEdgeButton
            className={'text-lg'}
          >
            퍼즐 플레이
          </GoldEdgeButton>

          <GoldEdgeButton
            className={'text-lg'}
          >
            플레이 기록
          </GoldEdgeButton>

          <GoldEdgeButton
            className={'text-lg'}
          >
            설정
          </GoldEdgeButton>
        </Stack>
      </GoldEdgeCard>
    </div>
  );
}

export default Index;
