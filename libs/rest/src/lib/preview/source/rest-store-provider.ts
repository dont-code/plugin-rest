import {
  DontCodeModel,
  DontCodeModelManager,
  DontCodeStoreCriteria,
  DontCodeStoreProvider,
  dtcde,
  UploadedDocumentInfo
} from "@dontcode/core";
import {Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";


export class RestStoreProvider implements DontCodeStoreProvider {
  modelMgr: DontCodeModelManager;

  static clearConfigCache (): void {
  }

  constructor(protected http:HttpClient) {
    this.modelMgr = dtcde.getModelManager();
  }

  deleteEntity(position: string, key: any): Promise<boolean> {
    return Promise.resolve(false);
  }

  loadEntity(position: string, key: any): Promise<any> {
    const entity = this.modelMgr.findAtPosition(position, false);
    if (entity === null)  {
      return Promise.reject("No entity found at position "+position);
    }

    const config = this.modelMgr.findTargetOfProperty(DontCodeModel.APP_ENTITIES_FROM_NODE, position);

    const obs = this.http.get(config.url+(key?'/'+key:''), {observe:"body", responseType:"json"});
    return obs.toPromise();
  }

  searchEntities(position: string, ...criteria: DontCodeStoreCriteria[]): Observable<Array<any>> {
    const entity = this.modelMgr.findAtPosition(position, false);
    if (entity === null)  {
      return throwError("No entity found at position "+position);
    }

    const config = this.modelMgr.findTargetOfProperty(DontCodeModel.APP_ENTITIES_FROM_NODE, position);

    return this.http.get(config.url, {observe:"body", responseType:"json"}).pipe(map(value => {
        return value as Array<any>;
      }
    ));
  }

  storeEntity(position: string, entity: any): Promise<any> {
    return Promise.resolve(undefined);
  }

  canStoreDocument(position?: string): boolean {
    return false;
  }

  storeDocuments(toStore: File[], position?: string): Observable<UploadedDocumentInfo> {
    return throwError('Document storage is unsupported.');
  }


}
