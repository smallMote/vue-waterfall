import {
	h,
	ref,
	watch,
	nextTick,
	defineComponent,
	onBeforeUnmount,
	getCurrentInstance
} from 'vue'

const WaterFall = defineComponent({
	name: 'WaterfallLayout',
	props: {
		size: {
			type: Number,
			default: 0,
			validator(val) {
				return val >= 0
			}
		},
		columns: {
			type:Number,
			default: 4
		},
		colGap: {
			type: Number,
			default: 10
		},
		rowGap: {
			type: Number,
			default: 10
		},
		isRender: Boolean // Custom rendering timing
	},
	render() {
		return h(
			'div',
			{
				'class': 'waterfall waterfall-container'
			},
			this.$slots.default()
		)
	},
	setup(props) {
		const readySize = ref(0)
		const addItemModel = () => {
			readySize.value++
		}
		const container = getCurrentInstance()

		watch(() => readySize.value, (val) => {
			nextTick().then(() => {
				if ((val === props.size && container.ctx.$el) || props.isRender) {
					waterFallRender(container.ctx.$el, props.columns, props.colGap, props.rowGap)
				}
			})
				.catch(e => {
					console.log(e)
				})
		}, { immediate: true })

		watch(() => props.size, (val) => {
			if (val < readySize.value) {
				readySize.value = val
			}
		})

		onBeforeUnmount(() => {
			readySize.value = 0
		})
		return {
			addItemModel
		}
	}
})

// Waterfall Layout Render
function waterFallRender (dom, columns = 4, colGap = 10, rowGap = 10) {
	const box = dom || document.querySelector('.water-fall-container')
	if (!box) return
	const items = box.children
	const pageWidth = box.clientWidth
	const itemWidth = pageWidth / columns
	const arr = []
	let boxHeight = 0
	const gap = (columns - 1) * colGap / columns
	const remainderGap = colGap - gap

	function render(pw = pageWidth, iw = itemWidth) {
		for (let i = 0; i < items.length; i++) {
			items[i].style.width = pw / columns - gap + 'px'
			if (i < columns) {
				// Identify the first line
				items[i].style.top = 0 + 'px'
				items[i].style.left = (iw + remainderGap) * i + 'px'
				arr.push(items[i].offsetHeight)
				boxHeight = items[i].offsetHeight
			} else {
				// Other rows
				// Find the minimum height in the array and its indexZ
				let minHeight = arr[0]
				let index = 0
				for (let j = 0; j < arr.length; j++) {
					if (minHeight > arr[j]) {
						minHeight = arr[j]
						index = j
					}
				}
				// Sets the position of the first box in the next row
				// Top value is smallest column + rowGap
				items[i].style.top = arr[index] + rowGap + 'px'
				// Left value it's the distance to the left of the minimum column distance
				let colIndex = i % columns
				if (colIndex > columns - 1) {
					colIndex = 0
				}
				items[i].style.left = (iw + remainderGap) * colIndex + 'px'

				// Change the height of the smallest column
				// height:smallest = current + append + gap
				arr[index] = arr[index] + items[i].offsetHeight + rowGap
				// Sets the height of the parent container, Avoid causing BFC
				if (i === items.length - 1) {
					boxHeight = arr[index]
				}
			}

			// Set the first column 'left offset'
			if ((i + 1) % columns === 1) {
				items[i].style.left = 0 + 'px'
			}
		}
		console.log('boxHeight', boxHeight)
		box.style.height = boxHeight + 'px'
	}
	render()

	// Content overflow, scroll bar appears
	const newPageWidth = box.clientWidth
	if (newPageWidth < pageWidth) {
		// Repaint
		const timer = setTimeout(() => {
			render(newPageWidth, newPageWidth / columns)
			clearTimeout(timer)
		}, 20)
	}
}

export default WaterFall
