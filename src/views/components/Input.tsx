import type {ChangeEvent} from "react";
import {Stack} from "./layout.tsx";

interface TextInputType {
  type?: 'text' | 'email' | 'password' | 'number';
  value?: string | number;
  setter?: (value: string) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  unit?: string;
  className?: string;
  outterClassName?: string;
}

function Input(
  {
    type,
    value,
    setter,
    onChange,
    placeholder,
    autoComplete,
    unit,
    className,
    outterClassName
  }: TextInputType
) {
  function onChangeEvt(event: ChangeEvent<HTMLInputElement>) {
    if(setter) setter(event.target.value);
    if(onChange) onChange(event);
  }

  return (
    <Stack
      direction={'row'}
      className={
        'bg-gradient-to-br from-emerald-500 via-green-600 to-emerald-700 ' +
        'p-[1px] rounded-lg' +
        (outterClassName ? ' ' + outterClassName : '')
      }
    >
      <input
        type={type}
        value={value}
        onChange={onChangeEvt}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={
          'py-1 bg-beige-200 w-full ' +
          'outline-none ' +
          (unit ? 'rounded-l-[calc(var(--radius-lg)-1px)] pl-3 pr-1' : 'rounded-[calc(var(--radius-lg)-1px)] px-3') +
          (className ? ' ' + className : '')
        }
      />
      {unit && <p className={'pr-1 bg-beige-200 rounded-r-[calc(var(--radius-lg)-1px)]'}>{unit}</p>}
    </Stack>
  );
}

export default Input;
