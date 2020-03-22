import request from '@/utils/request'

export function getRootData(data) {
  return request({
    url: '/data/getrootdata/',
    method: 'post',
    data
  })
}

export function getTableData(data) {
  return request({
    url: '/data/gettabledata/',
    method: 'post',
    data
  })
}

export function getTableColumn(data) {
  return request({
    url: '/data/gettablecolumn/',
    method: 'post',
    data
  })
}

export function getOpenData(data) {
  return request({
    url: '/data/getopendata/',
    method: 'post',
    data
  })
}
