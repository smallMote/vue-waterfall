> A Waterfall flow layout component for vue3

## Using npm or yarn
We recommend using npm or yarn to install，it not only makes development easier，but also allow you to take advantage of the rich ecosystem of Javascript packages and tooling.

```bash
$ npm install vue-waterfall-layout --save
```

```bash
$ yarn add vue-waterfall-layout
```
If you are in a bad network environment，you can try other registries and tools like [cnpm](https://github.com/cnpm/cnpm).

## Quick Start
Import it in main.js.
```js
import { createApp } from 'vue'
import App from './App.vue'
import VueWaterfall from './index'
import './style/index.css'

const app = createApp(App)
app.use(VueWaterfall)

// or

import {
  Waterfall,
  WaterImage,
  WaterItem
} from 'vue-waterfall-layout'
 
app.component(Select.name, Select)
app.component(Button.name, Button)
```

## Document
[See](https://github.com/smallMote/vue-waterfall)

## Links
- [Vue](https://vuejs.org/)
- [webpack-upload-zeroojs-plugin](https://www.npmjs.com/package/webpack-upload-zeroojs-plugin)

## Ecosystem
| Project | Description |
| --- | --- |
|[webpack-upload-zeroojs-plugin](https://www.npmjs.com/package/webpack-upload-zeroojs-plugin) | Automatically upload the packaged files of webpack project

## License
MIT