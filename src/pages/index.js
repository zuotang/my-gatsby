import React, { useState } from "react"
import Layout from "../components/layout"
import FileManager from "../components/fileManager/Manager"
import Button from "@material-ui/core/Button"

import AppBar from "@material-ui/core/AppBar"

import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"

import Table from "../components/table"
import styled from "styled-components"

import Search from "../components/search"
const Container = styled.div`
  padding: 24px;
`
const IndexPage = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(0)

  return (
    <Layout>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          aria-label="simple tabs example"
        >
          <Tab label="新增订单" />
          <Tab label="历史订单" />
          <Tab label="工单处理" />
        </Tabs>
      </AppBar>
      <Container>
        <Search />
        <Table />
        <Button
          variant="contained"
          color="primary"
          onClick={e => setOpen(true)}
        >
          文件管理
        </Button>
        <FileManager open={open} onClose={e => setOpen(false)} />
      </Container>
    </Layout>
  )
}

export default IndexPage
