import axios from "axios";


// const BASE_URL = 'https://swizzcontactapp-default-rtdb.europe-west1.firebasedatabase.app'
const BASE_URL = 'https://quickme-8da9a-default-rtdb.europe-west1.firebasedatabase.app/'




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

export const updateFolderToStore = (id, updatedFolder) => {
    return axios.patch(
        `${BASE_URL}/folders/${id}.json`,
        updatedFolder
    )
}

export const updateContactToStore = (id, updatedContact) => {
    return axios.patch(
        `${BASE_URL}/contacts/${id}.json`,
        updatedContact
    )
}

export const updateUserDataToStore = (id, updatedUserData) => {
    return axios.patch(
        `${BASE_URL}/userData/${id}.json`,
        updatedUserData
    )
}

export const fetchFolders = async () => {
    const response = await axios.get(
        `${BASE_URL}/folders.json`,
    )
    const foldersList = []
    for(const key in response.data) {
        const folderObj = {
            idFromUser: response.data[key].idFromUser,
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
            idFromUser: response.data[key].idFromUser,
            id: key,
            name: response.data[key].name,
            description: response.data[key].description,
            email: response.data[key].email,
            phone: response.data[key].phone,
            photo: response.data[key].photo,
            instagram: response.data[key].instagram,
            telegram: response.data[key].telegram,
            whatsUp: response.data[key].whatsUp,
            facebook: response.data[key].facebook,
            address: response.data[key].address
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

export const addUserDataToStore = (userData) => {
    axios.post(
        `${BASE_URL}/userData.json`,
        userData
    )
}

export const fetchUserData = async () => {
    const response = await axios.get(
        `${BASE_URL}/userData.json`
    ).catch(e => console.log(e.message))

    const userDataList = []
    for(const key in response.data) {
        const userDataObj = {
            idFromUser: response.data[key].idFromUser,
            id: key,
            name: response.data[key].name,
            description: response.data[key].description,
            email: response.data[key].email,
            phone: response.data[key].phone,
            photo: response.data[key].photo,
            instagram: response.data[key].instagram,
            telegram: response.data[key].telegram,
            whatsUp: response.data[key].whatsUp,
            facebook: response.data[key].facebook,
            address: response.data[key].address,
        }
        userDataList.push(userDataObj)
    }
    return userDataList
}



