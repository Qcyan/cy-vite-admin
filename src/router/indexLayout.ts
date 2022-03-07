import { RoutesDataItem } from '@/utils/routes'

import homeRouter from './home'
import otherRouter from './other'
import orderPrintRouter from './orderPrint'
import freeOrderRouter from './freeOrder'
import printDailyRouter from './printDaily'
import shopConfigRouter from './shopConfig'
import settingRouter from './setting'

const IndexLayoutRoutes: Array<RoutesDataItem> = [
    homeRouter, // 首页
    orderPrintRouter, // 订单打印
    freeOrderRouter, // 自由打印
    printDailyRouter, // 打印日志
    shopConfigRouter, // 店铺打印
    settingRouter // 设置
    // otherRouter
]
export default IndexLayoutRoutes
