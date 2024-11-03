export const createFetch = (
  baseUrl: string,
  defaultHeaders: Record<string, string> = {},
  custom?: {
    useAccessToken?: boolean;
    isRefresh?: boolean;
    isLogout?: boolean;
    checkVersion?: boolean;
  },
) => {
  return async (endpoint: string, options: RequestInit = {}) => {
    if (custom) {
      const accessToken = useCookie("accessToken").value;
      const refreshToken = useCookie("refreshToken").value;

      if (custom.useAccessToken) {
        defaultHeaders.Authorization = `Bearer ${accessToken ?? ""}`;
      }

      if (custom.isRefresh) {
        defaultHeaders.Authorization = `Bearer ${refreshToken ?? ""}`;
      }

      if (custom.isLogout) {
        defaultHeaders.Authorization = `Bearer ${accessToken ?? ""}`;
        defaultHeaders.refreshToken = refreshToken ?? "";
      }
    }

    const url = `${baseUrl}${endpoint}`;
    const headers = {
      ...defaultHeaders,
      ...(options.headers || {}),
    };

    const modifiedOptions: RequestInit = {
      ...options,
      headers,
    };

    console.log("Request:", url, modifiedOptions);

    try {
      // 원래의 `fetch` 호출
      const response: Response = await fetch(url, modifiedOptions);

      // 3. 응답 인터셉터: 응답 후 로직 실행
      if (!response.ok) {
        // 에러 상태 코드 처리 (예: 401, 500 등)
        console.error("Error response:", response.status, response.statusText);
        // 필요에 따라 예외를 던지거나 추가 처리를 수행
      }

      // 응답 데이터를 반환
      return response.json();
    } catch (error) {
      // 네트워크 오류 등 처리
      console.error("Fetch error:", error);
      throw error; // 필요에 따라 에러를 다시 던집니다.
    }
  };
};
