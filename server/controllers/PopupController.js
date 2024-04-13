const popupService = require('../services/popup-service');
const cloudinary = require('cloudinary')

exports.createPopup = async (req, res) => {
    try {
        const { title, description, showModal, displayPhoto } = req.body

        if (!title || !description || !showModal || !displayPhoto) {
            return res.status(400).json({
                success: false,
                data: "All fields are mandatory"
            })
        }

        let uploadedPopupPhoto = ''
        if (displayPhoto) {
            uploadedPopupPhoto = await cloudinary.v2.uploader.upload(displayPhoto, {
                folder: "muscat/categories",
            })
        }


        const data = {
            title: title,
            description: description,
            visible: showModal,
            photo: uploadedPopupPhoto.secure_url
        }

        console.log(data)

        const response = await popupService.createPopup(data)

        return res.status(200).json({
            success: true,
            data: "Popup added successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: "Internal Server Error"
        })
    }
}

exports.editPopup = async (req, res) => {
    try {
        const { id, title, description, showModal, displayPhoto } = req.body;

        let uploadedPopupPhoto
        if (displayPhoto) {
            uploadedPopupPhoto = await cloudinary.v2.uploader.upload(displayPhoto, {
                folder: "muscat/Popups",
            })
        }

        console.log(uploadedPopupPhoto)

        const data = {
            _id: id,
            title: title,
            description: description,
            showModal: showModal,
            photo: uploadedPopupPhoto.secure_url
        }

        const response = await popupService.updatePopup(data)

        res.status(200).json({
            success: true,
            data: "Pop up updated"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: "Internal Server Error"
        })
    }
}

exports.showModalTrigger = async (req, res) => {
    try {
        const { id, showModal } = req.body

        if (showModal == null || !id) {
            return res.status(400).json({
                success: false,
                data: "Bad Request"
            })
        }

        const data = {
            _id: id,
            visible: showModal
        }

        const response = await popupService.updatePopup(data)

        let message;

        if (showModal == true) {
            message = "Pop up is now visible"
        } else if (showModal == false) {
            message = "Pop up is now hidden"
        }
        return res.status(200).json({
            success: true,
            data: message
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: "Internal Server Error"
        })
    }

}

exports.getPopup = async (req, res) => {
    try {
        const { id } = req.params

        const popup = await popupService.findPopup({ _id: id })

        if (!popup) {
            return res.status(404).json({
                success: false,
                data: null
            })
        }

        return res.status(200).json({
            success: true,
            data: popup
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: "Internal Server Error"
        })
    }
}

