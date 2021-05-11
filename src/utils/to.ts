// simple promise handler without using try catch
export default function to(promise: Promise<any>) {
  return promise.then((data) => [null, data]).catch((err) => [err, null]);
}
