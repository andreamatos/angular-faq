import {Observable, of, throwError} from "rxjs";
import {delay, mergeMap, retryWhen} from "rxjs/operators";
import { HTTP_CALL_DELAY, DEFAULT_MAX_RETRIES, DEFAULT_BACKOFF } from 'src/environments/environment';

export function retryWithBackoff(delayMs = HTTP_CALL_DELAY, maxRetry = DEFAULT_MAX_RETRIES, backoffMs = DEFAULT_BACKOFF) {

  let retries = maxRetry;

  return (src: Observable<any>) =>
    src.pipe(
      retryWhen((errors: Observable<any>) => errors.pipe(
        mergeMap(error => {
          if (retries-- > 0) {
            const backoffTime = delayMs + ((maxRetry - retries) * backoffMs);
            return of(error).pipe(delay(backoffTime));
          }
          return throwError(error);
        })
      ))
    );
}
