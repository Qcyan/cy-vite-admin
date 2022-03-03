import useClipboard from 'vue-clipboard3'
import { message } from 'ant-design-vue';

/**
 * 复制文本
 * @param text
 */
export default function (text: string): void{
    const { toClipboard } = useClipboard()
    toClipboard(text).then(()=>{
        message.success('复制成功')
    }).catch(err => {
        message.info('复制失败')
    })
}