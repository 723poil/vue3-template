import type { VueCookies } from "vue-cookies";
import { inject } from "vue";
import { EIGHT_HOUR, MINUTE_30 } from "@/util/const/time";

export class Cookies {
  private static $cookies?: VueCookies = undefined;

  public static getCookies(): VueCookies {
    if (!this.$cookies) {
      this.$cookies = inject<VueCookies>("$cookies") as VueCookies;
    }

    return this.$cookies;
  }

  public get<T>(key: string): T {
    const cookies: VueCookies = Cookies.getCookies();

    return cookies.get(key);
  }

  public set<T>(key: string, value: T, expires?: string | number | Date): void {
    const cookies: VueCookies = Cookies.getCookies();

    cookies.set(key, value, expires);
  }

  public static setTokenCookie(accessToken: string, refreshToken: string | undefined = undefined): void {
    const cookies: VueCookies = Cookies.getCookies();

    cookies.set("accessToken", accessToken, MINUTE_30);

    if (refreshToken !== undefined) {
      cookies.set("refreshToken", refreshToken, EIGHT_HOUR);
    }
  }
}
