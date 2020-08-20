<template>
    <div>
        <div>{{pagePara}}</div>
        <div>
            <hello-world></hello-world>
        </div>
    </div>
</template>

<script lang="es6">
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
</script>

<style>
  #body-abcde {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
