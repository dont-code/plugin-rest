import {Change, ChangeType, DontCodeStoreManager, dtcde} from "@dontcode/core";
import {AbstractPluginHandler} from "@dontcode/plugin-common";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RestStoreProvider} from "./RestStoreProvider";

@Injectable({
  providedIn: 'root'
})
export class SourceHandler extends AbstractPluginHandler {

  protected storeMgr:DontCodeStoreManager;

  constructor(protected httpClient:HttpClient) {
    super();
    this.storeMgr = dtcde.getStoreManager();
  }

  /**
   * Update storeMgr with any changes done to Rest sources
   * @param change
   */
  handleChange (change: Change ) : void {
    switch (change.type) {
      case ChangeType.DELETE:
        this.storeMgr.removeProviderForSourceType(change.value.name);
        break;
      case ChangeType.ADD:
      case ChangeType.RESET:
        this.storeMgr.setProviderForSourceType(new RestStoreProvider(change.value.url, this.httpClient), change.value.name);
        break;
      case ChangeType.MOVE:
      case ChangeType.UPDATE:
        this.storeMgr.setProviderForSourceType(new RestStoreProvider(change.value.url, this.httpClient ), change.value.name);
        break;
      default:
        break;
    }
  }
}
