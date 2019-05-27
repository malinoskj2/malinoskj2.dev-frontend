export default  {

    methods: {
        supportsIntersectionObserver() {
            return 'IntersectionObserver' in window;
        }
    }
};
