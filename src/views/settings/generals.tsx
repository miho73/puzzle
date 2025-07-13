import {Stack} from "../components/layout.tsx";
import {SelectionRotationSwitch} from "../components/Buttons.tsx";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../../services/redux/hooks.ts";
import {load, reset, set} from "../../services/redux/ConfigSlice.ts";
import store from '../../services/redux/store.ts';

function Generals() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(true);
  const [dragMode, setDragMode] = useState<number>(0);
  const [selectionMode, setSelectionMode] = useState<number>(0);

  // initialization
  useEffect(() => {
    const lsValue = localStorage.getItem('cfg');

    if(!lsValue) {
      dispatch(
        reset()
      )
    }
    else {
      dispatch(
        load(JSON.parse(lsValue))
      )
    }

    const reduxCfg = store.getState();
    setDragMode(reduxCfg.config.translationToggle ? 1 : 0);
    setSelectionMode(reduxCfg.config.selectionToggle ? 1 : 0);
    setLoading(false);
  }, []);

  useEffect(() => {
    dispatch(
      set({
        translationToggle: dragMode == 1,
        selectionToggle: selectionMode == 1,
        loaded: true
      })
    );
  }, [dragMode, selectionMode]);

  // skeleton view
  if(loading)
    return (
      <Stack className={'text-center gap-1 max-h-[50vh] overflow-y-auto text-sm'}>
        <p className={'font-bold text-xl'}>Generals</p>

        <div className={'grid grid-cols-2 gap-y-1'}>
          <p>Drag Mode</p>
          <p></p>

          <p>Selection Activation Mode</p>
          <p></p>
        </div>
      </Stack>
    );

  // actual view
  return (
    <Stack className={'text-center gap-1 max-h-[50vh] overflow-y-auto text-sm'}>
      <p className={'font-bold text-xl'}>Generals</p>

      <div className={'grid grid-cols-2 gap-y-1'}>
        <p>Drag Mode</p>
        <SelectionRotationSwitch
          options={['Press-and-Hold', 'Toggle']}
          selected={dragMode}
          setter={setDragMode}
        />

        <p>Selection Activation Mode</p>
        <SelectionRotationSwitch
          options={['Press-and-Hold', 'Toggle']}
          selected={selectionMode}
          setter={setSelectionMode}
        />
      </div>
    </Stack>
  );
}

export default Generals;
