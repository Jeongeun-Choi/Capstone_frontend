import { useState, useCallback } from 'react';

const timePickerHook = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);

  const handler = useCallback((time, timeString) => {
    setValue(timeString);
  }, []);

  return [value, handler];
};

export default timePickerHook;
