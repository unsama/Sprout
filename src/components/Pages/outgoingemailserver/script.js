import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import Tablemain from "./../../partials/TableMain/TableMain.vue"
export default{
    created: function () {
        var self = this;
        var del = [];
        document.title = this.title;
        $(function () {
            $("#action").hide();
            $(".checkBoxClass").click(function () {
                if($(this).prop('checked')){
                    $("#action").show();
                }else{
                    $("#action").hide();
                }
            });
            $(".delete").click(function () {
                $(".checkBoxClass:checked").each(function(){
                    del.push($(this).val());
                });
                console.log(del);
                self.delete(del);
                alert(del);
            });
        });
        this.select();
        this.select1();
    },
    data () {
        return {
            title:"Outgoing Mail Servers - Sprout",
            head: "General Settings / Outgoing Mail Servers",

            btnlinks: {
                createbtnlink:"/setting/outgoingemailservercreate",
                importbtnlink:"/setting/outgoingemailserverimport",
                deletebtnlink: "",
                exportbtnlink: "",
                changepasswordbtnlink: "",
                changepasswordbtnlink_modal: "",
                deletedropbtnlink:"",
                duplicatebtnlink:"",
                planorderbtnlink:"",
            },
            tableheader: [
                "Id",
                "Priority",
                "Decsription",
                "SMTP Server",
                "User name",
                "Connection Security",

            ],
            tablefoot: [
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
                        "10",
                        "localhost",
                        "localhost",
                        "ada",
                        "TLS (STARTTLS)",
                    ],
                    "url": "/setting/outgoingemailserverin"
                },
            },
            counter: 1,
            num:'',
        }
    },
    methods: {
        select1: function () {
            var self = this;
            self.$http.post("/setting/numout", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.data[0];
                self.num = parentdata.count;
                console.log(res.body)
                console.log(self.num)
                //console.log(this.$route.query.id);
            }, function (err) {
            });
        },
        select3: function () {
            var self = this;
            self.counter+=1;
            self.$http.post("/setting/outgoingtablenext", {
                "counter": self.counter,
            }).then(function(res){
                var data = res.body.result;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.priority,
                                val.description,
                                val.smtp_server,
                                val.username,
                                val.connection_security,
                            ],
                            "url": "/setting/outgoingemailserverin/"+val.id,
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
            self.$http.post("/setting/outgoingtableback", {
                "counter": self.counter,
            }).then(function(res){
                var data = res.body.result;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.priority,
                                val.description,
                                val.smtp_server,
                                val.username,
                                val.connection_security,
                            ],
                            "url": "/setting/outgoingemailserverin/"+val.id,

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
            self.$http.post("/setting/outgoingtable", {
                "username": self.options,
            }).then(function(res){
                var data = res.body.result;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.priority,
                                val.description,
                                val.smtp_server,
                                val.username,
                                val.connection_security,
                            ],
                            "url": "/setting/outgoingemailserverin/"+val.id,
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
            self.$http.post("/setting/delete_outgoing", {"delete_items": del}).then(function(res){
            },function(err){
            });
        },
    },
    components: {
        DashboardController,
        Tablemain


    }
}