
    const zhangTest1 = new Promise((resolve, reject) => {
        require([
            './src/commHelp.js',
            'json!./src/zhengJson.json',
        ], function(commHelp, zhangJson) {
            resolve({
                name: 'ZhangTest1',
                components: {
                    HelloWorld:vueLoad('./HelloWorld.vue'),
                },
                data:function() {
                    return {
                        msg: "Welcome to Your Vue.js App",
                        pagePara: "",
                        isCollapse: false
                    };
                },
                computed: {},
                created: function() {
                    this.pagePara = zhangJson[0].name + commHelp.getColorByIndex(1);
                },
                watch: {},
                mounted() {},
                methods: {}
            });
        });
    });
    module.exports = zhangTest1;
