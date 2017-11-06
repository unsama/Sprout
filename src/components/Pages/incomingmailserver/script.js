import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import Tablemain from "./../../partials/TableMain/TableMain.vue"



export default{
    created: function () {
        var self = this;
        document.title = this.title;
        this.select();
        this.select1();
        $(".delete").click(function () {
            $(".checkBoxClass:checked").each(function(){
                del.push($(this).val());
            });
            console.log(del);
            self.delete(del);
            alert(del);
        });
    },
    data () {
        return {
            title:"Incoming Mail Servers - Sprout",
            head: "General Settings / Incoming Mail Servers",
            btnlinks: {
                createbtnlink:"/setting/incomingmailservercreate",
                importbtnlink:"/setting/incomingmailserverimport"
            },
            tableheader: [
                "Name",
                "Server type",
                "SSL/TLS",
                "Create a new Record",
                "Last Fetch Data",
                "# of emails",
                "Status",

            ],
            tablefoot: [
                "",
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
                        "usama",
                        "POP server",
                        "",
                        "ada",
                        "TLS (STARTTLS)",
                        "0 records",
                        " not",

                    ],
                },
            },
            counter: 1,
            num:'',
        }
    },
    methods: {
        select1: function () {
            var self = this;
            self.$http.post("/setting/numin", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.data[0];
                self.num = parentdata.count;
                console.log(res.body)
                console.log(self.num)

            }, function (err) {
            });
        },
        select3: function () {
            var self = this;
            self.counter+=1;
            self.$http.post("/setting/incomingtablenext", {
                "counter": self.counter,
            }).then(function(res){
                var data = res.body.result;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        self.tabledata.push({
                            "data": [
                                val.name,
                                val.server_type,
                                val.ssl_tsl,
                                val.server_type	,
                                val.last_fetched_date,
                                val.port,
                                val.status,
                            ],
                            "url": "/setting/incomingmailserverin/"+val.id,
                        });
                    });
                    console.log(self.tabledata);
                }
            },function(err){
                alert(err);
            });
        },
        select4: function () {
            var self = this;
            self.counter-=1;
            self.$http.post("/setting/incomingtableback", {
                "counter": self.counter,
            }).then(function(res){
                var data = res.body.result;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        self.tabledata.push({
                            "data": [
                                val.name,
                                val.server_type,
                                val.ssl_tsl,
                                val.server_type	,
                                val.last_fetched_date,
                                val.port,
                                val.status,
                            ],
                            "url": "/setting/incomingmailserverin/"+val.id,
                        });
                    });
                    console.log(self.tabledata);
                }
            },function(err){
                alert(err);
            });
        },
        select: function () {
            var self = this;
            self.$http.post("/setting/incomingtable", {
                "username": self.options,
            }).then(function(res){
                var data = res.body.result;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        self.tabledata.push({
                            "data": [
                                val.name,
                                val.server_type,
                                val.ssl_tsl,
                                val.server_type	,
                                val.last_fetched_date,
                                val.port,
                                val.status,
                            ],
                            "url": "/setting/incomingmailserverin/"+val.id,
                        });
                    });
                    console.log(self.tabledata);
                }
            },function(err){
                alert(err);
            });
        },
        delete: function (del) {
            var self = this;
            console.log("a"+del);
            self.$http.post("/setting/delete_incoming", {"delete_items": del}).then(function(res){
            },function(err){
                //alert(err);
            });
        },
    },

    components: {
        DashboardController,
        Tablemain


    }
}