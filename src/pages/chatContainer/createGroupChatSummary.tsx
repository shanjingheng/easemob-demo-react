import React from 'react'
import { Tooltip, Button, rootStore } from 'easemob-chat-uikit'
import { useAppTheme } from '../../hooks'
import summary from '../../assets/summary.svg'
import toast from '../../components/toast/toast'
import i18next from '../../i18n'

const OPTIONS_LIST = [
  'SUMMARY_1_HOUR',
  'SUMMARY_8_HOURS',
  'SUMMARY_24_HOURS',
  'SUMMARY_HISTORY'
]

interface CreateGroupChatSummaryProps {
  open: boolean
  onClick: (item: string) => void
  setOpen: (open: boolean) => void
}

const CreateGroupChatSummary: React.FC<CreateGroupChatSummaryProps> = ({
  open,
  setOpen,
  onClick
}) => {
  const theme = useAppTheme()
  const themeMode = theme?.mode

  const prevCheck = () => {
    const { messageStore } = rootStore
    const groupId = messageStore.currentCVS.conversationId
    const groupMsgs = messageStore.message.groupChat[groupId]
    if (groupMsgs && groupMsgs.length > 3) {
      return true
    } else {
      toast.error('消息数量不足，无法生成回话摘要！')
      setOpen(false)
      return false
    }
  }

  return (
    <Tooltip
      open={open}
      title={
        <ul className="cui-header-more">
          {OPTIONS_LIST.map((menuItem) => (
            <li
              key={menuItem}
              className={themeMode == 'dark' ? 'cui-li-dark' : ''}
              style={{
                width: '212px',
                display: 'flex',
                justifyContent: 'space-between',
                boxSizing: 'border-box'
              }}
              data-name={menuItem}
              onClick={() => {
                if (menuItem !== 'SUMMARY_HISTORY') {
                  prevCheck() && onClick(menuItem)
                } else {
                  onClick(menuItem)
                }
              }}
            >
              {i18next.t(menuItem)}
            </li>
          ))}
        </ul>
      }
      trigger="click"
    >
      <Button
        onClick={() => {
          setOpen(!open)
        }}
        type="text"
        shape="circle"
      >
        <img src={summary} alt="summary" />
      </Button>
    </Tooltip>
  )
}

export default CreateGroupChatSummary
