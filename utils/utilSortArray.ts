export default function <T extends { [key: string]: any }>(
  arr: T[],
  direction = "ASC",
  param1: string,
  param2?: string
) {
  return direction == "ASC"
    ? [...arr].sort((a, b) => {
        if (!param2) {
          if (a[param1] < b[param1]) return -1;
          if (a[param1] > b[param1]) return 1;
        } else {
          if (a[param1][param2] < b[param1][param2]) return -1;
          if (a[param1][param2] > b[param1][param2]) return 1;
        }
        return 0;
      })
    : [...arr].sort((a, b) => {
        if (!param2) {
          if (b[param1] < a[param1]) return -1;
          if (b[param1] > a[param1]) return 1;
        } else {
          if (b[param1][param2] < a[param1][param2]) return -1;
          if (b[param1][param2] > a[param1][param2]) return 1;
        }
        return 0;
      });
}
