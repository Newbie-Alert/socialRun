import { TotalRecord } from "@/hooks/useRunning";

export type UploadBodyType = {
  title: string;
  content: string;
  images: string[] | null;
  totalRecord: TotalRecord | null;
};
