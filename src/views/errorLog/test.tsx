import { useEffect } from "react";

function Bbb() {
  useEffect(() => {
    throw new Error('bbb');
  }, [])
  return <div>bbb</div>
}

export default function Aaa() {
  // useEffect(() => {
  //   throw new Error('aaa');
  // }, [])
  return <Bbb></Bbb>;
}