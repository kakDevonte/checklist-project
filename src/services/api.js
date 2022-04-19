import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/',

})

export const authAPI = {
    me() {
        return instance.get(`auth/`)
    },
    login(email, password) {
        return instance.post(`auth/login`, { email, password })
    },
    logout() {
        return instance.delete(`auth/`)
    }
}

export const usersAPI = {
    get() {
        return instance.get(`users/`)
    },
    getById(id) {
        return instance.get(`users/${id}`)
    },
    create(user) {
        return instance.post(`users/`, { user })
    },
    update(user) {
        return instance.put(`users/`, { user })
    },
    delete(id) {
        return instance.delete(`users/${id}`)
    }
}

export const checklistAPI = {
    get() {
        return instance.get(`checklist/`)
    },
    getForHead() {
        return instance.get(`checklist/head`)
    },
    getById(id) {
        return instance.get(`checklist/${id}`)
    },
    getByDepartment(department) {
        return instance.post(`checklist/department`, { department })
    },
    create(checklist) {
        return instance.post(`checklist/`,{ checklist })
    },
    update(checklist) {
        return instance.put(`checklist/`,{ checklist })
    },
    delete(id) {
        return instance.delete(`checklist/${id}`)
    }
}