import{
  GoldEdgeCard
} from "../../components/GoldEdgeCover.tsx";
import {Center, Divider, Stack} from "../../components/layout.tsx";
import SetupSelectImage from "./SelectImage.tsx";
import {type ReactElement, useState} from "react";
import ConfigureJigsaw from "./ConfigureJigsaw.tsx";
import StartPuzzle from "./Start.tsx";
import {Link} from "react-router-dom";

function JigsawSetup() {
  const [stage, setStage] = useState<number>(0);

  const [imageWidth, setImageWidth] = useState<number>(0);
  const [imageHeight, setImageHeight] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>('');

  const [cols, setCols] = useState<number>(0);
  const [rows, setVertical] = useState<number>(0);
  const [sCols, setSCols] = useState('');
  const [sRows, setSRows] = useState('');

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

  let title: string = '';
  let content: ReactElement = <></>;
  switch (stage) {
    case 0:
      title = 'Pick your picture';
      content = (
        <SetupSelectImage
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          setImageWidth={setImageWidth}
          setImageHeight={setImageHeight}
        />
      );
      break;
    case 1:
      title = 'Configure the puzzle';
      content = (
        <ConfigureJigsaw
          width={imageWidth}
          height={imageHeight}
          imageUrl={imageUrl}
          cols={cols}
          rows={rows}
          setCols={setCols}
          setRows={setVertical}
          sCols={sCols}
          sRows={sRows}
          setSCols={setSCols}
          setSRows={setSRows}
        />
      );
      break;
    case 2:
      title = 'Start your puzzle';
      content = (
        <StartPuzzle
          cols={cols}
          rows={rows}
          imageUrl={imageUrl}
        />
      );
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

        {content}

        <Stack
          direction={'row'}
          className={'justify-between my-3 mx-auto w-5/6'}
        >
          {stage === 0 ?
            <Link to={'/puzzle'}>&lt; Home</Link> :
            <button onClick={prevStage}>
              &lt; Prev
            </button>
          }
          <button onClick={nextStage}>
            {stage === 2 ? 'Start' : 'Next >'}
          </button>
        </Stack>
      </GoldEdgeCard>
    </Center>
  );
}

export default JigsawSetup;
