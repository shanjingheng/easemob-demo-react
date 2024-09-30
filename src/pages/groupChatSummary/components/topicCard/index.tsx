import React, { useState } from 'react'
import styles from './index.module.css'
// import { ReactComponent as PauseIcon } from '../../../../assets/pause.svg'
// import { ReactComponent as RebuildIcon } from '../../../../assets/rebuild.svg'
import { ReactComponent as ChatIcon } from '../../../../assets/chat.svg'
import { Icon, rootStore, Avatar, Modal } from 'easemob-chat-uikit'
import { Topic } from '../../../../models'
import Loading from '../../../../components/loading'
import toast from '../../../../components/toast/toast'

type TopicProps = Topic & {}

interface TopicCardProps {
  summaryId: string
  loading: boolean
  collapsed: boolean
  timeRange: string
  mediaItems?: string[]
  topics?: TopicProps[]
  deleteSummary: (summaryId: string) => void
}

interface MediaContentProps {
  firstMsgId: string
  lastMsgId: string
  groupId: string
}

const scrollToMsg = (messageId: string) => {
  const localMsg = rootStore.messageStore.message.byId[messageId]
  if (localMsg) messageId = localMsg.id
  const anchorElement = document.getElementById(messageId)
  if (!anchorElement) {
    toast.info('本地消息中未找到该消息')
    return
  }
  anchorElement?.scrollIntoView({ behavior: 'smooth' })
  anchorElement?.classList.add('reply-message-twinkle')
  setTimeout(() => {
    anchorElement?.classList.remove('reply-message-twinkle')
  }, 1500)
}

const MediaContent: React.FC<MediaContentProps> = ({
  firstMsgId,
  lastMsgId,
  groupId
}) => {
  const { messageStore } = rootStore
  const groupMsgs = messageStore.message.groupChat[groupId]
  if (!groupMsgs || groupMsgs.length === 0) return null

  const imgMsgs = []
  const attachmentMsgs = []

  let begin = false
  let over = false

  const sortGroupMsgs = groupMsgs.sort((a, b) => a.time - b.time)

  for (let i = 0; i < sortGroupMsgs.length; i++) {
    const msg = sortGroupMsgs[i]
    const msgId = msg.mid || msg.id
    if (msgId === firstMsgId) {
      begin = true
    }
    if (begin && !over) {
      if (msg.type === 'img') {
        imgMsgs.push(msg)
      } else if (msg.type === 'file') {
        attachmentMsgs.push(msg)
      }
    }
    if (msgId === lastMsgId) {
      over = true
    }
  }
  return (
    <div>
      {imgMsgs.length > 0 && (
        <>
          <h3 className={styles.mediaSection}>该话题时段包含图片</h3>
          <div className={styles.mediaPreview}>
            {imgMsgs.map((msg) => (
              <img
                key={msg.id}
                src={msg.bySelf ? msg.url || msg?.file?.url : msg.thumb}
                alt=""
                className={styles.mediaItem}
                onClick={() => scrollToMsg(msg.id)}
              />
            ))}
          </div>
        </>
      )}

      {attachmentMsgs.length > 0 && (
        <>
          <h3 className={styles.mediaSection}>该话题时段包含附件</h3>
          <div>
            {attachmentMsgs.map((msg) => {
              return (
                <article
                  className={styles.contactListItem}
                  onClick={() => scrollToMsg(msg.id)}
                >
                  <div className="cui-message-file-icon">
                    <Icon
                      type={'DOC'}
                      height="32px"
                      width="32px"
                      color="#ACB4B9"
                    ></Icon>
                  </div>
                  <div className={styles.contentWrapper}>
                    <div className={styles.documentTitle}>{msg.filename}</div>
                    <span className={styles.fileSize}>
                      {(msg.file_length / 1024).toFixed(2)}kb
                    </span>
                  </div>
                </article>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

const TopicCard: React.FC<TopicCardProps> = ({
  timeRange,
  topics,
  summaryId,
  collapsed,
  loading,
  deleteSummary
}) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  // const [generating, setGenerating] = useState(loading)
  const toggleCollapse = () => setIsCollapsed(!isCollapsed)
  const { messageStore } = rootStore
  const groupId = messageStore.currentCVS.conversationId

  return (
    <article className={styles.topicCard}>
      <header className={styles.header}>
        <time className={styles.timeRange}>{timeRange}</time>
        <div className={styles.actionButtons}>
          {/* <button className={styles.actionButton}>
            <RebuildIcon className={styles.actionIcon} />
          </button> */}
          {/* <button
            className={styles.actionButton}
            onClick={() => {
              // setGenerating(!generating)
            }}
          >
            <PauseIcon className={styles.actionIcon} />
          </button> */}
          {summaryId && (
            <button
              className={styles.actionButton}
              onClick={() => {
                setShowDeleteModal(true)
              }}
            >
              <Icon
                className={styles.actionIcon}
                type="DELETE"
                width={16}
                height={16}
              />
            </button>
          )}

          {isCollapsed && (
            <button onClick={toggleCollapse} className={styles.actionButton}>
              <Icon
                className={styles.actionIcon}
                type="ARROW_DOWN"
                width={16}
                height={16}
              />
            </button>
          )}
          {!isCollapsed && (
            <button
              style={{ marginLeft: '-2px' }}
              onClick={toggleCollapse}
              className={styles.actionButton}
            >
              <Icon
                className={styles.actionButton}
                type="ARROW_UP"
                width={16}
                height={16}
              />
            </button>
          )}
        </div>
      </header>
      {!isCollapsed && (
        <div>
          {loading ? (
            <div className={styles.loading}>
              <Loading />
            </div>
          ) : (
            <div style={{ width: '100%' }}>
              {topics?.map((topic, index) => {
                const {
                  title,
                  msgCount,
                  firstMsgId,
                  participants = [],
                  content
                } = topic
                return (
                  <div
                    key={index}
                    className={styles.topicContainer}
                    // style={{
                    //   borderBottom: '1px solid var(--Neutral-9, #e3e6e8)',
                    //   width: '100%'
                    // }}
                  >
                    <h2 className={styles.topicTitle}>{title}</h2>
                    <div className={styles.messageInfo}>
                      <ChatIcon />
                      <div className={styles.messageCount}>
                        <span>该话题共{msgCount}条消息</span>
                        <Icon
                          type="ARROW_UP_THICK"
                          className={styles.actionIcon}
                          onClick={() => scrollToMsg(firstMsgId)}
                          width={16}
                          height={16}
                        />
                      </div>
                    </div>
                    <div className={styles.participantInfo}>
                      {participants.map((participant, index) => (
                        <Avatar
                          key={participant}
                          src={
                            rootStore.addressStore.appUsersInfo[participant]
                              ?.avatarurl
                          }
                          size={16}
                          shape="square"
                        >
                          {
                            rootStore.addressStore.appUsersInfo[participant]
                              ?.nickname
                          }
                        </Avatar>
                      ))}
                      <span>{participants.length}人参与</span>
                    </div>
                    <p className={styles.topicContent}>{content}</p>
                    <MediaContent
                      {...{ firstMsgId, lastMsgId: topic.lastMsgId, groupId }}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
      <Modal
        title="删除会话摘要"
        open={showDeleteModal}
        onOk={() => {
          setShowDeleteModal(false)
          deleteSummary(summaryId)
        }}
        onCancel={() => {
          setShowDeleteModal(false)
        }}
      >
        <p>
          确认删除<span className={styles.deleteTime}>{timeRange}</span>
          生成的会话摘要？
        </p>
      </Modal>
    </article>
  )
}

export default TopicCard
