import router from "@/router"

// 判断是否为空 不为空返回数据 为空返回--
export const isNotNull = (data, str) => {
  if (isBlank(str)) {
    str = "--"
  }
  if (data == null || data === 'null' || data === '' || data === undefined || data === 'undefined' || data === 'unknown') {
    return str
  } else {
    return data
  }
}

// 判断是否为空 返回true/false
export const isBlank = (data) => {
  if (data == null || data === 'null' || data === '' || data === undefined || data === 'undefined' || data === 'unknown') {
    return true
  } else {
    return false
  }
}

// 返回上一页
export const backPage = () => {
  router.go(-1)
}
