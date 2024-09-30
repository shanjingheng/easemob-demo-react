import React, { useEffect } from 'react'
import styles from './index.module.css'
import TopicCard from '../topicCard'
import { useAppSelector } from '../../../../hooks'
import { useGroupChatSummary } from '../../../../hooks/useGroupChatSummary'
import { Summary } from '../../../../models'
import Loading from '../../../../components/loading'

function formatTimestamp(timestamp: string): string {
  if (!timestamp) return 'YYYY-MM-DD'
  // 将字符串时间戳转换为数字
  const date = new Date(Number(timestamp))

  // 获取年份、月份、日期、小时和分钟
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从0开始，需要加1
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  // 格式化为 YYYY-MM-DD HH:mm
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

const Container: React.FC = () => {
  const summaryInfo = useAppSelector((state) => state.summaryInfo)
  const { userId, groupId, hour } = summaryInfo.generateParams
  const { loading, generateSummary, getSummaryHistory, deleteSummary } =
    useGroupChatSummary({
      groupId,
      userId
    })

  useEffect(() => {
    const params = summaryInfo.generateParams
    if (params.hour === 0) {
      getSummaryHistory()
    } else {
      generateSummary(hour)
    }
  }, [summaryInfo.generateParams])

  const formatSummaryResult = (summary: Summary) => {
    const { summaryId, topicInfos, startTimestamp, endTimestamp } = summary
    console.log(topicInfos)
    return {
      summaryId,
      topics: topicInfos,
      loading: summary.isGenerating,
      timeRange: `${formatTimestamp(startTimestamp)} 至 ${formatTimestamp(
        endTimestamp
      )}`
    }
  }

  return (
    <div>
      <div className={styles.wrapper}>
        {loading && hour == 0 && (
          <div style={{ marginTop: '10px' }}>
            <Loading />
          </div>
        )}
        {summaryInfo.summaryList.map((summary, index) => {
          return (
            <TopicCard
              collapsed={index !== 0}
              deleteSummary={deleteSummary}
              key={summary.summaryId}
              {...formatSummaryResult(summary)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Container
