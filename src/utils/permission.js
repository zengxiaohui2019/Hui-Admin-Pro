/**
*   @description 按扭级权限校验
*   @author Xiaohui Zeng
*   @date 2020-05-16
*/
import store from '@/store'
// 权限校验
/**
 * @param {Array} roleIds 权限id
 * @returns {Boolean}
 * @example v-if="checkPermission([1])"
 */
export default function checkPermission(roleIds) {
  if (roleIds && roleIds instanceof Array && roleIds.length > 0) {
    const roles = store.getters && store.getters.roles
    let flag = false
    roleIds.map(r => {
      flag = roles.includes(r)
    })
    return flag
  } else {
    // 如果是挂在到vue全局使用  v-if="$checkPermission([1])"
    console.error(`需要按照这个格式来设置 v-if="checkPermission([1])"`)
    return false
  }
}
