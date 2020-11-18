import { nextTick, h, defineComponent } from 'vue'

export default defineComponent({
  name: 'WaterItem',
  data() {
    return {
      imgLoadLen: 0, // img 已加载长度
      loadLen: 0, // img 节点长度
      childLen: 0 // 一级子节点长度
    }
  },
  render() {
    return h(
      'div',
      {
        'class': 'waterfall-item'
      },
      this.$slots.default()
    )
  },
  created() {
    nextTick().then(() => {
      const children = this.$el.children
      if (children && children.length) {
        const images = [...children].filter(item => item.nodeName === 'IMG')
        this.loadLen = images.length
        this.childLen = children.length
        if (this.loadLen === 0 && this.childLen > 0) {
          this.$parent.addItemModel()
        }
      }
    })
  },
  methods: {
    addChild() {
      this.imgLoadLen++
    }
  },
  watch: {
    imgLoadLen: {
      handler: function (val) {
        if (val === 0) {
          return
        }
        if (val === this.loadLen) {
          this.$parent.addItemModel()
        }
      },
      immediate: true
    }
  }
})
