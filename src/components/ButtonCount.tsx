import { useState } from 'react';

export default function ButtonCount() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button
        onClick={() => setCount(count + 1)}
      >
        Click me {count} times
      </button>
    </>
  )
}
