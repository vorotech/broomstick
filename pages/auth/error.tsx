import React from "react"
import { ErrorPage } from "../../components/layout/ErrorPage"
import MyAppBar from "../../components/MyAppBar"

const Error = () => (
  <>
    <MyAppBar />
    <ErrorPage status="401" statusMessage="Authentication was incomplete" />
  </>
)

export default Error