import PrintInstance, {PrintParamsProps} from './printUtils'
import PrintUtilsCommand from "@/utils/printUtilsCommand";
import usePrinterListenHook from "@/hooks/printerListenHook";
import {message as Message} from "ant-design-vue";
import settings from '@/config/settings'

/**
 * 单例模式构建打印机对象
 */

class ProxySingletonPrintInstance {
    public static instance: PrintInstance<PrintParamsProps> | null;
    public static globalCtx: PrintInstance<PrintParamsProps> | null;

    /**
     * 打印获取打印机的连接url
     */
    public static getPrinterUrl(): string {
        return settings.printerList.find(item => item.name === settings.printerBaseName)!.wsUrl;
    }

    /**
     * 打印获取打印机的连接名称
     */
    public static getPrinterName(): string {
        return `${settings.platformTitle}打印组件`;
    }

    /**
     * 获取实例
     */
    public static getInstance(): PrintInstance<PrintParamsProps> {
        if (!this.instance) {
            console.log("%c no exist print instance start set up", "color:" + "blue");
            this.instance = new PrintInstance(this.connectParams());
            return this.instance;
        }
        console.log("%c exist print instance", "color:" + "blue");
        return this.instance;
    }

    /**
     * 判断是存在连接socket实例
     *   CONNECTING：值为0，表示正在连接。
     OPEN：值为1，表示连接成功，可以通信了。
     CLOSING：值为2，表示连接正在关闭。
     CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
     */
    public static isSuccessConnect(): boolean {
        return this.instance?.wsObject?.readyState === 1;
    }

    /**
     * 清除实例
     */
    public static clearInstance(): void {
        this.instance = null;
    }

    /**
     * 打开打印机连接
     */
    public static openConnectPrint(): Promise<number | null> {
        return new Promise(((resolve, reject) => {
            this.getInstance()?.openConnectPrint()?.then(ctx => {
                this.globalCtx = ctx;
                this.getPrinterList();
                resolve(ctx.wsObject!.readyState)
            }).catch(reject)
        }))
    }

    /**
     * 向打印机发送消息
     */
    public static send(msg: string): boolean {
        if (!this.isSuccessConnect()) {
            Message.info('请检查打印机是否连接!')
            return false;
        }
        this.instance?.wsObject?.send(msg);
        return true;
    }

    /**
     * 获取打印机列表命令
     */
    public static getPrinterList(): void {
        const command: string = JSON.stringify(PrintUtilsCommand.getPrintersCommand());
        this.globalCtx?.send(command);
    }

    /**
     * 打印机连接参数
     */
    public static connectParams(): PrintParamsProps {
        const {listenMessage} = usePrinterListenHook();
        return {
            printerUrl: this.getPrinterUrl(),
            printerName: this.getPrinterName(),
            messageEvent: (message: MessageEvent) => {
                const printData = JSON.parse(message.data);
                console.log(`%c =========================${settings.platformTitle}打印机交互信息=========================`, "color:#ff0000");
                console.log(printData);
                console.log(`%c =========================${settings.platformTitle}打印机交互信息=========================`, "color:#ff0000");
                listenMessage(printData);
            }
        };
    }
}

export default ProxySingletonPrintInstance;