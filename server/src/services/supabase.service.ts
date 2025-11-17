import { supabase } from "../lib/supabase.js";

type ParsedImageList = {
  filename: string;
  buffer: ArrayBuffer;
  mimeType: string;
};

type UploadImageParams = ParsedImageList[];

export const uploadImage = async (imageList: UploadImageParams) => {
  try {
    const uploadPromises = imageList.map(({ filename, buffer, mimeType }) => {
      return supabase.storage
        .from("media")
        .upload(`postImages/${filename}`, buffer, {
          contentType: mimeType,
        })
        .then((res) => {
          const { data, error } = res;
          if (error) {
            throw Error("supabase client:: Image Upload Error");
          }

          const publicUrl = supabase.storage
            .from("media")
            .getPublicUrl(data?.path).data.publicUrl;

          return publicUrl;
        })
        .catch((error) => {
          console.log(error);
          throw Error("error image upload to storage");
        });
    });

    const uploadedPublicUrl = await Promise.all(uploadPromises);

    return uploadedPublicUrl;
  } catch (error) {
    console.log(error);
  }
};
