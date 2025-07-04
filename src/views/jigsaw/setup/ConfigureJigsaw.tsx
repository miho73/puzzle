import {Stack} from "../../components/layout.tsx";
import Input from "../../components/Input.tsx";

function ConfigureJigsaw(
  {
    imageUrl,
    width,
    height,
    cols, setCols,
    rows, setRows,
    sCols, setSCols,
    sRows, setSRows,
  }: {
    imageUrl: string;
    width: number;
    height: number;
    cols: number;
    rows: number;
    setCols: (width: number) => void;
    setRows: (height: number) => void;
    sCols: string;
    sRows: string;
    setSCols: (value: string) => void;
    setSRows: (value: string) => void;
  }
) {
  const [a, b] = findSplit(width, height);

  function setHorizontalPieces(val: string) {
    setSCols(val);

    const num = parseInt(val);
    if(isNaN(num) || num <= 0) return;
    setCols(num);
  }
  function setVerticalPieces(val: string) {
    setSRows(val);

    const num = parseInt(val);
    if(isNaN(num) || num <= 0) return;
    setRows(num);
  }

  return (
    <Stack className={'gap-3 items-center'}>
      <img
        alt={'Selected puzzle image'}
        className={'max-w-70% max-h-[40vh] object-contain rounded-xs'}
        src={imageUrl}
      />

      <Stack className={'gap-3 w-3/4'}>
        <Stack direction={'row'} className={'justify-center items-center gap-3'}>
          <p>Pieces:</p>
          <Input
            type={'number'}
            value={sCols}
            setter={setHorizontalPieces}
          />
          <p>x</p>
          <Input
            type={'number'}
            value={sRows}
            setter={setVerticalPieces}
          />
        </Stack>
      </Stack>
      <p>Recommended to splice picture into a multiple of {a} x {b}</p>

      <p>Your image size is {width} x {height}</p>
      <p>Each piece will have a {Math.round((width/cols)/(height/rows)*100)/100 || 0} aspect ratio(w/h)</p>
    </Stack>
  );
}

const MIN_PIECE_SIZE = 5, MAX_PIECE_SIZE = 50;
function findSplit(w: number, h: number): number[] {
  const r = w / h;

  let ra = 1, rb = 1, dec = 1;

  for(let b = MIN_PIECE_SIZE; b <= MAX_PIECE_SIZE; b++) {
    const a = Math.floor(b * r);
    const decimal = a - Math.floor(a);
    if( decimal < dec) {
      ra = a;
      rb = b;
      dec = decimal;
    }
  }

  return [ra, rb];
}

export default ConfigureJigsaw;
