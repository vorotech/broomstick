import { useRouter } from "next/router"
import React from "react"
import { ErrorPage } from "../../components/layout/ErrorPage"
import MyAppBar from "../../components/MyAppBar"

const Error = () => {
  const router = useRouter()
  const { error } = router.query
  
  return (
    <>
      <MyAppBar />
      <ErrorPage status="401" statusMessage={ error as string } />
    </>
  )
}

export default Error