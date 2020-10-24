import { useState, useCallback } from 'react';

export default (initialValue = null) => {
  const [value, setValue] = useState(initialValue);

  const handler = useCallback((time, timeString) => {
    setValue(timeString);
  }, []);

  return [value, handler];
};
