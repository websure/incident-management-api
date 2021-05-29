import { useEffect, useState } from 'react';

let reloadTable = false;
const updateReloadState = [];

const updateTableState = () => {
  reloadTable = !reloadTable;
  updateReloadState.forEach((setState) => setState(reloadTable));
};

const useTableReload = () => {
  const newListener = useState()[1];
  useEffect(() => {
    updateReloadState.push(newListener);
    return () =>
      updateReloadState.filter((listener) => listener !== newListener);
  }, []);

  return {
    reloadTable,
    updateTableState,
  };
};

export default useTableReload;
