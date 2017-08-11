Vue.component('vue-knob', {
    template:
        `<div class="knob">
                    <div class ="knob-drag"
                        v-bind:style="{background:  gradient, transform: transform}"
                        v-on:mousedown="onDragMouseDown"

                     ></div>
                    <div class="knob-input-area">
                    <input ref="input" type="text" class="no-spin" :min="min" :max="max" :value="angle"  v-on:input="updateValue" v-on:keydown="onKeyPress" v-on:change="onChange" />
                    </div>
                </div>`,
    props: ['value', 'startColor', 'endColor'],
    data: function () {
        return {
            angle: this.value,
            max: 360,
            min: 0,
            startDragAngle: 0
        }
    },
    watch: {
        // whenever question changes, this function will run
        value: function (newValue) {
            this.angle = newValue;
        }
    },
    computed: {
        gradient: function () {
            return "linear-gradient(" + this.startColor + " 5%," + this.endColor + " 95%)";
        },
        transform: function () {
            return "rotate(" + this.angle + "deg)";
        }
    },
    methods: {

        onKeyPress: function (e) {
            if ((e.code == 'ArrowUp')) {
                this.angle++;
            }
            else if (e.code == 'ArrowDown') {
                this.angle--;
            }
            this.angle = this.applyMinMax(this.angle);
        },

        updateValue: function (e) {
            var attemptedvalue = e.target.value.trim();
            if (attemptedvalue == '') {
                return;
            }

            var value = +attemptedvalue;
            if (isNaN(value))
                value = this.angle;
            else {
                value = this.applyMinMax(value);
            }


            this.$refs.input.value = value;
            this.angle = value;
            this.$emit('input', Number(value))
        },

        onChange: function (e) {
            var attemptedvalue = e.target.value.trim();
            if (attemptedvalue == '') {
                this.angle = 0;
                this.$emit('input', 0);
            }
        },

        applyMinMax: function (val) {
            if (val < 0)
                val += 360;
            return val % this.max;
        },

        getWidth: function () {
            return this.$el.offsetWidth;
        },

        getCenter: function () {
            var width = this.getWidth();
            return { x: width / 2, y: width / 2 };
        },

        toRelativePostion: function (pos) {
            var ref = this.$el.getBoundingClientRect();
            return { x: pos.x - ref.left, y: pos.y - ref.top };
        },

        getAngle: function (pos) {
            pos = this.toRelativePostion(pos)
            var c = this.getCenter();

            var a = Math.atan2(pos.y - c.y, pos.x - c.x);
            while (a < 0) {
                a = a + Math.PI * 2
            }
            return Math.round(a * 180 / Math.PI);
        },

        onDocumentMouseMove: function (e) {
            var currentPosAngle = this.getAngle(e);

            this.angle += currentPosAngle - this.startDragAngle;

            this.angle = this.applyMinMax(this.angle);
            this.startDragAngle = currentPosAngle;
            this.$emit('input', this.angle)
        },
        onDocumentMouseUp: function (e) {
            document.removeEventListener('mousemove', this.onDocumentMouseMove);
            document.removeEventListener('mouseup', this.onDocumentMouseUp);
        },
        onDragMouseDown: function (e) {
            document.addEventListener('mousemove', this.onDocumentMouseMove);
            document.addEventListener('mouseup', this.onDocumentMouseUp);
            this.startDragAngle = this.getAngle(e);
        },
    },
    mounted: function () {

    },
    destroyed: function () {

    }
})
