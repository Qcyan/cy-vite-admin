import {message} from "ant-design-vue";

class GlobalBaseWebsocket {
    public static instance: GlobalBaseWebsocket | null;
    public wsObject: WebSocket | undefined;
    public wsUrl: string;

    constructor(wsUrl: string) {
        this.wsUrl = wsUrl;
    }

    public async openWsConnect(): Promise<GlobalBaseWebsocket | null> {
        if (!!window.WebSocket) {
            return new Promise((resolve, reject) => {
                this.wsObject = new WebSocket(this.wsUrl);
                this.wsObject!.onerror = () => {
                    this.wsObject = undefined;
                    resolve(this)
                }
                this.wsObject!.onopen = (event: Event) => {
                    resolve(this)
                };

                this.wsObject!.onclose = (event: Event) => {
                    this.wsObject = undefined;
                    resolve(this)
                };

                this.wsObject!.onmessage =  (event: MessageEvent) =>  {
                    const printData = JSON.parse(event.data)
                    if(printData.cmd === 'print' && printData.previewURL){
                        window.open(printData.previewURL)
                    }
                }
            });
        } else {
            const msg: string = '您的浏览器不支持Websocket通信协议，请使用Chrome或者Firefox浏览器!';
            message ? message.warn(msg) : alert(msg);
            return null;
        }
    }

    public static getBaseWebsocket(wsUrl): GlobalBaseWebsocket {
        if (!this.instance) {
            this.instance = new GlobalBaseWebsocket(wsUrl);
        } else if (this.instance.wsObject?.readyState !== 1) {
            this.instance = new GlobalBaseWebsocket(wsUrl);
        }
        return this.instance;
    }
}

export default GlobalBaseWebsocket;