import React from "react"
import { Link } from "gatsby"

const SecondPage = ({pageContext}) => {
  console.log(pageContext)
  return  (<>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage{pageContext.id}</Link>
  </>
)
}

export default SecondPage
