import TableMain from "./../../partials/TableMain/TableMain.vue"
import Request_quotation_lower from "./../../partials/Request_quotation_lower/Request_quotation_lower.vue"
import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import Message from "./../../partials/Message/Message.vue"
import selectallocation from "./../../partials/selectallocation/selectallocation.vue"

export default{
    created: function () {

        var self = this;
        this.select();
        this.select1();
        document.title = this.title;
        $(function () {
            $(".delete").click(function () {
                var r = confirm("Are you sure you want to  Delete the Leave Allocation");
                if (r)
                {
                    window.location.href = "/Employees/AllocationRequests";
                    self.submit();
                }
                else
                {
                    // x="You pressed Cancel!";
                }
            });
            $(".Duplicate").click(function () {
                self.btnlinks.duplicatebtnlink ="/Employees/AllocationRequestDuplicate/"+self.$route.params.id
            });
            $("#num01").click(function () {
                self.ssubmit();
            });
            $("#num10").click(function () {
                self.psubmit();
            });
            self.btnlinks.editbtnlink ="/Employees/AllocationRequestEdit/"+self.$route.params.id
        })
    },
    data () {
        return {
            heading : "Administrator - Sprout",
            num:'',
            description:'',
            leave_type_id:'',
            mode:'',
            names:[],
            employeename:'',
            name:'',
            type:'',
            test:'',
            duration:'',
            employee_id:'',
            department_id:'',
            comment_manager:'',
            counter: 1,
            btnlinks: {
                createbtnlink:"/Employees/Department_leave_create",
                editbtnlink:"",
                deletedropbtnlink:"",
                duplicatebtnlink:"",
                planorderbtnlink:"",
            },
            tableheader: [
                "Reference",
                "Destination Location Zone",
                "Partner",
                "Schduled Date",
                "Source Document",
                "Back Order Of",
                "Status",
            ],
            tablefooter: [
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
                        "Chic/In/0004",
                        "Chic/Stock",
                        "AsusTek",
                        "01/28/2017 19:23:00",
                        "Chicago Warehouse",
                        "Proposition",
                        "Available",

                    ],
                    "url": "/sales/request_quotation_inner"

                },
                "row1": {
                    "data": [
                        "Chic/In/0004",
                        "Chic/Stock",
                        "AsusTek",
                        "01/28/2017 19:23:00",
                        "Chicago Warehouse",
                        "Proposition",
                        "Available",
                    ],
                    "url": "/sales/request_quotation_inner"
                },
                "row2": {
                    "data": [
                        "Chic/In/0004",
                        "Chic/Stock",
                        "AsusTek",
                        "01/28/2017 19:23:00",
                        "Chicago Warehouse",
                        "Proposition",
                        "Available",
                    ],
                    "url": "/sales/request_quotation_inner"
                },
            }
        }
    },
    methods: {
        submit: function () {
            var self = this;
            self.$http.post("/Employees/delete_leave_allocation", {"id": self.$route.params.id}).then(function(res){
                console.log(res.body);
            },function(err){

            });
        },
        select1: function () {
            var self = this;
            self.$http.post("/Employees/leave_allocaion_num", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.data[0];
                self.num = parentdata.count;
            }, function (err) {

            });
        },
        select: function () {
            var self = this;
            self.$http.post("/Employees/leaverequestselect", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.data[0];
                self.description = parentdata.description;
                self.leave_type_id = parentdata.leave_type_id;
                self.mode = parentdata.mode;
                self.duration = parentdata.duration;
                self.employee_id = parentdata.employee_id;
                self.department_id = parentdata.department_id;
                self.comment_manager = parentdata.comment_manager;
                console.log(parentdata);
                self.$http.post("/Employees/selectleavedep", {"id": self.department_id}).then(function (res) {
                    var parentdata = res.body.data[0];
                    self.name = parentdata.name;
                    console.log(parentdata);
                    self.$http.post("/Employees/selectleaveemp", {"id": self.employee_id}).then(function (res) {
                        var parentdata = res.body.data[0];
                        self.employeename = parentdata.employeename;
                        console.log(parentdata);
                        self.$http.post("/Employees/selectleavetmp", {"id": self.leave_type_id}).then(function (res) {
                            var parentdata = res.body.data[0];
                            self.type = parentdata.type;
                            console.log(parentdata);

                        }, function (err) {

                        });
                    }, function (err) {

                    });
                }, function (err) {

                });
            }, function (err) {

            });
            self.$http.post("/Employees/leaveselect", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.data[0];
                self.test = parentdata.status;
                console.log(self.test);
                $(function () {
                    $(document).ready(function(){

                    });
                    if( self.test == "approved"){
                        $('#q').show();
                        $('#a').hide();
                        $('#d').hide();
                        document.getElementById("aprroved").classList.add("oe_active");
                        document.getElementById("toapprrove").classList.remove("oe_active");
                        document.getElementById("submit").classList.remove("oe_active");
                        document.getElementById("resused").classList.remove("oe_active");
                    }
                    else if( self.test == "Refused")
                    {
                        $('#d').show();
                        $('#a').hide();
                        $('#q').hide();
                        $('#resused').show();
                        document.getElementById("resused").classList.add("oe_active");
                        document.getElementById("toapprrove").classList.remove("oe_active");
                        document.getElementById("submit").classList.remove("oe_active");
                        document.getElementById("aprroved").classList.remove("oe_active");
                    }
                    else if( self.test == "To approve")
                    {
                        $('#d').show();
                        $('#a').show();
                        $('#q').show();
                        document.getElementById("toapprrove").classList.add("oe_active");
                        document.getElementById("resused").classList.remove("oe_active");
                        document.getElementById("submit").classList.remove("oe_active");
                        document.getElementById("aprroved").classList.remove("oe_active");
                    }
                    $(".delete").click(function () {
                        self.submit();
                    });

                })
            },function(err){

            });

        },
        ssubmit: function () {
            var self = this;
            self.$http.post("/Employees/leave_allocation_perivious", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.data[0];
                self.description = parentdata.description;
                self.leave_type_id = parentdata.leave_type_id;
                self.mode = parentdata.mode;
                self.duration = parentdata.duration;
                self.employee_id = parentdata.employee_id;
                self.department_id = parentdata.department_id;
                self.comment_manager = parentdata.comment_manager;
                self.$route.params.id = parentdata.id;
                console.log(parentdata);
                self.$http.post("/Employees/selectleavedep", {"id": self.department_id}).then(function (res) {
                    var parentdata = res.body.data[0];
                    self.name = parentdata.name;
                    console.log(parentdata);
                    self.$http.post("/Employees/selectleaveemp", {"id": self.employee_id}).then(function (res) {
                        var parentdata = res.body.data[0];
                        self.employeename = parentdata.employeename;
                        console.log(parentdata);
                        self.$http.post("/Employees/selectleavetmp", {"id": self.leave_type_id}).then(function (res) {
                            var parentdata = res.body.data[0];
                            self.type = parentdata.type;
                            console.log(parentdata);

                        }, function (err) {

                        });
                    }, function (err) {

                    });
                }, function (err) {

                });
            }, function (err) {

            });
        },
        psubmit: function () {
            var self = this;
            self.$http.post("/Employees/leave_allocation_next", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.data[0];
                self.description = parentdata.description;
                self.leave_type_id = parentdata.leave_type_id;
                self.mode = parentdata.mode;
                self.duration = parentdata.duration;
                self.employee_id = parentdata.employee_id;
                self.department_id = parentdata.department_id;
                self.comment_manager = parentdata.comment_manager;
                self.$route.params.id = parentdata.id;
                console.log(parentdata);
                self.$http.post("/Employees/selectleavedep", {"id": self.department_id}).then(function (res) {
                    var parentdata = res.body.data[0];
                    self.name = parentdata.name;
                    console.log(parentdata);
                    self.$http.post("/Employees/selectleaveemp", {"id": self.employee_id}).then(function (res) {
                        var parentdata = res.body.data[0];
                        self.employeename = parentdata.employeename;
                        console.log(parentdata);
                        self.$http.post("/Employees/selectleavetmp", {"id": self.leave_type_id}).then(function (res) {
                            var parentdata = res.body.data[0];
                            self.type = parentdata.type;
                            console.log(parentdata);

                        }, function (err) {

                        });
                    }, function (err) {

                    });
                }, function (err) {

                });
            }, function (err) {

            });
        },
        select3: function () {

            var self = this;
            self.num4+1;
        },
        dsubmit: function () {
            var self = this;
            self.$http.post("/Employees/depinserts", {"f": self.f,"parent_dept_id": self.parent_dept_id,"manager_id": self.manager_id}).then(function(res){
                console.log(res.body);

            },function(err){

            });
        },
        validateBeforeSubmit() {
            var self = this;
            this.$validator.validateAll().then(() => {
                // eslint-disable-next-line
                //this.submit();
                //this.tags();
                //this.insert();
                //this.select();
                //this.insert();
                // this.submiting();
            }).catch(() => {
                // eslint-disable-next-line
                //  alert('Correct them errors!');
            });
        }
    },


    components: {
        TableMain,
        selectallocation,
        Request_quotation_lower,
        DashboardController,
        Message,
    }
}