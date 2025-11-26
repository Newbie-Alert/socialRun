import { TotalRecord } from "@/hooks/useRunning";
import { callAxios } from "@/lib/axios/axios";

type SaveRecordBodyType = TotalRecord;

export const saveRecord = async (param: SaveRecordBodyType) => {
  try {
    const res = await callAxios.post("/record", param);
    return res.status;
  } catch (error) {
    console.log(error);
    throw Error("기록 저장 실패");
  }
};
