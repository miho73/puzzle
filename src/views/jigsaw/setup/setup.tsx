import{
  GoldEdgeCard
} from "../../components/GoldEdgeCover.tsx";
import {Center, Divider, Stack} from "../../components/layout.tsx";
import SetupSelectImage from "./SelectImage.tsx";
import {useState} from "react";

function JigsawSetup() {
  const [stage, setStage] = useState<number>(0);

  function nextStage() {
    if (stage < 2) {
      setStage(stage + 1);
    }
  }
  function prevStage() {
    if (stage > 0) {
      setStage(stage - 1);
    }
  }

  let title = '';
  switch (stage) {
    case 0:
      title = 'Pick your picture';
      break;
    case 1:
      title = 'Configure the puzzle';
      break;
    case 2:
      title = 'Start your puzzle';
      break;
    default:
      title = 'Setup Jigsaw Puzzle';
      break;
  }

  return (
    <Center>
      <GoldEdgeCard>
        <p className={'text-center font-bold text-2xl'}>{title}</p>

        <Divider/>

        <SetupSelectImage/>

        <Stack direction={'row'} className={'justify-between my-3'}>
          <button onClick={prevStage}>
            {stage === 0 ? '' : '< Prev'}
          </button>
          <button onClick={nextStage}>
            {stage === 2 ? 'Start' : 'Next >'}
          </button>
        </Stack>
      </GoldEdgeCard>
    </Center>
  );
}

export default JigsawSetup;
