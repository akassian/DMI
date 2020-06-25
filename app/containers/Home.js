import React from 'react';
import { v4 as uuid } from 'uuid';
import { getStrings } from '../api/strings';
import useApi from '../hooks/useApi';

function Home() {
  const [isLoading, errors, data] = useApi(getStrings);
  console.log(isLoading, errors, data);
  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await getStrings();
  //     console.log(res);
  //     setData(res);
  //   };
  //   getData();
  // }, []);

  if (isLoading) return <h1>Loading...</h1>;

  const allStrings = data.strings.map(string => <li key={uuid()}>{string}</li>);

  return (
    <>
      <h1>Strings</h1>
      <ul>{allStrings}</ul>
    </>
  );
}

export default Home;
