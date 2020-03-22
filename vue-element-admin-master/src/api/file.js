import request from '@/utils/request'

export function addRootData(data) {
  return request({
    url: '/file/addroot/',
    method: 'post',
    data
  })
}
export function getFileList(data) {
  return request({
    url: '/file/filelist/',
    method: 'post',
    data
  })
}

export function getFileUploadStatus() {
  return request({
    url: '/file/getuploadfilestatus/',
    method: 'post'
  })
}
