Vue.http.headers.common['Accept'] = 'application/json';

Vue.component('student', {
    template: "#template-student",
    props: ['student'],
});


var vm = new Vue({
    el: "#app",
    data: {
        students:[]
    },
    mounted: function() {
        this.fetchStudents()
    },
    methods: {
        fetchStudents: function () {
            this.$http.get('http://localhost:4567/students').
                then(function (response) {
                    console.log(response);
                    Vue.set(vm, 'students', response.data);
            })
        }
    }
});