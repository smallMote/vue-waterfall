/*!
 * 
 * vue-fall v0.1.0-beta.10
 * 
 * Copyright 2020-present, zeroojs.com.
 * All rights reserved.
 *       
 */
import WaterfallComponent from './lib/Waterfall';
import WaterImageComponent from './lib/WaterImage';
import WaterItemComponent from './lib/WaterItem';

export const Waterfall = WaterfallComponent;
export const WaterImage = WaterImageComponent;
export const WaterItem = WaterItemComponent;

export default {
  install(app) {
    app.component(Waterfall.name, Waterfall);
    app.component(WaterImage.name, WaterImage);
    app.component(WaterfallItem.name, WaterfallItem);
  }
}