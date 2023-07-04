import { Auth } from "@firebase/auth";
import { Firestore } from "firebase/firestore";

// READ THIS: https://stackoverflow.com/a/76163467/9374499
declare module "#app" {
  interface NuxtApp {
    $auth: Auth;
    $firestore: Firestore;
  }
}
