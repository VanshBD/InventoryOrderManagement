import { useEffect } from "react";
import { Product } from "../components";
import { Path } from "../Commen/Path";
import { useNavigate } from "react-router-dom";

function Home({ Auth }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (Auth == null && Auth?.role !== 2) {
      navigate(Path.login)
    }
  }, [Auth])
  return (
    <>
      <Product />
    </>
  )
}

export default Home