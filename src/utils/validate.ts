/**
 * 判断是否是外链
 * @param {string} path
 * @returns {Boolean}
 * @author LiQingSong
 */
export const isExternal = (path: string): boolean => {
  return /^(https?:|mailto:|tel:)/.test(path);
};


/**
 * 判断手机号格式
 * @param {string} phone
 * @returns {Boolean}
 */
export function validPhone(phone:string):boolean {
    const reg = /^1[3456789]\d{9}$/
    return reg.test(phone)
}
