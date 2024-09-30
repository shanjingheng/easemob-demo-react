import React from 'react'
import TopBar from './components/topBar'
import Container from './components/container'

interface GroupChatSummaryProps {}

const GroupChatSummary: React.FC = () => {
  return (
    <div>
      <TopBar
        title="AI会话摘要"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/c8de61ef5491da8cad65d130e0e2a75b6121db8a695b1b40af214412e8fe8a63?apiKey=98184d97efb442c6919be56ac8a061eb&"
        iconAlt="Options icon"
      />
      <Container />
    </div>
  )
}

export default GroupChatSummary
