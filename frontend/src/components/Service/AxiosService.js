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

export const fetchReaderProfile = async (token, email) => {
    setAuthorizationHeader(token);
    try {
        const response = await axiosInstance.get(`/reader/profile`,{
            params: {
                "email" : email,
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

export const fetchReadingLists = async (token) => {
    setAuthorizationHeader(token);
    try {
        const response = await axiosInstance.get('/readingList');
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