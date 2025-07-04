import {Stack} from "../../components/layout.tsx";
import {EmeraldButton} from "../../components/Buttons.tsx";
import {useRef} from "react";

function SetupSelectImage(
  {
    imageUrl,
    setImageUrl,
    setImageWidth,
    setImageHeight
  } : {
    imageUrl: string;
    setImageUrl: (url: string) => void;
    setImageWidth: (width: number) => void;
    setImageHeight: (height: number) => void;
  }
) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function updateFile(event: React.ChangeEvent<HTMLInputElement>) {
    if(event.target.files?.length === 1) {
      const type = event.target.files[0].type;

      // Check if the selected file is an image
      if(!type.startsWith('image/')) {
        console.error('Selected file is not an image');
        return;
      }

      const url = URL.createObjectURL(event.target.files[0]);
      setImageUrl(url);
      loadImage(url)
        .then(img => {
          setImageWidth(img.width);
          setImageHeight(img.height);
        })
        .catch(err => {
          console.error(err);
        });
    }
    else {
      console.error('No file selected or multiple files selected');
      return;
    }
  }

  function loadImage(url: string): Promise<{width: number, height: number}> {
    const img = new Image();

    return new Promise((resolve, reject) => {
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = reject;
      img.src = url;
    });
  }

  return (
    <>
      <Stack className={'gap-3 items-center'}>
        { imageUrl !== '' &&
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
          Choose Image
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
