Vue.http.headers.common['Accept'] = 'application/json';



Vue.component('student', {
    template: "#template-student",
    props: ['student'],
    methods: {
        deleteStudent: function (student) {
            var index = vm.students.indexOf(student);
            vm.students.splice(index, 1);
            Vue.http.headers.common['Accept'] = 'application/json';
            this.$http.delete('http://localhost:4567/student/'+index,
                {headers: {'Accept': 'application/json'}} );
        }
    }
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
                    if(response.status === 200) {
                        Vue.set(vm, 'students', response.data);
                    } else {
                        alert('Error');
                    }
            })
        }
    }
});