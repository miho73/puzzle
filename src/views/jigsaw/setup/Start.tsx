import {EmeraldButton} from "../../components/Buttons.tsx";
import {Stack} from "../../components/layout.tsx";
import {useAppDispatch} from "../../../services/redux/hooks.ts";
import {initializePuzzle, reset} from "../../../services/redux/PuzzleSlice.ts";
import { useNavigate } from "react-router-dom";

function StartPuzzle(
  {
    cols,
    rows,
    imageUrl
  }: {
    cols?: number;
    rows?: number;
    imageUrl?: string;
  }
) {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  function startPuzzle() {
    dispatch(reset());

    dispatch(
      initializePuzzle({
        cols: cols,
        rows: rows,
        imageUrl: imageUrl
      })
    );

    navigate('/puzzle/puzzle');
  }

  return (
    <Stack className={'justify-center items-center gap-3'}>
      <p>{(cols || 0) * (rows || 0)} pcs puzzle</p>
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
