import service from "./request.js";
import { AxiosRequestConfig } from "axios";
import type { herosResType, heroPowerResType } from "#/axios";

interface Result<T> {
  code: number;
  msg?: string;
  data: T;
}

const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<Result<T>> {
    return service.get(url, config);
  },
};

export const reqHeroData = () => http.get<herosResType>("getHeroList.php");

export const reqHeroPower = ({ currentHeroName, type }: { currentHeroName: string; type: string }) => {
  return http.get<heroPowerResType>(`getHeroInfo.php?hero=${currentHeroName}&type=${type}`);
};
