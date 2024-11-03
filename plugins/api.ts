export default defineNuxtPlugin(() => {
  const accessToken = useCookie("accessToken").value;

  const baseServerDefault = createFetch("https://api.server-a.com", {
    "X-Version": "1.0.0",
  });

  const baseServerAuth = createFetch(
    "https://api.server-a.com",
    {
      "X-Version": "1.0.0",
    },
    {
      useAccessToken: true,
    },
  );

  const baseServerRefresh = createFetch(
    "https://api.server-a.com",
    {
      "X-Version": "1.0.0",
    },
    {
      isRefresh: true,
    },
  );

  const baseServerLogout = createFetch(
    "https://api.server-a.com",
    {
      "X-Version": "1.0.0",
    },
    {
      isLogout: true,
    },
  );

  const thirdPartyServer = createFetch("https://api.server-b.com", {});

  // Nuxt 전역으로 제공
  return {
    provide: {
      baseServerDefault,
      baseServerAuth,
      baseServerRefresh,
      baseServerLogout,
    },
  };
});
