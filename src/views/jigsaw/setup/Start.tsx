import {EmeraldButton} from "../../components/Buttons.tsx";
import {Stack} from "../../components/layout.tsx";
import {useAppDispatch} from "../../../services/redux/hooks.ts";
import {initializePuzzle, reset} from "../../../services/redux/PuzzleSlice.ts";
import { useNavigate } from "react-router-dom";

function StartPuzzle(
  {
    horizontalPieces,
    verticalPieces,
    imageData
  }: {
    horizontalPieces?: number;
    verticalPieces?: number;
    imageData?: ArrayBuffer | null;
  }
) {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  function startPuzzle() {
    dispatch(reset());

    dispatch(
      initializePuzzle({
        horizontalPieces: horizontalPieces,
        verticalPieces: verticalPieces,
        imageData: imageData
      })
    );

    navigate('/puzzle');
  }

  return (
    <Stack className={'justify-center items-center gap-3'}>
      <EmeraldButton
        className={'mx-auto'}
        onClick={startPuzzle}
      >
        Start
      </EmeraldButton>
    </Stack>
  );
}

export default StartPuzzle;
