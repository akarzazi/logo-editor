Vue.component('vue-color-picker', {
    template:
        `<div v-bind:style="{backgroundColor: value}" >
            <input type="color" style="height: 100%;width: 100%;box-sizing: border-box;opacity: 0;" 
            :value="ivalue"   v-on:input="updateValue($event.target.value)"/>
        </div>`,
    props: ['value'],
    computed: {
        ivalue: function () {
            return this.value;
        }
    },
    methods: {
        updateValue: function (v) {
            // Emit the number value through the input event
            this.$emit('input', v)
        }
    }
})