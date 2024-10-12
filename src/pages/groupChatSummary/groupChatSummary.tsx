import React from 'react'
import TopBar from './components/topBar'
import Container from './components/container'
import i18next from '../../i18n'

const GroupChatSummary: React.FC = () => {
  return (
    <div>
      <TopBar title={i18next.t('AI_SUMMARY')} />
      <Container />
    </div>
  )
}

export default GroupChatSummary
