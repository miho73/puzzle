import {Stack} from "../../components/layout.tsx";
import {EmeraldButton} from "../../components/Buttons.tsx";
import {useRef} from "react";

function SetupSelectImage(
  {
    imageUrl,
    setImage,
    setImageUrl,
    setImageWidth,
    setImageHeight
  } : {
    imageUrl: string;
    setImage: (image: ArrayBuffer | null) => void;
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
      loadImage(event.target.files[0])
        .then(img => setImage(img))
        .catch(err => {
          console.error(err);
          setImage(null);
        });
      inferImageDimensions(url)
        .then(dim => {
          setImageWidth(dim.width);
          setImageHeight(dim.height);
        })
        .catch(err => {
          console.error('Failed to infer image dimensions:', err);
          setImageWidth(0);
          setImageHeight(0);
        });
    }
    else {
      console.error('No file selected or multiple files selected');
      return;
    }
  }

  function loadImage(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) resolve(e.target.result as ArrayBuffer);
        else reject(new Error('Failed to read file'));
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  function inferImageDimensions(url: string): Promise<{ width: number; height: number }> {
    const img = new Image();
    img.src = url;

    return new Promise((resolve, reject) => {
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = reject;
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
