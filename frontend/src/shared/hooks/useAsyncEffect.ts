import { useEffect } from "react";

type AsyncEffect<V> = (isMounted?: () => boolean) => Promise<V>;
type CleanupFunction<V> = (prevResult?: V) => void;

export default function useAsyncEffect<V>(
  effect: AsyncEffect<V>,
  inputs?: ReadonlyArray<unknown>,
  cleanup?: CleanupFunction<V>
) {
  useEffect(() => {
    let result: V;
    let mounted = true;
    const maybePromise = effect(() => mounted);

    Promise.resolve(maybePromise).then((value) => (result = value));
    return () => {
      mounted = false;
      cleanup && cleanup(result);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, inputs);
}
