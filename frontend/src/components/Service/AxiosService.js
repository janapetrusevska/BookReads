import axios from "axios";

const API_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type' : 'application/json',
    },
});

const setAuthorizationHeader = (token) => {
    if (token) {
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
};

export const registerUser = async (name, email, password) => {
    try {
        const response = await axiosInstance.post('/auth/register', {
            name: name,
            email: email,
            password: password,
        });
        return response.data.jwtToken;
    } catch (error) {
        throw new Error("Error registering user: " + error.message);
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post("http://localhost:8080/api/auth/authenticate", {
            email,
            password
        });
        return response.data.jwtToken;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error("Invalid credentials, please try again.");
        } else {
            throw new Error(error.response?.data?.message || "An error occurred. Please try again later.");
        }
    }
};

export const fetchReaderProfile = async (token, readerId) => {
    setAuthorizationHeader(token);
    try {
        const response = await axiosInstance.get(`/reader/profile/${readerId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching reader profile: ' + error.message);
    }
};

export const fetchAllReaders = async (token) => {
    setAuthorizationHeader(token);
    try{
        const response = await axiosInstance.get(`/reader/all`);
        return response.data;
    } catch (error){
        console.error("Error fetching all readers:", error);
        throw error;
    }
}

export const editProfileInfo = async (token, profileInfoRequest) => {
    setAuthorizationHeader(token);
    try {
        const response = await axiosInstance.put(`/reader/editProfile`,
            profileInfoRequest,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching reader profile: ' + error.message);
    }
};


export const logoutUser = async (token) => {
    setAuthorizationHeader(token);
    try {
        await axiosInstance.post('/auth/logout');
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
};

export const fetchReadingLists = async (token,readerId) => {
    setAuthorizationHeader(token)
    try {
        const response = await axiosInstance.get(`/readingList/byReader/${readerId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching reading lists: ' + error.message);
    }
};

export const fetchBooks = async (token) => {
    setAuthorizationHeader(token);
    try {
        const response = await axiosInstance.get(`/books`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching books: ' + error.message);
    }
};


export const fetchBooksByIds = async (ids, token) => {
    setAuthorizationHeader(token);
    try {
        const response = await axiosInstance.post(`/books/byIds`, ids, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching books by IDs:", error);
        throw error;
    }
};


export const fetchBooksByReaderByStatus = async (readerId,token, status) => {
    setAuthorizationHeader(token);
    try{
        const response = await axiosInstance.get(`/books/status/${status}/${readerId}`);
        return response.data;
    } catch (error){
        throw new Error("Error fetching books: "+error.message);
    }
};

export const fetchBooksByStatus = async (token, status) => {
    setAuthorizationHeader(token);
    try{
        const response = await axiosInstance.get(`/books/status/${status}`);
        return response.data;
    } catch (error){
        throw new Error("Error fetching books: "+error.message);
    }
};

export const fetchGenres = async (token) => {
    try {
        const response = await axiosInstance.get('/books/genres', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching genres: ' + error.message);
    }
};

export const addOrUpdateBook = async (bookData, cover, token, isEditMode, bookId) => {
    const data = new FormData();
    data.append('bookDtoRequest', JSON.stringify(bookData));
    if (cover) {
        data.append('cover', cover);
    }

    try {
        const url = isEditMode
            ? `/books/update/${bookId}`
            : '/books/add';
        const method = isEditMode ? 'put' : 'post';

        await axiosInstance[method](url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        throw new Error('Error adding/updating book: ' + error.message);
    }
};

export const changeBookStatus = async (bookId, newStatus, token) => {
    setAuthorizationHeader(token);
    try {
        await axiosInstance.put(`/books/updateStatus/${bookId}`, {
            status: newStatus
        });
    } catch (error) {
        throw new Error('Error changing book status: ' + error.message);
    }
};

export const deleteBook = async (bookId, token) => {
    setAuthorizationHeader(token);
    try {
        await axiosInstance.delete(`/books/delete/${bookId}`);
    } catch (error) {
        throw new Error('Error deleting book: ' + error.message);
    }
};

export const createReadingList = async (readingListData, token) => {
    setAuthorizationHeader(token);
    try{
        await axiosInstance.post(`readingList/create`, readingListData);
    } catch (error){
        throw new Error('Error creating a reading list: ' + error.message);
    }
}

export const deleteReadingList = async (readingListId, token) => {
    setAuthorizationHeader(token);
    try {
        await axiosInstance.delete(`/readingList/delete/${readingListId}`);
    } catch (error) {
        throw new Error('Error deleting book: ' + error.message);
    }
};

export const createOrUpdateReadingList = async (readingListData, token, isEditMode, readingListId) => {
    const data = new FormData();
    data.append('readingListDto', JSON.stringify(readingListData));
    setAuthorizationHeader(token);
    try {
        const url = isEditMode
            ? `/readingList/update/${readingListId}`
            : '/readingList/create';
        const method = isEditMode ? 'put' : 'post';

        if (isEditMode) {
            const data = new FormData();
            data.append('readingListDto', JSON.stringify(readingListData));

            await axiosInstance[method](url, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } else {
            await axiosInstance[method](url, JSON.stringify(readingListData), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    } catch (error) {
        throw new Error('Error adding/updating reading list: ' + error.message);
    }
};

export const fetchIsReaderFollowed = async (isFollowed, token) => {
    setAuthorizationHeader(token);
    try {
        const response = await axiosInstance.get(`/reader/isFollowed/${isFollowed}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching followed reader: ' + error.message);
    }
};

export const followReader = async (followingId, token) => {
    setAuthorizationHeader(token);
    try{
        const response = await axiosInstance.post(`/reader/follow/${followingId}`);
        return response.data;
    } catch (error){
        throw new Error('Error following reader: ' + error.message);
    }
};

export const unfollowReader = async (followingId, token) => {
    setAuthorizationHeader(token);
    try{
        const response = await axiosInstance.delete(`/reader/unfollow/${followingId}`);
        return response.data;
    } catch (error){
        throw new Error('Error following reader: ' + error.message);
    }
};

