export default {
  props: ['txt', 'maxLength'],
  template: `
    <section class="description-without-check">
      <h4>{{ displayTxt }}</h4>
      <button v-if="isTxtLong" @click="toggleReadMore">Read {{ buttonTxt }}</button>
    </section>
  `,
  data() {
    return {
      isReadMore: false,
    }
  },
  methods: {
    toggleReadMore() {
      this.isReadMore = !this.isReadMore
    },
  },
  computed: {
    displayTxt() {
      if (this.isReadMore || !this.isTxtLong) return this.txt
      return this.txt.slice(0, this.maxLength) + '...'
    },
    buttonTxt() {
      return this.isReadMore ? 'less' : 'more'
    },
    isTxtLong() {
      return this.txt.length > this.maxLength
    }
  }
}