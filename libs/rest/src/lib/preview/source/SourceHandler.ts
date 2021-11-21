import {DontCodeStoreManager, Change, dtcde, ChangeType} from "@dontcode/core";
import {AbstractPluginHandler} from "@dontcode/plugin-common";

export class SourceHandler extends AbstractPluginHandler {

  protected storeMgr:DontCodeStoreManager;

  constructor() {
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
        this.storeMgr.removeProvider(change.position);
        break;
      case ChangeType.ADD:
      case ChangeType.RESET:
        //this.storeMgr.setProviderForSourceType()
        break;
      case ChangeType.MOVE:
      case ChangeType.UPDATE:
        break;
      default:
        break;
    }
  }
}
