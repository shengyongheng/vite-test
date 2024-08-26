import { $http } from "../utils";
export const login = async (data: any) => { // eslint-disable-line
  return $http({
    url: "/login",
    method: "post",
    data,
  });
};
