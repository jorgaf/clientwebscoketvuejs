Vue.component('q-option', {
    props: ['option','groupid'],
    template: `
        <div class="form-check">
            <input class="form-check-input" type="radio" :name="groupid" :value="option.id" :id="groupid +'_'+ option.id"> 
            <label class="form-check-label" :for="groupid +'_'+ option.id">
                {{ option.text }}
            </label>
        </div>        
                       
    `
});

new Vue({
    el: "#app",
    data: {
        status: "",
        key: "",
        survey:{}
    },
    methods: {
        connect() {
            socket = new WebSocket("ws://localhost:4567/survey");
            socket.onopen = this.openWs;
            socket.onerror = this.errorWs;
            socket.onmessage = this.messageWs;
        },
        openWs() {
            this.status = 'connected';
            console.log('connected');
            this.sendMessage(this.key);
        },
        errorWs(evt) {
            this.status = 'error';
            console.log(evt.data);
        },
        messageWs(evt) {
            this.survey = JSON.parse(evt.data);
            console.log(evt.data);
        },
        sendMessage(msgData) {
            socket.send(msgData);
        }
    }
});

