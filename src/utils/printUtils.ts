import {message, notification} from 'ant-design-vue';
import {createVNode} from 'vue'
import settings from "@/config/settings";

/**
 * 消息类型
 */
type MessageProps = string | ArrayBufferLike | Blob | ArrayBufferView;

/**
 * 实例参数
 */
export interface PrintParamsProps {
    /**
     * Socket参数URL
     */
    printerUrl: string;
    /**
     * 实例名称
     */
    printerName: string;
    /**
     * 消息监听事件
     * @param message
     */
    messageEvent?: (message: MessageEvent) => void;
    /**
     * 错误监听事件
     * @param ev
     */
    errorEvent?: (ev: Event) => void;
}

/**
 * 打印机对象实例接口
 */
export interface PrintInstanceProps extends PrintParamsProps {
    /**
     * Socket连接打印机对象
     */
    wsObject: WebSocket | null;
    /**
     * 打开socket 连接方法
     */
    openConnectPrint: () => Promise<PrintInstance<PrintParamsProps>> | null;
    /**
     * 获取实例名称
     */
    getPrinterName: () => string;
    /**
     * 发送消息给打印机
     */
    send: (message: MessageProps) => void;
}

/**
 * socket接口
 */
interface SocketEventProps {
    printerUrl: string;
    printerName: string;
    open: (event: Event) => void;
    close: (event: CloseEvent) => void;
    error: (event: Event) => void;
    message: (event: MessageEvent) => void;
}

/**
 * socket 参数
 */

class SocketEvent implements SocketEventProps {
    public printerName: string = '';
    public printerUrl: string = '';

    constructor(printProps: PrintParamsProps) {
        this.printerUrl = printProps.printerUrl;
        this.printerName = printProps.printerName;
    }

    /**
     * socket 连接打开
     * @protected
     */
    public open(event: Event): void {
        console.warn(this.printerName + '连接了' + this.printerUrl + '成功')
    }

    /**
     * socket 连接关闭
     * @protected
     */
    public close(closeEvent: CloseEvent): void {
        notification.info({
            placement: 'bottomRight',
            bottom: '52px',
            message: createVNode("h3", {}, "通知"),
            description: createVNode("div", {class: "print_info"}, [
                    createVNode("p", {}, `亲，系统检测到${this.printerName}启动失败，解决办法`),
                    createVNode("h3", {}, "1、未安装控件"),
                    createVNode("p", {}, [
                        createVNode("span", {}, '请先安装控件，'),
                        createVNode("a", {href: settings.proUrl.component, target: '_blank'}, '请点击此处下载'),
                        createVNode("span", {}, '安装好后重启浏览器即可。'),
                    ]),
                    createVNode("h3", {}, "2、已安装控件"),
                    createVNode("p", {}, `请在电脑的“开始菜单“>>>;“所有程序”里找到“${this.printerName}”进行启动。`),
                ]
            ),
        });
    }

    /**
     * socket 错误
     * @protected
     */
    public error(event: Event): void {
        console.warn(this.printerName + '连接出现错误')
    }

    /**
     * 监听消息接收
     * @param message
     * @protected
     */
    public message(message: MessageEvent): void {
        console.warn(`==============${this.printerName}接收到消息开始，！！！请传入自定义的接受消息事件==========`)
        console.log(message)
        console.warn(`==============${this.printerName}接收到消息结束，！！！请传入自定义的接受消息事件=========`)
    }
}


/**
 * 构造打印机实例
 */
class PrintInstance<T extends PrintParamsProps> extends SocketEvent implements PrintInstanceProps {
    public printerUrl: string;
    public printerName: string;
    public messageEvent?: (message: MessageEvent) => void;
    public errorEvent?: (ev: Event) => void;
    public wsObject: WebSocket | null;

    constructor(printProps: T) {
        super(printProps);
        this.printerUrl = printProps.printerUrl;
        this.printerName = printProps.printerName;
        this.messageEvent = printProps.messageEvent;
        this.errorEvent = printProps.errorEvent;
        this.wsObject = null;
    }

    /**
     * 获取打印对象实例名称
     */
    public getPrinterName(): string {
        return this.printerName;
    }

    /**
     * 打开连接
     */
    public openConnectPrint(): Promise<PrintInstance<T>> | null {
        if (!!window.WebSocket) {
            return new Promise((resolve, reject) => {
                this.wsObject = new WebSocket(this.printerUrl);
                this.wsObject!.onclose = this.errorEvent || this.close.bind(this);
                this.wsObject!.onmessage = this.messageEvent || this.message.bind(this);
                this.wsObject!.onerror = () => {
                    resolve(this)
                }
                this.wsObject!.onopen = (event: Event) => {
                    this.open(event);
                    resolve(this)
                };
            });
        } else {
            const msg: string = '您的浏览器不支持Websocket通信协议，请使用Chrome或者Firefox浏览器!';
            message ? message.warn(msg) : alert(msg);
            return null;
        }
    }

    /**
     * 发送消息给打印机
     * @param message
     */
    public send(message: MessageProps): void {
        this.wsObject?.send(message);
    }
}

export default PrintInstance;