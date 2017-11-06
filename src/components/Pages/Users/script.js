import DashboardController from "./../../partials/DashboardController/DashboardController.vue";
import TableMain from "./../../partials/TableMain/TableMain.vue";


export default{
    created: function () {
        var self = this;
        var del = []; // initialize empty array
        document.title = this.title;
        this.select();
        this.select1();
        $(function () {
            $("#action").hide();
            $("#changepassword").click(function () {
                self.pwd_update();
                window.location.href = "/setting/users";
            });
            $(".checkBoxClass").click(function () {
                if($(this).prop('checked')){
                    $("#action").show();
                }else{
                    $("#action").hide();
                }
               // alert("check it");
            });

            $("#num01").click(function () {
                self.ssubmit();

            });
            $("#num10").click(function () {
                self.psubmit();
            });

            $(".delete").click(function () {
                $(".checkBoxClass:checked").each(function(){
                    del.push($(this).val());
                    // self.btnlinks.deletebtnlink = "/setting/users/"+del;
                    // self.delete();
                });
                console.log(del);
                 self.delete(del);
                alert(del);
            });
        });
    },
    data(){
        return {
            head: "Users",
            title: 'Users - Sprout',
            options: '',
            username: '',
            counter: 1,
            num:'',
            v: true,
            v1: false,
            btnlinks: {
                createbtnlink: "/setting/usersoutcreate",
                importbtnlink: "/setting/usersimport",
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
                "Name",
                "Login",
                "Language",
                "Latest Connection",

            ],
            tablefoot: [
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

                    ],
                    "url": "/recruitment/ReqDep"


                },

            },
        };
    },
    methods: {
        select1: function () {
            var self = this;
            self.$http.post("/setting/numuser", {"id": self.$route.params.id}).then(function (res) {
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
            self.$http.post("/setting/usertablenext", {
                "counter": self.counter,
            }).then(function(res){
                var data = res.body.data;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        var j_date = new Date(val.created_at);
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.username,
                                val.email,
                                val.language,
                                j_date.getDate()+"-"+j_date.getMonth()+"-"+j_date.getFullYear()
                            ],
                            "url": "/setting/usersin/"+val.id,
                        });
                    });
                    console.log(self.tabledata);
                }
            },function(err){
            });
        },
        select4: function () {
            var self = this;
            self.counter-=1;
            self.$http.post("/setting/usertableback", {
                "counter": self.counter,
            }).then(function(res){
                var data = res.body.data;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        var j_date = new Date(val.created_at);
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.username,
                                val.email,
                                val.language,
                                j_date.getDate()+"-"+j_date.getMonth()+"-"+j_date.getFullYear()
                            ],
                            "url": "/setting/usersin/"+val.id,

                        });
                    });
                    console.log(self.tabledata);
                }
                //self.options =res.body.data;

            },function(err){
                //alert(err);
            });

        },
        select: function () {
            var self = this;

            self.$http.post("/setting/usertable", {
                "username": self.options,
            }).then(function(res){
                var data = res.body.result;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        var j_date = new Date(val.created_at);
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.username,
                                val.email,
                                val.language,
                                j_date.getDate()+"-"+j_date.getMonth()+"-"+j_date.getFullYear()
                            ],
                            "url": "/setting/usersin/"+val.id,

                        });
                    });
                    console.log(self.tabledata);
                }
                //self.options =res.body.data;

            },function(err){
                //alert(err);
            });
        },
        pwd_update: function () {
            var self = this;
            //alert(self.current_company+ " ");
            self.$http.post("/setting/user_pwd_update", {"id": self.$route.params.id ,"status": self.status}).then(function(res){
                console.log(res.body);
            },function(err){
                //alert(err);
            });
        },
        delete: function (del) {
            var self = this;
            //alert(self.current_company+ " ");
            console.log("a"+del);
            self.$http.post("/setting/delete_users", {"delete_items": del}).then(function(res){

                //console.log(res.body);
            },function(err){
                //alert(err);
            });
        },
    },



    components: {
        DashboardController,
        TableMain

    }
};

