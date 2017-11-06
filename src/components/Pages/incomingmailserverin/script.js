import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import incomingmailservereditcompo from "./../../partials/incomingmailservereditcompo/incomingmailservereditcompo.vue"

export default{
    created: function () {
        var self = this;
        this.select();
        this.select1();
        $(function () {
            $("#changepassword").click(function () {
                self.pwd_update();
                window.location.href = "/setting/users";
            });
            $("#send_resert_pwd_instruction").click(function () {
                self.send_resert_pwd_instructions();
                //window.location.href = "/setting/users";
            });
            $("#num01").click(function () {
                self.ssubmit();
                self.select3();
            });
            $("#num10").click(function () {
                self.psubmit();
            });
            $("#topm21").click(function () {
                $(".pwd").hide();
                $(".show_pwd").show();
            });
            $('.SeeMore2').click(function(){

                var text = $(this).html();
                if(text == "active"){
                    $(this).html("inactive");
                    $(".check").addClass("fa fa-fw fa-check");

                }else{
                    $(this).html('active');
                }
            });
            self.btnlinks.editbtnlink = "/setting/incomingmailserveredit/"+self.$route.params.id;
            self.select();
            self.submit();

        });
        document.title = this.title;
    },
    data () {
        return {
            title:"New - Sprouts",
            head: "General Settings / Incoming Mail Servers / New",
            btnlinks: {
                editbtnlink:"/setting/incomingmailserveredit",
                createbtnlink:"/setting/incomingmailservercreate"
            },
            name:"",
            servertype:"",
            fetchdate:"",
            servername:"",
            port:"",
            username:"",
            num:"",
            counter:0,
            password:"",
            newrecord:"",
            ssl:"",
        }
    },
    computed: {
        fullname: function () {
            return this.first + " " + this.last;
        }
    },
    methods: {
        ssubmit: function () {
            var self = this;
            self.$http.post("/setting/incominginfonext", {"id": self.$route.params.id}).then(function (res) {

                var parentdata = res.body.data[0];
                self.name = parentdata.name;
                self.$route.params.id = parentdata.id;
                self.$route.params.id = parentdata.id;
                self.servertype = parentdata.server_type;
                self.fetchdate = parentdata.last_fetched_date;
                self.servername = parentdata.server_name;
                self.port = parentdata.port;
                self.ssl = parentdata.ssl_tsl;
                self.Username = parentdata.username;
                self.Password = parentdata.password;
                self.newrecord = parentdata.action_id;
                //console.log(self.status);
                //console.log(this.$route.query.id);
                self.$http.post("/alias_value", {"alias_id": self.alias_id}).then(function (res) {
                    //console.log(res.body);
                    var parentdata = res.body.result[0];
                    self.name = parentdata.name;

                }, function (err) {
                    //alert(err);
                });
            }, function (err) {
                // alert(err);
            });
        },
        psubmit: function () {
            var self = this;
            self.$http.post("/setting/incominginfoback", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.data[0];
                self.name = parentdata.name;
                self.$route.params.id = parentdata.id;
                self.servertype = parentdata.server_type;
                self.fetchdate = parentdata.last_fetched_date;
                self.servername = parentdata.server_name;
                self.port = parentdata.port;
                self.ssl = parentdata.ssl_tsl;
                self.Username = parentdata.username;
                self.Password = parentdata.password;
                self.newrecord = parentdata.action_id;
                //console.log(self.status);
                //console.log(this.$route.query.id);
                self.$http.post("/alias_value", {"alias_id": self.alias_id}).then(function (res) {
                    //console.log(res.body);
                    var parentdata = res.body.result[0];
                    self.name = parentdata.name;

                }, function (err) {
                    //alert(err);
                });

            }, function (err) {
                // alert(err);
            });



        },
        select1: function () {
            var self = this;
            self.$http.post("/setting/numsetting2", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.data[0];
                self.num = parentdata.count;
                console.log(res.body)
                console.log(self.num)
                //console.log(this.$route.query.id);
            }, function (err) {
            });
        },
        select: function () {
            var self = this;
            //alert(self.companyName);
            self.$http.post("/setting/incominginfo", {"id": self.$route.params.id}).then(function (res) {

                var parentdata = res.body.result[0];
                self.name = parentdata.name;
                self.servertype = parentdata.server_type;
                self.fetchdate = parentdata.last_fetched_date;
                self.servername = parentdata.server_name;
                self.port = parentdata.port;
                self.ssl = parentdata.ssl_tsl;
                self.Username = parentdata.username;
                self.Password = parentdata.password;
                self.newrecord = parentdata.action_id;
                //console.log(self.status);
                //console.log(this.$route.query.id);
                self.$http.post("/alias_value", {"alias_id": self.alias_id}).then(function (res) {
                    //console.log(res.body);
                    var parentdata = res.body.result[0];
                    self.name = parentdata.name;

                }, function (err) {
                    //alert(err);
                });

            }, function (err) {
                // alert(err);
            });

        },

        submit: function () {
            var self = this;
            //alert(self.current_company+ " ");
            self.$http.post("/user_status", {"id": self.$route.params.id ,"status": self.status}).then(function(res){
                console.log(res.body);
            },function(err){
                //alert(err);
            });
        },
        pwd_update: function () {
            var self = this;
            //alert(self.current_company+ " ");
            self.$http.post("/user_pwd_update", {"id": self.$route.params.id ,"status": self.status}).then(function(res){
                console.log(res.body);
            },function(err){
                //alert(err);
            });
        },
        send_resert_pwd_instructions: function () {
            var self = this;
            //alert(self.current_company+ " ");
            self.$http.post("/send_resert_pwd_instruction", {"id": self.$route.params.id ,"status": self.status}).then(function(res){
                console.log(res.body);
            },function(err){
                alert(err);
            });
        },

    },

    components: {
        DashboardController,
        incomingmailservereditcompo

    }
}