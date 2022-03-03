export const requestID = "123458971";

interface PrintUtilsCommandProps {
    getPrintersCommand: () => object;
    getPrinterConfigCommand: (printer: string) => object;
    setPrinterConfigCommand: (name: string) => object;
    printCommand: (task: object, preview: boolean) => object;
    getTaskStatusCommand: (taskID: string[]) => object;
}

export const commandList = {
    print: "print",                         // 发送打印
    getPrinters: "getPrinters",             // 获取打印机
    getPrinterConfig: "getPrinterConfig",   // 获取打印机配置
    setPrinterConfig: "setPrinterConfig",   // 设置打印机配置
    getTaskStatus: "getTaskStatus",         // 获取打印状态
    PrintResultNotify: "PrintResultNotify", // 打印结果通知
}


class PrintUtilsCommand{
    /**
     * 获取打印机列表
     * pdd or taoBao
     */
    public static getPrintersCommand(): object {
        return {
            "cmd": "getPrinters",
            "requestID": requestID,
            "version": "1.0"
        }
    }

    /**
     * 获取打印机配置
     * @param printer
     * pdd or taoBao
     */
    public static getPrinterConfigCommand(printer: string): object {
        return {
            "cmd": "getPrinterConfig",
            "version": "1.0",
            "printer": printer,
            "requestID": requestID
        }
    }

    /**
     * 设置打印机配置
     * @param name
     * pdd or taoBao
     */
    public static setPrinterConfigCommand(name: string = 'PDD打印机'): object {
        return {
            "cmd": "setPrinterConfig",
            "requestID": requestID,
            "version": "1.0",
            "printer": {
                // "name": name, // 打印机名称
                // "needTopLogo": true, // 是否需要模板上联的快递logo
                // "needBottomLogo": false, // 是否需要模板下联的快递logo
                // "horizontalOffset": 0.5, // 水平偏移量
                // "verticalOffset": 0.7, // 垂直偏移量
                // "forceNoPageMargins": true, // 强制设置页面无空边
                // "autoPageSize": false, // 自适应纸张大小
                // "orientation": 0, // 0：纵向 1： 横向
                // "autoOrientation": false, // 按照 orientation 适应纸张方向
                // "paperSize": {
                //     "width": 100, // 打印机纸张的宽度，单位是毫米
                //     "height": 180 // 	打印机纸张的高度，单位是毫米
                //
                "name": name,
                "PrintTopLogo": true,
                "PrintBottomLogo": false,
                "horizontalOffset": 2,
                "verticalOffset": 2
            }
        }
    }

    /**
     * 发送打印/预览数据协议(print)
     * @param task
     * @param preview
     * pdd or taoBao
     */
    public static printCommand(task: object, preview: boolean = false): object {
        return {
            "cmd": "print",
            "requestID": requestID,
            "version": "1.0",
            "task": task
        }
    }

    /**
     * 获取任务打印任务状态(getTaskStatus)
     * @param taskID
     * pdd or taoBao
     */
    public static getTaskStatusCommand(taskID: string[] = []): object {
        return {
            "cmd": "getTaskStatus",
            "requestID": requestID,
            "version": "1.0",
            "taskID": taskID // 打印机任务ID列表
        }
    }
}

export default PrintUtilsCommand;