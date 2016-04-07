module.exports = {
	/*
	 	end point with access rule super => system token , user => user token
		'/endpoint': { 
        'post': [ExampleController.function, 'super'/ 'user']
        'get': [ExampleController.function, 'super'/ 'user']
    	}
	*/
    '/toasts': {
        'post': [ToastController.public, 'super'],
        'get': [ToastController.index, 'user']
    },
    '/toasts/:id': {
        'post': [ToastController.private, 'super']
    }
}