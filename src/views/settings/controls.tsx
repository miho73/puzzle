import { Stack } from "../components/layout.tsx";

function Controls() {
  return (
    <Stack className={'text-center gap-1 max-h-[50vh] overflow-y-auto text-sm'}>
      <p className={'font-bold text-xl'}>Controls</p>
      <div className={'grid grid-cols-3 gap-y-1'}>
        <p className={'border-b border-beige-600 py-1'}>Action</p>
        <p className={'border-b border-beige-600 py-1'}>Mapping</p>
        <p className={'border-b border-beige-600 py-1'}>Second Mapping</p>

        <p>Translate Left</p>
        <p>w</p>
        <p>Left Arrow</p>

        <p>Translate Right</p>
        <p>s</p>
        <p>Right Arrow</p>

        <p>Translate Up</p>
        <p>a</p>
        <p>Up Arrow</p>

        <p>Translate Down</p>
        <p>d</p>
        <p>Down Arrow</p>

        <p>Zoom in</p>
        <p>=</p>
        <p>Scroll Up</p>

        <p>Zoom out</p>
        <p>-</p>
        <p>Scroll Down</p>
      </div>
    </Stack>
  );
}

export default Controls;
