import type { NotificationOptions } from '~/types'

export const notificationError = (title: string): void => {
    const toast = useToast()
    toast.error({
        title: title,
        position: 'topCenter',
        timeout: 2000,
        closeOnClick: false,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: false,
        rtl: false,
        icon: false
    } as NotificationOptions)
}

export const notificationSuccess = (title: string): void => {
    const toast = useToast()
    toast.success({
        title: title,
        position: 'topCenter',
        timeout: 2000,
        closeOnClick: false,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: false,
        rtl: false,
        icon: false
    } as NotificationOptions)
}