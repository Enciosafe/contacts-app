import axios from "axios";


const BASE_URL = 'https://swizzcontactapp-default-rtdb.europe-west1.firebasedatabase.app'

export const addFolderToStore = (newFolder) => {
    axios.post(
        `${BASE_URL}/folders.json`,
         newFolder
    )
}

export const deleteFolderFromStore =(id) => {
    return axios.delete(
        `${BASE_URL}/folders/${id}.json`,
        )
}

export const fetchFolders = async () => {
    const response = await axios.get(
        `${BASE_URL}/folders.json`
    )

    const foldersList = []
    for(const key in response.data) {
        const folderObj = {
            id: key,
            image: response.data[key].image,
            title: response.data[key].title
        }
        foldersList.push(folderObj)
    }

    return foldersList
}

export const fetchContacts = async () => {
    const response = await axios.get(
        `${BASE_URL}/contacts.json`
    )

    const contactsList = []
    for(const key in response.data) {
        const contactObj = {
            folderId: response.data[key].folderId,
            id: key,
            name: response.data[key].name,
            description: response.data[key].description,
            email: response.data[key].email,
            phone: response.data[key].phone,
            photo: response.data[key].photo,
            instagram: response.data[key].instagram,
            telegram: response.data[key].telegram,
            whatsUp: response.data[key].whatsUp,
        }
        contactsList.push(contactObj)
    }

    return contactsList
}

export const addContactToStore = (newContact) => {
    axios.post(
        `${BASE_URL}/contacts.json`,
        newContact
    )
}

export const deleteContactFromStore =(id) => {
    return axios.delete(
        `${BASE_URL}/contacts/${id}.json`,
    )
}


