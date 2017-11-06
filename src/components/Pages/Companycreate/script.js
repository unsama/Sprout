import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import Companycreatecompo from "./../../partials/Companycreatecompo/Companycreatecompo.vue"
import Modal from "./../../partials/Modal/Modal.vue"



export default{
    created: function () {
        document.title = this.title;
    },
    data(){
        return {
            head: "Companies / New",
            title: "Import a File - Sprout",
            btnlinks: {
                savebtnlink:"",
                discardbtnlink:""
            },

        }
    },

    components: {
        DashboardController,
        Companycreatecompo,
        Modal
    }
}
