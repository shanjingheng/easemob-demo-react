export interface Topic {
  title: string
  content: string
  msgCount: string
  firstMsgId: string
  lastMsgId: string
  participants: string[]
}

export interface Summary {
  summaryId: string
  isGenerating: boolean
  startTimestamp: string
  endTimestamp: string
  topicInfos: Topic[]
}
