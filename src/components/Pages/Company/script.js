import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import Tabledrag from "./../../partials/Tabledrag/Tabledrag.vue"


export default{
    created: function () {
        var self = this;
        var del = [];
        document.title = this.title;
        this.select();
        this.select1();
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
    },
    data(){
        return {
            head: "Companies",
            title: 'Companies - Sprout',
            btnlinks: {
                createbtnlink: "/setting/settingcompanycreate",
                importbtnlink: "/setting/companyimport",
                deletebtnlink: "",
                exportbtnlink: "",
                changepasswordbtnlink: "",
                changepasswordbtnlink_modal: "",
                deletedropbtnlink:"",
                duplicatebtnlink:"",
                planorderbtnlink:"",
            },
            tableheader: [
                "ID",
                "Partner",
                "Company Name",



            ],
            tablefoot: [
                "",
                "",
                "",
                "",
                "",


            ],
            tabledata: {
                "row": {
                    "data": [
                        "ALU pak industries",
                        "alupak industries",

                    ],
                    "url": "/setting/companiesin"
                },
                "row1": {
                    "data": [
                        "My industries",
                        "my industries",
                        
                    ],
                    "url": "/setting/usersin"
                },
            },
            num: '',
            counter: 0,
        }
    },
    methods: {
        select3: function () {
            var self = this;
            self.counter+=10;
            self.$http.post("/setting/companytablenext", {
                "counter": self.counter,
            }).then(function(res){
                var data = res.body.data;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.company_name,
                                val.company_name,
                            ],
                            "url": "/setting/companiesin/"+val.id,
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
            self.counter-=10;
            self.$http.post("/setting/companytableback", {
                "counter": self.counter,
            }).then(function(res){
                var data = res.body.data;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.company_name,
                                val.company_name,
                            ],
                            "url": "/setting/companiesin/"+val.id,

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
            self.$http.post("/setting/companytable", {
                "username": self.options,
            }).then(function(res){
                var data = res.body.result;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.company_name,
                                val.company_name,
                            ],
                            "url": "/setting/companiesin/"+val.id,

                        });
                    });
                    console.log(self.tabledata);
                }
                //self.options =res.body.data;

            },function(err){
                alert(err);
            });
        },
        select1: function () {
            var self = this;
            self.$http.post("/setting/numcompany", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.data[0];
                self.num = parentdata.count;
                console.log(res.body)
                console.log(self.num)

            }, function (err) {
            });
        },
        delete: function (del) {
            var self = this;
            //alert(self.current_company+ " ");
            console.log("a"+del);
            self.$http.post("/setting/delete_company_info", {"delete_items": del}).then(function(res){

                //console.log(res.body);
            },function(err){
                //alert(err);
            });
        },
    },

    components: {
        DashboardController,
        Tabledrag

    }
}
