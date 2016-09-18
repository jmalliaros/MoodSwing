/*
* Action creators
*/

/**
 * Dispatch this action to update app state
 * @param  {JSON} data [new app state]
 * @return {Action}
 */
export function updateState(data) {
  return {
    type: 'UPDATE_STATE',
    data: data
  }
}
