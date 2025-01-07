import { useRef } from 'react';

// eslint-disable-next-line no-unused-vars
export const useSelectImage = (onImageChange: (file: string) => void) => {
  const imgRef = useRef<HTMLInputElement>(null);

  const saveImgFile = () => {
    if (imgRef.current?.files && imgRef.current.files[0]) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) {
          onImageChange(reader.result as string);
        }
      };
    }
  };

  const handleInput = () => {
    imgRef.current?.click();
  };

  return { imgRef, saveImgFile, handleInput };
};
