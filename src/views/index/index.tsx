import {GoldEdgeCard} from "../components/GoldEdgeCover.tsx";
import {EmeraldButton, EmeraldLink} from "../components/Buttons.tsx";
import {Divider, Stack, Center} from "../components/layout.tsx";

function Index() {
  return (
    <Center>
      <GoldEdgeCard className={'p-5'}>
        <p className={'text-center font-bold text-5xl monsieur-la-doulaise-regular'}>Puzzlit</p>
        <Divider/>

        <Stack className={'gap-3 mt-3'}>
          <EmeraldButton
            className={'text-lg'}
          >
            퍼즐 플레이
          </EmeraldButton>

          <EmeraldButton
            className={'text-lg'}
          >
            플레이 기록
          </EmeraldButton>

          <EmeraldLink
            to={'/settings'}
            className={'text-lg'}
          >
            설정
          </EmeraldLink>
        </Stack>
      </GoldEdgeCard>
    </Center>
  );
}

export default Index;
