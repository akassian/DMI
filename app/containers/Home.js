import React, { useState, useEffect } from 'react';
import { getStrings } from '../api/strings';

function Home() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const res = await getStrings();
      console.log(res);
      setData(res);
    };
    getData();
  }, []);

  return <h1>Home</h1>;
}

export default Home;
