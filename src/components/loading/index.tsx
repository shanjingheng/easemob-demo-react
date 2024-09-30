import React from 'react'
import styles from './index.module.css' // 引入样式文件

const Loading: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  )
}

export default Loading
