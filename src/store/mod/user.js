import dayjs from "dayjs";

export default {
    state: {
        accessTime: {},
        previousAccessTime: {},
        accessCount: {}
    },
    getters: {
        accessTime: state => state.accessTime,
        accessTimeString: state => dayjs(state.accessTime).format('MMMM-YYYY HH:mm:ss'),
        previousAccessTime: state => state.previousAccessTime,
        previousAccessTimeString: state => dayjs(state.previousAccessTime)
            .format('MMMM-YYYY HH:mm:ss'),
        accessCount: state => state.accessCount
    }
}
