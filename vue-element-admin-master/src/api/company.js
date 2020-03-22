import request from '@/utils/request'
import { CodeToText } from 'element-china-area-data'

export function addCompany(data) {
  return request({
    url: '/company/add-info/',
    method: 'post',
    data
  })
}
export function listCompany() {
  return request({
    url: '/company/get-info/',
    method: 'post'
  })
}
export function delCompany(data) {
  return request({
    url: '/company/del-info/',
    method: 'post',
    data
  })
}

export function regionConvert(data) {
  if (data){
    data.map(item1 => {
      console.log(item1)
      if (item1['companyRegions']){
        let data_result = ''
        let data_region = item1['companyRegions']
        let data_array = data_region.split('-')
        console.log(data_array)
        data_array.map((item) => {
          data_result = data_result + CodeToText[item]
          data_result = data_result + '/'
          console.log(data_result)
        })
        data_result = data_result.substring(0,data_result.length-1)
        console.log(data_result)
        item1['companyRegions'] = data_result
        console.log(item1)
      } else {
        item1['companyRegions'] = '-'
      }
    })
  }
  return data
}
