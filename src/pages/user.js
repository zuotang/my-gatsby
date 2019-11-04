import React from "react"

import useSize from "../components/baseSize"
import "./user.less"

function User() {
  useSize(true)

  return (
    <div className="user">
      <div className="head">
        <div className="user_info">
          <div className="avatar"></div>
          <div className="info">
            <div className="username">托比ICoO</div>
            <div className="userid">ID.889541</div>
          </div>
        </div>
      </div>
      <div className="money"></div>
      测试
    </div>
  )
}

export default User
