import { useQuery } from 'react-query';
import { useState } from 'react';
import { useFileExplorerState } from './state';
import { bridge } from '../bridge';

// this hook initializes the explorer state and queries the core
export function useFileExplorer(initialPath = '/', initialLocation: number | null = null) {
  const fileState = useFileExplorerState();
  // file explorer hooks maintain their own local state relative to exploration
  const [path, setPath] = useState(initialPath);
  const [locationId, setLocationId] = useState(initialPath);

  //   const { data: volumes } = useQuery(['sys_get_volumes'], () => bridge('sys_get_volumes'));

  const { data: location } = useQuery(['SysGetLocations', { id: locationId }], () => {
    return bridge('SysGetLocations', { id: locationId });
  });

  // for this to work we need a function with types that knows all the commands and their arguments
  // this can be generated by the core, entirely Tauri agnostic, core can be initialized with a Tauri instance to act as a bridge.
  const { data: files } = useQuery(['LibGetExplorerDir', path], async () => {
    return await bridge('LibGetExplorerDir', { limit: fileState.row_limit, path });
  });
  return { location, files, setPath, setLocationId };
}

// export function useVolumes() {
//   return useQuery(['SysGetVolumes'], () => bridge('SysGetVolumes'));
// }