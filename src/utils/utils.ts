/**
 * 字节长度
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
    // returns the byte length of an utf8 string
    let s = str.length
    for (var i = str.length - 1; i >= 0; i--) {
        const code = str.charCodeAt(i)
        if (code > 0x7f && code <= 0x7ff) s++
        else if (code > 0x7ff && code <= 0xffff) s += 2
        if (code >= 0xDC00 && code <= 0xDFFF) i--
    }
    return s
}


/**
 * 链接上参数转对象 param2Obj('https://webpack.js?id%3D3%26cc%3D4') => {id: "3", cc: "4"}
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"')
            .replace(/\+/g, ' ') +
        '"}'
    )
}

/**
 * 获取URL中某个参数的值
 * @param {String} name
 * @returns {String}
 */
export function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var res = window.location.search.substr(1).match(reg)
    if (res && res[2]) {
        return res[2]
    } else {
        return null
    }
}


/**
 * 链接上参数转对象 getQueryObject('https://webpack.js?id=3&cc=4') => {id: "3", cc: "4"}
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
    url = url == null ? window.location.href : url
    const search = url.substring(url.lastIndexOf('?') + 1)
    const obj = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1)
        let val = decodeURIComponent($2)
        val = String(val)
        obj[name] = val
        return rs
    })
    return obj
}

/**
 * 清空本地cookie
 */
export function clearCookie() {
    const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (let i = keys.length; i--;) {
            document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();//清除当前域名下的,例如：m.kevis.com
            document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();//清除当前域名下的，例如 .m.kevis.com
            document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString();//清除一级域名下的或指定的，例如 .kevis.com
        }
    }
}

/**
 * 检测图片地址是否有效
 * @param imgUrl
 */
export function checkImgExists(imgUrl) {
    return new Promise(function(resolve, reject) {
        var ImgObj = new Image();
        ImgObj.src = imgUrl;
        ImgObj.onload = function(res) {
            resolve(true);
        }
        ImgObj.onerror = function(err) {
            reject(false);
        }
    })
}
