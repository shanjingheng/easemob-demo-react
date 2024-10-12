import React from 'react'
import { Tooltip, Button, rootStore } from 'easemob-chat-uikit'
import { useAppTheme } from '../../hooks'
import summary from '../../assets/summary.svg'
import toast from '../../components/toast/toast'
import i18next from '../../i18n'
import AdPopOver from '../../components/adPopover'

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
  const isEnglish = i18next.language === 'en'
  const prevCheck = () => {
    const { messageStore } = rootStore
    const groupId = messageStore.currentCVS.conversationId
    const groupMsgs = messageStore.message.groupChat[groupId]
    if (groupMsgs && groupMsgs.length >= 3) {
      return true
    } else {
      toast.error(i18next.t('SUMMARY_MESSAGE_NOT_ENOUGH'))
      setOpen(false)
      return false
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <Tooltip
        open={open}
        title={
          <ul className="cui-header-more">
            {OPTIONS_LIST.map((menuItem, index) => (
              <>
                {index === OPTIONS_LIST.length - 1 && (
                  <div
                    style={{ borderTop: '1px solid #E3E6E8', padding: '2px' }}
                  />
                )}
                <li
                  key={menuItem}
                  className={themeMode == 'dark' ? 'cui-li-dark' : ''}
                  style={{
                    width: isEnglish ? '280px' : '220px',
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
              </>
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
      <AdPopOver
        title={i18next.t('SUMMARY_AD_TITLE')}
        content={i18next.t('SUMMARY_AD_CONTENT')}
        show={true}
      />
    </div>
  )
}

export default CreateGroupChatSummary
