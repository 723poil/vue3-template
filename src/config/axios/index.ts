import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import { Cookies } from "../cookies/cookies";
import type { ApiResponse } from "./models/api.response.dto";

export class CustomAxios {
  private static authInstance?: AxiosInstance = undefined;
  private static apiInstance?: AxiosInstance = undefined;
  private static excelInstance?: AxiosInstance = undefined;
  private static fileInstance?: AxiosInstance = undefined;

  public static getAuth(): AxiosInstance {
    if (!this.authInstance) {
      const API_URL = import.meta.env.VITE_API_URL;

      this.authInstance = axios.create({
        baseURL: API_URL,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
    }

    return this.authInstance;
  }

  public static getApi(): AxiosInstance {
    if (!this.apiInstance) {
      const API_URL = import.meta.env.VITE_API_URL;

      this.apiInstance = axios.create({
        baseURL: API_URL,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          withCredentials: true,
        },
      });

      setAxiosInterceptor(this.apiInstance);
    }

    return this.apiInstance;
  }

  public static getExcel(): AxiosInstance {
    if (!this.excelInstance) {
      const API_URL = import.meta.env.VITE_API_URL;

      this.excelInstance = axios.create({
        baseURL: API_URL,
        responseType: "blob",
        headers: {
          "Content-Type": "application/octet-stream",
          withCredentials: true,
        },
      });

      setAxiosInterceptor(this.excelInstance);
    }

    return this.excelInstance;
  }

  public static getFile(): AxiosInstance {
    if (!this.fileInstance) {
      const API_URL = import.meta.env.VITE_API_URL;

      this.fileInstance = axios.create({
        baseURL: API_URL,
        headers: {
          "Content-Type": "multipart/form-data",
          withCredentials: true,
        },
      });

      setAxiosInterceptor(this.fileInstance);
    }

    return this.fileInstance;
  }

  //   public static async checkHealth(): Promise<ApiResponse<AuthHealthResDto>> {
  //     try {
  //       const $cookies: Cookies = new Cookies();
  //       const accessToken: string = $cookies.get<string>("accessToken");

  //       const instance: AxiosInstance = this.getApi();
  //       const response: AxiosResponse<ApiResponse<AuthHealthResDto>> = await instance.post<ApiResponse<AuthHealthResDto>>(
  //         "auth/health",
  //         undefined,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         },
  //       );

  //       return response.data;
  //     } catch (error: any) {
  //       throw new Error(error.message);
  //     }
  //   }

  /**
   * 일반 api 요청시 사용 (엑셀, 파일 관련 api는 미구현)
   */
  public static async postApiRequest<RES, REQ>(
    url: string,
    data?: REQ,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<RES>> {
    const instance: AxiosInstance = this.getApi();
    const response: AxiosResponse<ApiResponse<RES>> = await instance.post<ApiResponse<RES>>(url, data, config);
    return response.data;
  }

  public static async getExcelRequest<REQ>(url: string, data?: REQ, config?: AxiosRequestConfig): Promise<BlobPart> {
    const instance: AxiosInstance = this.getExcel();
    let requestParam: string = "";
    let count: number = 0;

    if (data !== undefined) {
      for (const key in data) {
        if (count !== 0) {
          requestParam += "&";
        } else {
          requestParam += "?";
        }

        requestParam += `${key}=${data[key]}`;
        count++;
      }
    }

    const response: AxiosResponse<BlobPart> = await instance.get<BlobPart>(url + requestParam, config);
    return response.data;
  }

  public static async postFileRequest<RES, REQ>(
    url: string,
    data?: REQ,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<RES>> {
    const instance: AxiosInstance = this.getFile();
    const response: AxiosResponse<ApiResponse<RES>> = await instance.post<ApiResponse<RES>>(url, data, config);
    return response.data;
  }
}
function setAxiosInterceptor(apiInstance: AxiosInstance) {
  throw new Error("Function not implemented.");
}
