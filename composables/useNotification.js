export const notificationError = (title) => {
    const toast = useToast();
    useToast().error({
        title: title,
        position: 'topCenter',
        timeout: 2000,
        closeOnClick: false,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: false,
        rtl: false,
        icon: false
    })
}

export const notificationSuccess = (title) => {
    const toast = useToast();
    useToast().success({
        title: title,
        position: 'topCenter',
        timeout: 2000,
        closeOnClick: false,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: false,
        rtl: false,
        icon: false
    })
}