import {Change, DontCodeStoreManager, dtcde} from "@dontcode/core";

export class SourceHandler {

  protected storeMgr:DontCodeStoreManager;

  constructor() {
    //super();
    this.storeMgr = dtcde.getStoreManager();
  }

  /*handleChange (change: Change ) {
    this.storeMgr.setProvider(change.pointer.schemaPosition, );
  }*/
}
