import { callAxios } from "@/lib/axios/axios";
import { UploadBodyType } from "./type";

export const getFeed = async (userName?: string) => {
  try {
    const getFeedRes = await callAxios.get("/feed", {
      params: {
        userName,
      },
    });
    return getFeedRes.data;
  } catch (error) {
    console.log(error);
    throw Error("피드를 가져오지 못 했습니다");
  }
};

export const uploadFeed = async (param: UploadBodyType) => {
  try {
    const uploadRes = await callAxios.post("/feed", param);

    return uploadRes.status;
  } catch (error) {
    console.log(error);
    throw Error("feed upload Failed");
  }
};
