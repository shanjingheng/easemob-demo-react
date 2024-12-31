import axios from 'axios'
import { rootStore } from 'easemob-chat-uikit'
import { appKey } from '../config'

const isSandBox = true
const domain =
  (window.location.protocol === 'https:' ? 'https:' : 'http:') +
  (isSandBox ? '//a1-hsb.easemob.com' : '//a1-appserver.easemob.com')

const [orgName, appName] = appKey.split('#')

export const generateSummaryApi = (
  groupId: string,
  userId: string,
  startTime: string,
  endTime: string
) => {
  return axios.post(
    `${domain}/${orgName}/${appName}/sdk/agent/v1/messages/summary`,
    {
      conversationId: groupId,
      username: userId,
      chatType: 'chatgroup',
      startTimestamp: startTime,
      endTimestamp: endTime
    },
    {
      headers: {
        Authorization: 'Bearer ' + rootStore.client.context.accessToken
      }
    }
  )
}

export const getSummaryHistoryApi = (groupId: string, userId: string) => {
  return axios.get(
    `${domain}/${orgName}/${appName}/sdk/agent/v1/messages/summaries`,
    {
      headers: {
        Authorization: 'Bearer ' + rootStore.client.context.accessToken
      },
      params: {
        chatType: 'chatgroup',
        conversationId: groupId,
        username: userId
      }
    }
  )
}

export const deleteSummaryApi = (
  summaryId: string,
  groupId: string,
  userId: string
) => {
  return axios.delete(
    `${domain}/${orgName}/${appName}/sdk/agent/v1/messages/summary/${summaryId}`,
    {
      headers: {
        Authorization: 'Bearer ' + rootStore.client.context.accessToken
      },
      params: {
        chatType: 'chatgroup',
        conversationId: groupId,
        username: userId
      }
    }
  )
}
