import { sleep } from "@/util/sleep";
import { type LocationQuery, type Router, useRouter } from "vue-router";

export class RouterInstance {
  private static $router?: Router = undefined;

  public static getRouter(): Router {
    if (!this.$router) {
      this.$router = useRouter();
    }

    return this.$router;
  }

  public static async setRouter(router: Router): Promise<void> {
    this.$router = router;
  }

  public static async getCurrentRouteName(): Promise<string> {
    this.getRouter();

    while (!this.$router || !this.$router!.currentRoute) {
      await sleep(5).then(() => undefined);
    }

    return this.$router!.currentRoute.value.name as string;
  }

  public static async getCurrentRoutePath(): Promise<string> {
    this.getRouter();

    while (!this.$router || !this.$router!.currentRoute) {
      await sleep(5).then(() => undefined);
    }

    return this.$router!.currentRoute.value.path as string;
  }

  public static getQuery(): LocationQuery {
    this.getRouter();

    return this.$router!.currentRoute.value.query;
  }
}
