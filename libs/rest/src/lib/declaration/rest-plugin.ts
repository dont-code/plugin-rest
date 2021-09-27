import {Plugin, DontCodeModel, PluginConfig} from '@dontcode/core';

/**
 * This plugin enables loading / saving entities from any rest services.
 */
export class RestPlugin implements Plugin
{
  getConfiguration(): PluginConfig {
    return {
      plugin: {
        id: 'RestPlugin',
        'display-name': 'A plugin for entities managed through Rest APIs .',
        version: '1.0.0'
      },
      'schema-updates': [{
        id: 'rest-field',
        description: 'Create the list of sources',
        changes: [{
          location: {
            parent: '#/creation',
            id: 'sources'
          },
          update: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                for: {
                  type: 'string',
                  format: '$.creation.entities[*]'
                }
              }
            }
          },
          replace: false
        },{
          location: {
            parent: '#/creation/sources',
            id: 'type'
          },
          update: {
            enum: [
              'Rest'
            ]
          },
          props: {
            url: {
              type: 'string'
            }
          },
          replace: false
        }]
      }]
    }
  }
}
