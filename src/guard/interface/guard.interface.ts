import type { Observable } from 'rxjs';

export type ActivationModel = boolean | Promise<boolean> | Observable<boolean>;
