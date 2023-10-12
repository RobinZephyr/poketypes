import { useEffect, useState } from 'react';
import FetchQueryPractice from './post/fetch-query';

export default function Home() {
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setName(data.name));
  }, []);

  return <main>
    
    <FetchQueryPractice/>
     {name}</main>;
}
