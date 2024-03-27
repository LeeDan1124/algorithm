/**
 * 产品新功能AAA上线了，需要做一个Tips通知提醒“Hello，AAA上线了”。
 * 需要做到如下功能：
 * 1.访问者首次打开页面，弹出提醒；24小时内再次进入页面，不提醒 
 * 2.访问者点击“知道了“，以后再次进入页面都不提醒。
 * 请补全以下类实现，支持判断是否需要展示和无需再展示
 */
// const _Cookies = '_bfaStatusPVSend=1; _RSG=5aKx6jfYxoEoWOvtn.5O0A; _RDG=2883fb3f4eb22823203064f75b6e024615; _RGUID=ecbb8a9b-46ed-4905-a018-17ec77e58832; nfes_isSupportWebP=1; trine_language=zh-CN; UBT_VID=1672108835535.44yp1k; _bfi=p1%3D10650082524%26p2%3D10650082524%26v1%3D19%26v2%3D18; _bfaStatus=success; Servers_Eid=TR023844; PRO_Servers_Eid=TR023844; IFS_FP=583E88-C6D8AF-768A12; offlineTicket=_46EC77AB64435BFBB109891D0393EC5C446BFE687784269EF47FAD3372D514D0; userInfo=%7B%22eid%22%3A%22TR023844%22%2C%22city%22%3A%22%E5%8C%97%E4%BA%AC%22%2C%22company%22%3A%22BG-%E6%9C%BA%E7%A5%A8%E4%BA%8B%E4%B8%9A%E7%BE%A4%22%2C%22department%22%3A%22%E6%9C%BA%E7%A5%A8%E7%A0%94%E5%8F%91%E9%83%A8%22%2C%22displayName%22%3A%22Dan%20Li%20%EF%BC%88%E6%9D%8E%E6%97%A6%EF%BC%89%22%2C%22employee%22%3A%22TR023844%22%2C%22mail%22%3A%22dli25%40trip.com%22%2C%22name%22%3A%22dli25%22%2C%22sn%22%3A%22ld%E6%9D%8E%E6%97%A6%22%7D; _ubtstatus=%7B%22vid%22%3A%221672108835535.44yp1k%22%2C%22sid%22%3A132%2C%22pvid%22%3A18%2C%22pid%22%3A10650080138%7D; bbz_offlineLocale=zh-CN; trine_uid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzg0MTc0MjMzN2VhODAwNGYxOWZkNGIiLCJpYXQiOjE3MTA5MzIwMTAsImV4cCI6MTcxMzUyNDAxMH0.blnSWASMoArxdCj9rrHy9nY85m0Dskf17MglbvAPO9s; _RF1=123.125.172.11; _bfa=1.1672108835535.44yp1k.1.1711536823270.1711537435976.138.3.10650041520'

// 标记字段前端缓存，约束使用Cookie
// 请对Cookied的存取封装处理，补全代码
let myCookie = {

  // 用于解码编码
  __read: (value) => {
    return decodeURIComponent(value);
  },

  __write: (value) => {
      return encodeURIComponent(value);
  },
  
  // 查询cookie中指定name的value值  'a=1; b=2; c=3;' 
  get: (name) => {

    if (!document) return

    const cookies = document?.cookie || _Cookies

    const cookieMap = cookies.split('; ')?.reduce((pre, cur) => {
      const parts = cur.split('=')
      const key = myCookie.__read(parts[0])
      const value = myCookie.__read(parts[1])
      pre[key] = value
      return pre
    }, {})

    return cookieMap[name]

  },

  // 保存指定name的value值，并设定expiresDays过期时间（单位天）
  set: (name, value, expireDays) => {

    if (!document || !name) return

    const days = expireDays || 1

    const enCodeName = myCookie.__write(name)
    const enCodeValue = myCookie.__write(value)

    const attributes = {
      expires: new Date(Date.now() + 86400000 * days),
      path: '/'
    }

    const _attributes = Object.keys(attributes).reduce((pre, cur) => {
      const curStr = `${cur}=${attributes[cur]}`
      pre += `; ${curStr}`
      return pre
    }, '')

    document.cookie = `${enCodeName}=${enCodeValue}${_attributes}`
  }
}

// 补全代码
let TipsManager = {
   
  // 检查是否需要展示，返回结果；并自动更新Cookie值
  checkShowTips: (tipsKey) => {

    const tipsValue = myCookie.get(tipsKey)

    // 已被设置不再展示
    if (tipsValue === 'never_show') return false;
  
    // 首次进入或可能被用户手动清空Cookie缓存
    if (tipsValue === '' || tipsValue === undefined) {
        myCookie.set(tipsKey, 'next_show', 1);
        return true;
    }

    // 24小时内访问过
    if (tipsValue === 'next_show') {
        myCookie.set(tipsKey, 'next_show', 1);
        return false;
    } else {
    // 24小时之后再次访问
        myCookie.set(tipsKey, 'next_show', 1);
        return true;
    }
    // return true 或 false
  },

  // 永远不再提示
  disableTips: (tipsKey) => {
    myCookie.set(tipsKey, 'never_show', 365)
  }
}

// Component 片段代码
// 判断是否需要展示tips
let showTips = TipsManager.checkShowTips('_RDG');
// 用户点击知道了，不再展示
TipsManager.disableTips('AAA');







/*
评分重点
1. Cookie操作函数Set Get实现 [0 - 3]
2. Cookie Set函数，存入Cookie时编码处理，超时时间需要toUTCString [0 - 3]
3. 调用myCookie.get函数，返回值判断 [0 - 2]
4. 这种实现机制是否有缺陷，表述[0 - 2]
*/