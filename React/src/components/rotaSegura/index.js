import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const RotaSegura = ({ children }) => {
  const router = useRouter();
  const [userLoggedIn, setUserLoggedIn] = useState(null); 

  useEffect(() => {
    const isLoggedIn = Cookies.get('key'); 

    setUserLoggedIn(!!isLoggedIn); 
    if (userLoggedIn === false) {
      router.push('/'); 
    }
  }, [router, userLoggedIn]);

  if (userLoggedIn === null) {
    return null;
  }
  if (userLoggedIn === true) {
    return children;
  }
  return null;
};

export default RotaSegura;