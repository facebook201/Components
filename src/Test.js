export default {
    name: 'Test',
    comments: 'Test',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        align: Boolean
    },
    render(h) {
        return h(this.tag, {
            class: [
                'sy-test',
                this.align ? 'is-align' : '',
                {
                    'is-plain': false,
                    'is-loading': true
                }
            ]
        }, this.$slots.default);
    }
};