import {ComputedRef, onMounted, Ref, watch} from 'vue';
import settings from '@/config/settings';
import {RoutesDataItem} from '@/utils/routes';

export default function useTitle(route: ComputedRef<RoutesDataItem> | Ref<RoutesDataItem>): void {

    const setTitle = (title: string): void => {
        document.title = `${title} - ${settings.siteTitle} - ${settings.platformTitle}`;
    }

    watch<RoutesDataItem, false>(route, (route) => {
        setTitle(route.title);
    })

    onMounted(() => {
        setTitle(route.value.title);
    })
}