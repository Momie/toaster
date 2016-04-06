module.exports = {

    '/toasts': {
        'post': ToastController.public,
        'get': ToastController.index
    },
    '/toasts/:id': {
        'post': ToastController.private
    }
}