import {Injector, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RestPlugin} from "./declaration/rest-plugin";
import {dtcde} from '@dontcode/core';
import {PluginCommonModule} from '@dontcode/plugin-common';

@NgModule({
    imports: [CommonModule, PluginCommonModule],
  declarations: [],
  id:'dontcode-plugin/rest' // A module containing previewer components must have an id to be found by the dont-code platform.
})
export class RestModule {
  constructor() {
    console.log('Rest Plugin registering');   // Look for this log to make sure your plugin has been loaded
    dtcde.registerPlugin(new RestPlugin());  // When created a module must register to the platform.
  }

  // We have no graphical components to declare
  exposedPreviewHandlers(): Map<string, any> | null {
    return null;
  }
}
