import { View, Text } from "react-native";
import React, { createContext, useContext, useState } from "react";
import { TotalRecord } from "@/hooks/useRunning";

export type RecordContextType = {
  record: TotalRecord | null;
  handleSetRecord: (totalRecord: TotalRecord) => void;
};

const RecordContext = createContext<RecordContextType | null>(null);

export default function RecordProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [record, setRecord] = useState<TotalRecord | null>(null);

  const handleSetRecord = (totalRecord: TotalRecord) => {
    setRecord(totalRecord);
  };

  return (
    <RecordContext.Provider value={{ record, handleSetRecord }}>
      {children}
    </RecordContext.Provider>
  );
}

export const useRecordContext = () => {
  const recordContext = useContext(RecordContext);
  if (!recordContext) {
    throw Error("RecordProvider 안에서만 사용할 수 있습니당");
  }
  return recordContext;
};
