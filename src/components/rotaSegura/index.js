import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";

const RotaSegura = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Chame aqui, fora do useEffect
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  useEffect(() => {
    const keyFromUrl = searchParams.get("key");
    const key = keyFromUrl || (typeof window !== "undefined" ? localStorage.getItem("clienteKey") : null);

    setUserLoggedIn(!!key);
    if (!key) {
      router.push('/');
    }
  }, [router, searchParams]);

  if (userLoggedIn === null) {
    return null;
  }
  if (userLoggedIn === true) {
    return children;
  }
  return null;
};

export default RotaSegura;