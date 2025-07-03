import {Stack} from "../../components/layout.tsx";
import {EmeraldButton} from "../../components/Buttons.tsx";
import {useRef, useState} from "react";

function SetupSelectImage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  function updateFile(event: React.ChangeEvent<HTMLInputElement>) {
    if(event.target.files?.length === 1) {
      setSelectedFile(event.target.files[0]);
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
    else {
      console.error('No file selected or multiple files selected');
      return;
    }
  }

  return (
    <>
      <Stack className={'gap-3 items-center'}>
        { selectedFile &&
          <img
            alt={'Selected puzzle image'}
            className={'max-w-70% max-h-[40vh] object-contain'}
            src={imageUrl}
          />
        }

        <EmeraldButton
          className={'w-fit'}
          onClick={() => fileInputRef?.current?.click()}
        >
          Select File
        </EmeraldButton>
      </Stack>

      <input
        type={'file'}
        className={'hidden'}
        onChange={updateFile}
        ref={fileInputRef}
      />
    </>
  );
}

export default SetupSelectImage;
