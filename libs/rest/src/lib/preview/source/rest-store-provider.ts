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
  static dateFieldsCache = new Map<string, Array<string>>();
  modelMgr: DontCodeModelManager;

  /**
   * In case some entity definition has changed, clear the cache
   */
  static clearConfigCache (): void {
    this.dateFieldsCache.clear();
  }

  /** Returns any field who is a date, in order to convert it from json. Keep the result in a cache map
   *
   * @param position
   * @param entity
   * @protected
   */
  protected static findDates (position:string, entity:any):Array<string> {
    let dates = RestStoreProvider.dateFieldsCache.get(position);
    if (dates!=null) return dates;

    dates = new Array<string>();
    const fields = entity.fields;
    if( fields!=null) {
      let prop: keyof typeof fields;
      for (prop in fields) {
        if (fields[prop]?.type==='Date' || fields[prop]?.type==='Date & Time') {
          dates.push(fields[prop]?.name);
        }
      }
    }
    RestStoreProvider.dateFieldsCache.set(position, dates);
    return dates;
  }

  /**
   * Converts dates and dateTimes properties of each element of the array to Typescript format
   * @param listToConvert
   * @param dateFields
   * @protected
   */
  protected static convertDatesFromJson (listToConvert:Array<any>, dateFields:Array<string>) : void {
    if (dateFields.length>0) {
      listToConvert.forEach((val)=> {
        dateFields.forEach(prop => {
          const toConvert = val[prop];
          if (toConvert!=null) {
            val[prop]=new Date(toConvert);
          }
        })
      })
    }
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

    // Search for all the date fields as we will need to convert them:
    const dates = RestStoreProvider.findDates(position, entity);

    const config = this.modelMgr.findTargetOfProperty(DontCodeModel.APP_ENTITIES_FROM_NODE, position);

    return this.http.get(config.url, {observe:"body", responseType:"json"}).pipe(map(value => {
        // Check if the result is an array, otherwise try to find an array embedded in the result
        if (Array.isArray(value)) {
          return value as Array<any>;
        } else {
          let prop: keyof typeof value;
          for (prop in value) {
            if (Array.isArray(value[prop])) {
              return (value[prop] as unknown as Array<any>);
            }
          }
          return [];
        }
      }
    ),
      map (result => {
        RestStoreProvider.convertDatesFromJson(result, dates);
        return result;
      }));
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
