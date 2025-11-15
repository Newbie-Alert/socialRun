import { callAxios } from "@/lib/axios/axios";

type LoginBody = {
  email: string;
  password: string;
  nickname?: string;
};

type LoginRes = {
  token: string;
  userId: string;
};

type RegisterBody = {
  email: string;
  password: string;
};

export const login = async (params: LoginBody) => {
  try {
    const loginRes = await callAxios.post<LoginRes>("/auth/login", params);
    const data = loginRes.data;

    return data;
  } catch (error) {
    throw Error("로그인 실패");
  }
};

export const register = async (params: RegisterBody) => {
  try {
    const registerRes = await callAxios.post("/auth/register", params);

    return;
  } catch (error) {
    throw Error("회원가입 실패");
  }
};
