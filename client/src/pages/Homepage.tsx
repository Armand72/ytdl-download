import React, { useState } from 'react';
import API from 'api/axios';

const Homepage = (): JSX.Element => {
  const [list, setList] = useState<string[]>([]);
  const [url, setUrl] = useState<string>('');

  const gofetch = async (): Promise<void> => {
    const res = await API.post('archive', { list });
    if (res.status === 200) {
      const fileName = res.data.zipName;
      // await API.get(`archive/${fileName}`);
      window.location.href = `http://localhost:9065/api/archive/${fileName}`;
      setList([]);
      setUrl('');
    }
  };

  return (
    <>
      <div>
        <input type="text" onChange={(e) => setUrl(e.target.value)} />
        <button
          type="button"
          onClick={() => setList((prevState) => [...prevState, url])}
        >
          Valider
        </button>
        {list?.length > 0 &&
          list.map((item, key) => {
            return <div key={key}>{item}</div>;
          })}
        <button type="button" onClick={() => gofetch()}>
          FETCH
        </button>
      </div>
    </>
  );
};

export default Homepage;
