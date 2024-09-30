import axios from 'axios'
import { rootStore } from 'easemob-chat-uikit'

const isSandBox = true
const domain =
  (window.location.protocol === 'https:' ? 'https:' : 'http:') +
  (isSandBox ? '//a1-hsb.easemob.com' : '//a1-appserver.easemob.com')

export const uploadImage = (formData: FormData) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + rootStore.client.context.accessToken
  return axios
    .post(
      `${domain}/inside/app/user/${rootStore.client.user}/avatar/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    .then((response) => {
      return rootStore.client
        .updateOwnUserInfo('avatarurl', response.data.avatarUrl)
        .then((res: any) => {
          return response.data.avatarUrl
        })
    })
    .catch((error) => {
      console.error('uploadImage fail', error)
    })
}

async function sendRequest(groupId: string) {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + rootStore.client.context.accessToken
  return await axios
    .get(`${domain}/inside/app/group/${groupId}/avatarurl`)
    .then((response) => {
      return response.data.avatarUrl
    })
    .catch(() => {
      return ''
    })
}

export const getGroupAvatar = async (groupIds: string[]) => {
  let result: { [key: string]: string } = {}
  for (let groupId of groupIds) {
    result[groupId] = await sendRequest(groupId)
  }
  return result
}
