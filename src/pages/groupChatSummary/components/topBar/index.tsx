import React from 'react'
import { Button, Icon } from 'easemob-chat-uikit'
import styles from './index.module.css'
import { useAppDispatch } from '../../../../hooks'
import { closePanel } from '../../../../store/summaryInfoSlice'

interface TopBarProps {
  title: string
  iconSrc: string
  iconAlt: string
}

const TopBar: React.FC<TopBarProps> = ({ title, iconSrc, iconAlt }) => {
  const dispatch = useAppDispatch()

  return (
    <div className="cui-header">
      <div className="cui-header-content">
        <div className="cui-header-content-box">
          <h1 className={styles.title}>{title}</h1>
        </div>
        <div className="cui-header-iconBox">
          <Button
            onClick={() => dispatch(closePanel())}
            type="text"
            shape="circle"
          >
            <Icon type="CLOSE" width={24} height={24} />
          </Button>
        </div>
      </div>
      {/* <hr className={styles.divider} /> */}
    </div>

    // <header className={styles.topBar}>
    //   <div className={styles.container}>
    //     <h1 className={styles.title}>{title}</h1>
    //     <Button type="text" shape="circle">
    //       <Icon type="CLOSE" width={24} height={24} />
    //     </Button>
    //   </div>
    //   <hr className={styles.divider} />
    // </header>
  )
}

export default TopBar
