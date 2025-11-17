export type ParsedImageList = {
  filename: string;
  buffer: ArrayBuffer;
  mimeType: string;
};

export default function useParseImage() {
  /**
   * 이미지 URI 리스트를 받아서 이미지 데이터에서 필요한 것만 뽑아서 배열에 담아 반환
   */
  const imageParsing = async (imageUriList: string[]) => {
    const parsedList: ParsedImageList[] = [];

    for (const uri of imageUriList) {
      console.log("uri:::", uri);
      const imageData = await fetch(uri);
      const ext = uri.split(".").pop();
      const filename = `image_${Date.now()}.${ext}`;
      const buffer = await imageData.arrayBuffer();
      const blob = await imageData.clone().blob();
      const mimeType =
        blob.type ??
        (ext === "png"
          ? "image/png"
          : ext === "heic"
          ? "image/heic"
          : "image/jpeg");

      const arrayBuffer = new Uint8Array(buffer);

      const parsedImage = {
        filename,
        buffer,
        mimeType,
      };

      parsedList.push(parsedImage);
    }

    return parsedList;
  };

  /**
   * 파싱 된 이미지에서 storage에 바로 업로드 할 수 있게 가공해서 반환
   * @param imageUriList
   * @returns
   */
  const returnImageDataListsForStorage = async (imageUriList: string[]) => {
    if (!imageUriList || imageUriList.length === 0) {
      throw Error("no images");
    }

    try {
      const parsedImageList = await imageParsing(imageUriList);

      return parsedImageList;
    } catch (error) {
      console.log(error);
      throw Error("Error on image parsing start");
    }
  };

  return { imageParsing, returnImageDataListsForStorage };
}
