import React, { useState } from 'react'
import styles from './index.module.css' // 导入样式
import summary from '../../assets/summary.svg'
import i18n from '../../i18n'

interface ADPopoverProps {
  title: string
  content: string
  show: boolean
}

const ADPopover: React.FC<ADPopoverProps> = ({ title, content, show }) => {
  const [visible, setVisible] = useState(show)
  const isEnglish = i18n.language === 'en'
  const contentStyles = {
    padding: isEnglish ? '16px 3px' : '16px 10px'
  }

  const togglePopover = () => {
    setVisible(!visible)
  }

  return (
    <>
      {visible && (
        <div className={styles.container}>
          <button className={styles.closeButton} onClick={togglePopover}>
            &times;
          </button>
          <div className={styles.popover}>
            <div style={contentStyles} className={styles.popoverContent}>
              <div className={styles.popoverContentTitle}>{title}</div>
              <div className={styles.popoverContentContent}>{content}</div>
            </div>
            <div>
              <img width={48} src={summary} alt="summary" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ADPopover
