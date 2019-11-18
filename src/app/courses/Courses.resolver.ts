import { map, tap, filter, first } from "rxjs/operators";
import { CourseEntityService } from "./services/course-entity.service";
import { Observable } from "rxjs";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class CoursesResolver implements Resolve<boolean> {
  constructor(private coursesService: CourseEntityService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.coursesService.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.coursesService.getAll();
        }
      }),
      filter(loaded => !!loaded),
      first()
    );
  }
}
