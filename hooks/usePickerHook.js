import { useState, useCallback } from 'react';

const usePickerHook = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);

  const handler = useCallback((use, string) => {
    setValue(string);
  }, []);

  return [value, handler];
};

export default usePickerHook;
