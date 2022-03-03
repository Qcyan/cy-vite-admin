import mitt, {Emitter} from 'src/utils/mitt';

// 自由订单全选 -> 底部栏
export type FreeReturnProps = { isTrue: boolean; selectKeys: Array<number | string> };

export type Events = {
    checkTriggerType?: boolean;
    printTemplateChange?: string | number;
    setOrderPrintMerge?: boolean | null;
    setTemplateId?: number | null; // 快递模板 -> ID选择
    freeOrderSelectKey?: FreeReturnProps; // 自由订单全选 -> 底部栏
    freeOrderAllCheck?: boolean; // 底部栏 -> 自由订单全选
    printDailyPrinter?: string; // 日志打印 -> 打印机更改
    printTriggerUpdate?: boolean; // 打印触发页面局部更新
}
const mitter: Emitter<Events> = mitt<Events>();
export default mitter;
