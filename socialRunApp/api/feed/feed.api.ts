import { TotalRecord } from "@/hooks/useRunning";
import { callAxios } from "@/lib/axios/axios";

export type UploadBodyType = {
  title: string;
  content: string;
  images: string[] | null;
  totalRecord: TotalRecord | null;
};

export const uploadFeed = async (param: UploadBodyType) => {
  try {
    const uploadRes = await callAxios.post("/feed/upload", param);

    console.log(uploadRes.data);
  } catch (error) {
    console.log(error);
    throw Error("feed upload Failed");
  }
};
