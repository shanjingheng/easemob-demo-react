import { useState, useEffect, useRef } from 'react'
import { useAppDispatch } from './index'
import { setSummaryList } from '../store/summaryInfoSlice'
import { Summary } from '../models'
import {
  generateSummaryApi,
  getSummaryHistoryApi,
  deleteSummaryApi
} from '../service/summary'
import toast from '../components/toast/toast'

interface useGroupChatSummaryProps {
  groupId: string
  userId: string
}
export const useGroupChatSummary = ({
  groupId,
  userId
}: useGroupChatSummaryProps) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState(null)
  const startTime = useRef<string>('')
  const endTime = useRef<string>('')

  const generateSummary = (hours: number) => {
    const now = new Date()
    endTime.current = now.getTime() + ''
    startTime.current = now.getTime() - hours * 60 * 60 * 1000 + ''
    const initSummary: Summary = {
      summaryId: '',
      isGenerating: true,
      startTimestamp: startTime.current,
      endTimestamp: endTime.current,
      topicInfos: []
    }
    dispatch(setSummaryList([initSummary]))
    setLoading(true)
    generateSummaryApi(groupId, userId, startTime.current, endTime.current)
      .then(({ data }) => {
        if (data.data.topicInfos.length === 0) {
          toast.info('该会话无法生产有效摘要')
        }
        dispatch(setSummaryList([data.data]))
        setSummary(data.data as any)
      })
      .catch((err) => {
        toast.error('生成会话摘要失败')
        dispatch(setSummaryList([{ ...initSummary, isGenerating: false }]))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const getSummaryHistory = () => {
    dispatch(setSummaryList([]))
    setLoading(true)
    getSummaryHistoryApi(groupId, userId)
      .then(({ data }) => {
        if (data.data.length === 0) {
          toast.info('暂无历史摘要')
          return
        }
        const sortData = data.data.sort(
          (a: any, b: any) => b.summaryTimestamp - a.summaryTimestamp
        )
        dispatch(setSummaryList(sortData))
      })
      .catch((err) => {
        toast.error('获取会话摘要历史失败')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const deleteSummary = (summaryId: string) => {
    setLoading(true)
    deleteSummaryApi(summaryId, groupId, userId)
      .then(() => {
        toast.success('删除会话摘要成功')
        getSummaryHistory()
      })
      .catch(() => {
        toast.error('删除会话摘要失败')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    loading,
    summary,
    startTime,
    endTime,
    generateSummary,
    getSummaryHistory,
    deleteSummary
  }
}
