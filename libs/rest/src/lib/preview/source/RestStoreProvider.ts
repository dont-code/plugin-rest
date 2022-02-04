import {
  DontCodeModelManager,
  DontCodeStoreCriteria,
  DontCodeStoreProvider,
  DontCodeStoreProviderWithConfig, dtcde,
  UploadedDocumentInfo
} from "@dontcode/core";
import {Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/internal/operators";


export class RestStoreProvider implements DontCodeStoreProvider {
  protected url:string;
  modelMgr: DontCodeModelManager;


  constructor(url:string, protected http:HttpClient) {
    this.url = url;
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

    const obs = this.http.get(this.url+'/'+entity.name+'/'+key, {observe:"body", responseType:"json"});
    return obs.toPromise();
  }

  searchEntities(position: string, ...criteria: DontCodeStoreCriteria[]): Observable<Array<any>> {
    const entity = this.modelMgr.findAtPosition(position, false);
    if (entity === null)  {
      return throwError("No entity found at position "+position);
    }

    return this.http.get(this.url+'/'+entity.name, {observe:"body", responseType:"json"}).pipe(map(value => {
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
