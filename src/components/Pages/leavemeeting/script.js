import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import TableMain from "./../../partials/TableMain/TableMain.vue"

export default{
    created: function () {
        document.title = this.title;
        var self = this;
        this.select();
    },
    data () {
        return {
            nextactivity: "Leave Types",
            title: "Leave Types - Sprout",
            btnlinks: {
                createbtnlink:"/leaves/leaves_configuration_create",
                importbtnlink:"/leaves/leaves_configuration_import"
            },
            tableheader: [
                "Subjects",
                "Start Date",
                "End Date",
                "Attendance",
                "location",
                "duration",

            ],
            tablefooter: [
                "",
                "",
                "",
                "",
                "",
                "",
                "",

            ],
            tabledata: {
                "row": {
                    "data": [
                        "[FURN001] Computer Desk",


                    ],
                    "url": "/leaves/leaves_configuration_table",
                    "checkbox":true,


                },
                "row1": {
                    "data": [
                        "[FURN001] Computer Desk",

                    ],
                    "url": "/leaves/leaves_configuration_table",
                    "checkbox":true,

                },
                "row2": {
                    "data": [
                        "[FURN001] Computer Desk",

                    ],
                    "url": "/leaves/leaves_configuration_table",
                    "checkbox":true,

                },
                "row3": {
                    "data": [
                        "[FURN001] Computer Desk",

                    ],
                    "url": "/leaves/leaves_configuration_table",
                    "checkbox":true,

                },

            }
        }
    },
    methods: {
        select: function () {
            var self = this;
            self.$http.post("/recruitment/confitable", {
                "name": self.options,
            }).then(function(res){
                var data = res.body.data;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        self.tabledata.push({
                            "data": [
                                val.type,
                                val.type,
                                val.type,
                                val.type,
                                val.type,
                                val.type,

                            ],
                            "url": "/leaves/leaves_configuration_table/"+val.id,


                        });
                        console.log(data);
                    });
                }

            },function(err){
                alert(err);
            });
        },
        validateBeforeSubmit() {
            this.$validator.validateAll().then(() => {
                // eslint-disable-next-line
                // this.submiting();
                alert('From Submitted!');
            }).catch(() => {
                // eslint-disable-next-line
                //  alert('Correct them errors!');
            });
        }
    },


    components: {
        DashboardController,
        TableMain
    }
}