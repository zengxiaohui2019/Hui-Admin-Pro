<template>
    <div>
        <div>{{ message }} - {{ phoneNumber }}</div>
        <div v-if="() => false">v-if function test</div>
    </div>
</template>

<script>
    export default {
        name: "TestForm",
        props: {
            message: {
                typeof: String,
                required: false,
                default: '123',
            },
            phoneNumber: {
                typeof: Number,
                required: false,
                default: 321
            }
        },
        methods: {
            onOkClick() {
                console.log('ok click!')
            }
        },
        created() {
            this.$emit('okEvent', this.onOkClick)
        }
    }
</script>

<style scoped>

</style>