import type {App, Plugin} from 'vue'
import {each} from 'lodash-es'

type SFCWithInstall<T> = T & Plugin

export function makeInstaller(components: Plugin[]) {
  return {
    install: (app: App) => {
      each(components, (component: SFCWithInstall<any>) => {
        app.component(component.name, component)
      })
    }
  }
}

export function withInstall<T, E extends Record<string, any>>(main: T, extra?: E) {
  (main as SFCWithInstall<T>).install = (app: App) => {
    each(extra, (component, name) => {
      app.component(name, component)
    })
  }
  return main as SFCWithInstall<T> & E
}