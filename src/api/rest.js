import axios from 'axios';

const getEvents = (url) => {
    axios.get(url)
        .then((response) => {
            console.log(response);
        })
        .catch((error)=> {
            console.log(error);
        })
}

const createEvent = (url, body) => {
    axios.post(url, body)
        .then((response) => {
            console.log(response);
        })
        .catch((error)=> {
            console.log(error);
        })
}

const updateEvent = (url, body) => {
    axios.put(url, body)
        .then((response) => {
            console.log(response);
        })
        .catch((error)=> {
            console.log(error);
        })
}

const removeEvent = (url, body) => {
    axios.delete(url, body)
        .then((response) => {
            console.log(response);
        })
        .catch((error)=> {
            console.log(error);
        })
}

export {
    getEvents,
    createEvent,
    updateEvent,
    removeEvent
};
