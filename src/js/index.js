var ipt = document.querySelector('.ipt');
var iptval = ipt.value;


ajax({
    url: '/api/ipt',
    data: {
        ipt: iptval
    },
    success: function(data) {
        console.log(data);
    }
})